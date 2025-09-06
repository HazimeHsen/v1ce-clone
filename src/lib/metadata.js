import initTranslations from '@/app/i18n';

export async function generateMetadata(locale, page, options = {}) {
  const { t } = await initTranslations(locale, ['common']);
  
  const metadataKey = `metadata.${page}`;
  const baseMetadata = {
    title: t(`${metadataKey}.title`),
    description: t(`${metadataKey}.description`),
    keywords: t(`${metadataKey}.keywords`),
    openGraph: {
      title: t(`${metadataKey}.title`),
      description: t(`${metadataKey}.description`),
      locale: locale,
      type: 'website',
      siteName: 'Mibio',
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`${metadataKey}.title`),
      description: t(`${metadataKey}.description`),
    },
    alternates: {
      canonical: `/${locale}${options.canonicalPath || ''}`,
      languages: {
        'en': '/en' + (options.canonicalPath || ''),
        'hy': '/hy' + (options.canonicalPath || ''),
      },
    },
  };

  if (options.replacements) {
    Object.keys(options.replacements).forEach(key => {
      const value = options.replacements[key];
      baseMetadata.title = baseMetadata.title.replace(`{{${key}}}`, value);
      baseMetadata.description = baseMetadata.description.replace(`{{${key}}}`, value);
      baseMetadata.keywords = baseMetadata.keywords.replace(`{{${key}}}`, value);
      baseMetadata.openGraph.title = baseMetadata.openGraph.title.replace(`{{${key}}}`, value);
      baseMetadata.openGraph.description = baseMetadata.openGraph.description.replace(`{{${key}}}`, value);
      baseMetadata.twitter.title = baseMetadata.twitter.title.replace(`{{${key}}}`, value);
      baseMetadata.twitter.description = baseMetadata.twitter.description.replace(`{{${key}}}`, value);
    });
  }

  return baseMetadata;
}
