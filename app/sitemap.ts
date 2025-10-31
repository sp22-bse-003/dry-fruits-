import { MetadataRoute } from 'next'
import { products } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryfruits-ecommerce.vercel.app'
  
  // Static pages
  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/bulk-orders',
    '/gift-packs',
  ]
  
  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic product pages - fetch from actual products data
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch gift packs from Firebase
  let giftPackPages: MetadataRoute.Sitemap = []
  try {
    const { db } = await import('@/lib/firebase')
    const { collection, getDocs } = await import('firebase/firestore')
    
    const giftPacksSnapshot = await getDocs(collection(db, 'giftPacks'))
    giftPackPages = giftPacksSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        url: `${baseUrl}/gift-packs/${data.slug || doc.id}`,
        lastModified: data.updatedAt?.toDate() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error('Error fetching gift packs for sitemap:', error)
  }

  return [...staticPages, ...productPages, ...giftPackPages]
}
