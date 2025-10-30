import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dryfruits.pk'
  
  // Static pages
  const staticPages = [
    '',
    '/products',
    '/about',
    '/bulk-orders',
    '/gift-packs',
    '/cart',
    '/auth/signin',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic product pages - using actual product slugs
  const productSlugs = [
    'premium-almonds',
    'ajwa-dates',
    'chilgoza-pine-nuts',
    'kashmir-walnuts',
    'cashew-nuts',
    'dried-apricots',
    'pistachios',
    'mixed-dry-fruits',
    'medjool-dates',
    'dried-figs',
    'raisins',
    'brazil-nuts',
  ]

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages]
}
