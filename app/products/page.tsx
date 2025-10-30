import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Premium Dry Fruits Online Pakistan | DryFruits.pk",
  description: "Shop premium quality dry fruits online in Pakistan. Almonds, dates, cashews, walnuts, pistachios & more. Direct from growers. Free delivery on orders over Rs.5000. Cash on delivery available.",
  keywords: "buy dry fruits online Pakistan, almonds Pakistan, dates online, cashews, walnuts, pistachios, chilgoza, premium dry fruits",
}

export const revalidate = 0 // Force fresh data

async function getProductsFromApi(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/products`, { 
      next: { revalidate: 0 },
      cache: 'no-store'
    })
    if (!res.ok) throw new Error("Failed")
    const data = await res.json()
    return Array.isArray(data) ? data : data.products || []
  } catch (e) {
    const { getAllProducts } = await import("@/lib/products")
    return getAllProducts()
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams
  const allProducts = await getProductsFromApi()
  
  // Filter products based on search query
  const filteredProducts = search
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {search ? `Search Results for "${search}"` : "Buy Premium Dry Fruits Online in Pakistan"}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {search
                  ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`
                  : "Shop from Pakistan's largest online dry fruits collection. Premium quality almonds, dates, cashews, walnuts, pistachios and more. Direct from Gilgit-Baltistan and Balochistan growers."}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No products found matching "{search}"</p>
                <p className="text-sm text-muted-foreground">Try searching for almonds, dates, cashews, walnuts, or pistachios</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
