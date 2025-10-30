import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Product } from "@/lib/products"

export const revalidate = 0 // Force fresh data

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products`, { 
      next: { revalidate: 0 },
      cache: 'no-store' 
    })
    if (!res.ok) throw new Error("Failed")
    return (await res.json()) as Product[]
  } catch (e) {
    console.log("Using local products")
    const { getAllProducts } = await import("@/lib/products")
    return getAllProducts()
  }
}

export async function ProductsSection() {
  const products = (await getProducts()).slice(0, 8)

  return (
    <section className="py-12 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Best Selling Products</h2>
            <p className="text-sm text-muted-foreground">
              Top rated dry fruits loved by our customers
            </p>
          </div>
          <Link href="/products" className="hidden sm:block">
            <Button variant="outline" size="sm">
              View All →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/products">
            <Button variant="outline" className="w-full">
              View All Products →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
