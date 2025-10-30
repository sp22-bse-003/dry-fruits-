import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OptimizedImage } from "@/components/optimized-image"
import type { Product } from "@/lib/products"
import { formatNumber } from "@/lib/utils"
import { AddToCartButton } from "@/components/add-to-cart-button"
import type { Metadata } from "next"
import { ProductSchema } from "@/components/seo/product-schema"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dryfruits.com"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    // Try API first (will use slug)
    const { getProductBySlug } = await import("@/lib/products")
    return getProductBySlug(slug)
  } catch (e) {
    const { getProductBySlug } = await import("@/lib/products")
    return getProductBySlug(slug)
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  const productUrl = `${SITE_URL}/products/${slug}`

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  const metaTitle = product.meta?.title || `Buy ${product.name} Online in Pakistan | DryFruits PK`
  const metaDescription = product.meta?.description || product.description?.substring(0, 160) || `Order high-quality ${product.name} online. We deliver premium dry fruits across Pakistan.`
  const metaKeywords = product.meta?.keywords || [product.name, "dry fruits", "pakistan", "buy online"]
  const ogImage = product.image ? `${SITE_URL}${product.image}` : `${SITE_URL}/placeholder.svg`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: productUrl,
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  }
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <p className="text-center text-muted-foreground">Product not found.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProductSchema product={product} siteUrl={SITE_URL} />
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg border">
                <OptimizedImage
                  src={product.image || "/placeholder.svg"}
                  alt={`High-quality ${product.name} - a premium dry fruit available in Pakistan`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <div
                  className="text-muted-foreground mb-6 leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mb-1 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-3 [&>strong]:font-bold [&>em]:italic [&>a]:text-primary [&>a]:underline"
                  dangerouslySetInnerHTML={{
                    __html: product.description || "Delicious premium quality dry fruit."
                  }}
                />
                <div className="flex items-center gap-6 mb-6">
                  <span className="text-2xl font-bold text-primary">Rs. {formatNumber(product.price)}</span>
                  <span className="text-sm text-muted-foreground">Pack: {product.weight}</span>
                </div>
                <AddToCartButton
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  weight={product.weight}
                  inStock={product.inStock}
                  stockQuantity={product.stockQuantity}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
