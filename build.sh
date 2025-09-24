#!/usr/bin/env bash
set -euo pipefail

# Required env:
CDN_URL=https://cdn.mibio.am
S3_BUCKET=mibio-am
CLOUDFRONT_DISTRIBUTION_ID=E1234567890

echo "Building Next.js..."
NEXT_TELEMETRY_DISABLED=1 npm ci
NODE_OPTIONS=--max_old_space_size=4096 npm run build

echo "Uploading static chunks with long cache..."
# Next outputs hashed files in .next/static and buildId folder. Safe to cache for a year.
aws s3 sync .next/static s3://${S3_BUCKET}/_next/static \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

echo "Uploading public assets..."
# If your public assets are hashed, also give them a long cache.
# If some are not hashed (e.g. robots.txt), give them shorter cache below.
aws s3 sync public s3://${S3_BUCKET}/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "robots.txt" \
  --exclude "sitemap.xml"

# Upload short-cache files individually
if aws s3 ls s3://${S3_BUCKET}/robots.txt >/dev/null 2>&1; then
  :
fi
if [ -f public/robots.txt ]; then
  aws s3 cp public/robots.txt s3://${S3_BUCKET}/robots.txt \
    --cache-control "public, max-age=300"
fi
if [ -f public/sitemap.xml ]; then
  aws s3 cp public/sitemap.xml s3://${S3_BUCKET}/sitemap.xml \
    --cache-control "public, max-age=300"
fi

echo "Invalidating only non-hashed entry points..."
# Invalidate the minimal set that points to new hashed files.
aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
  --paths "/index.html" "/_next/static/*" "/manifest.json" "/service-worker.js" "/"

echo "Done."