/**
 * Parses the translations metadata and returns localized content
 * @param {Object} product - The product object
 * @param {string} locale - Current locale (en, hy)
 * @param {string} field - Field to get (title, subtitle, description)
 * @returns {string} - Localized content or fallback to default product field
 */
export function getLocalizedProductField(product, locale, field) {
  try {
    // Check if product has metadata and translations
    if (product?.metadata?.translations) {
      let translations;
      
      // Parse the translations string if it's a string
      if (typeof product.metadata.translations === 'string') {
        translations = JSON.parse(product.metadata.translations);
      } else {
        translations = product.metadata.translations;
      }
      
      // Get the localized content
      if (translations?.[field]?.[locale]) {
        return translations[field][locale];
      }
    }
  } catch (error) {
    console.warn('Error parsing translations metadata:', error);
  }
  
  // Fallback to default product fields
  switch (field) {
    case 'title':
      return product?.title || 'Smart Business Card';
    case 'subtitle':
      return product?.subtitle || product?.metadata?.subtitle || '';
    case 'description':
      return product?.description || 'Professional, contactless networking solution with instant lead capture and CRM integration.';
    default:
      return '';
  }
}

/**
 * Gets localized product title
 */
export function getLocalizedTitle(product, locale) {
  return getLocalizedProductField(product, locale, 'title');
}

/**
 * Gets localized product subtitle
 */
export function getLocalizedSubtitle(product, locale) {
  return getLocalizedProductField(product, locale, 'subtitle');
}

/**
 * Gets localized product description
 */
export function getLocalizedDescription(product, locale) {
  return getLocalizedProductField(product, locale, 'description');
}

/**
 * Gets all localized product content
 */
export function getLocalizedProductContent(product, locale) {
  return {
    title: getLocalizedTitle(product, locale),
    subtitle: getLocalizedSubtitle(product, locale),
    description: getLocalizedDescription(product, locale)
  };
}
