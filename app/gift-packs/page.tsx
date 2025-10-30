import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

export default function GiftPacksPage() {
  const giftPacks = [
    {
      id: "gift-1",
      name: "Eid Special Gift Box",
      price: 3500,
      weight: "1.5kg",
      image: "/luxury-eid-dry-fruits-gift-box-hamper.jpg",
    },
    {
      id: "gift-2",
      name: "Wedding Hamper",
      price: 5000,
      weight: "2kg",
      image: "/elegant-wedding-dry-fruits-hamper-gift-basket.jpg",
    },
    {
      id: "gift-3",
      name: "Ramadan Gift Pack",
      price: 2800,
      weight: "1kg",
      image: "/ramadan-dates-and-dry-fruits-gift-box.jpg",
    },
    {
      id: "gift-4",
      name: "Corporate Gift Box",
      price: 4500,
      weight: "2kg",
      image: "/premium-corporate-dry-fruits-gift-box.jpg",
    },
    {
      id: "gift-5",
      name: "Premium Assortment",
      price: 6000,
      weight: "2.5kg",
      image: "/luxury-dry-fruits-assortment-gift-hamper.jpg",
    },
    {
      id: "gift-6",
      name: "Family Pack",
      price: 3200,
      weight: "1.5kg",
      image: "/family-size-dry-fruits-gift-pack.jpg",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Gift Packs & Hampers</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Beautifully packaged gift boxes perfect for Eid, Ramadan, weddings, and corporate gifting
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {giftPacks.map((product) => (
                <ProductCard slug={""} key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
