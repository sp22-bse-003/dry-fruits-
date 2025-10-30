export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DryFruits.pk",
    "alternateName": "DryFruits Pakistan",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    "description": "Pakistan's trusted online dry fruits marketplace offering premium almonds, dates, cashews, walnuts, and more.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK",
      "addressLocality": "Pakistan"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-345-0650242",
      "contactType": "Customer Service",
      "areaServed": "PK",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/dryfruitspk",
      "https://www.instagram.com/dryfruitspk",
      "https://wa.me/923450650242"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DryFruits.pk",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProductSchema({ product }: { product: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Premium ${product.name} from Pakistan`,
    "image": product.image,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "PKR",
      "availability": product.inStock !== false 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "DryFruits.pk"
      }
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount || 1
    } : undefined
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
