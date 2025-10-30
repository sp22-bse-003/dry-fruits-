"use client"

import type { Product } from "@/lib/products"
import { formatNumber } from "@/lib/utils"

type ProductSchemaProps = {
  product: Product
  siteUrl: string
}

export function ProductSchema({ product, siteUrl }: ProductSchemaProps) {
  const productUrl = `${siteUrl}/products/${product.slug}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description?.substring(0, 5000) || `Buy high-quality ${product.name} online. Premium dry fruits delivered to your doorstep in Pakistan.`,
    image: product.image ? [`${siteUrl}${product.image}`] : [],
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || "DryFruits PK",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "PKR",
      price: formatNumber(product.price),
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "DryFruits PK",
      },
    },
    // If you have reviews, you can add them here
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.5",
    //   reviewCount": "89"
    // },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
