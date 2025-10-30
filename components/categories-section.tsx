import Image from "next/image"
import Link from "next/link"

export function CategoriesSection() {
  const categories = [
    {
      name: "Nuts",
      image: "/assorted-nuts-almonds-walnuts-cashews.jpg",
      href: "/products?category=nuts",
    },
    {
      name: "Dates",
      image: "/premium-dates-varieties.jpg",
      href: "/products?category=dates",
    },
    {
      name: "Gift Packs",
      image: "/luxury-dry-fruits-gift-box.jpg",
      href: "/gift-packs",
    },
  ]

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Browse our collection organized by type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.href} className="group">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={`Shop for ${category.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white font-serif text-2xl font-bold p-6">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
