export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface ProductMeta {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  weight: string
  image: string
  description?: string
  rating?: number
  reviewCount?: number
  reviews?: Review[]
  meta?: ProductMeta
  inStock?: boolean
  stockQuantity?: number
  sku?: string
  brand?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Almonds",
    slug: "premium-almonds",
    price: 1200,
    weight: "500g",
    image: "/premium-california-almonds-close-up.jpg",
    description: "Crunchy California almonds packed with protein and healthy fats.",
    rating: 4.8,
    reviewCount: 24,
    reviews: [
      { id: "r1", author: "Ali Khan", rating: 5, comment: "Excellent quality almonds, very fresh!", date: "2025-10-15" },
      { id: "r2", author: "Sara Ahmed", rating: 4, comment: "Good taste but slightly expensive.", date: "2025-10-10" }
    ]
  },
  {
    id: "2",
    name: "Ajwa Dates",
    slug: "ajwa-dates",
    price: 1500,
    weight: "500g",
    image: "/ajwa-dates-from-madina-close-up.jpg",
    description: "Soft, fiber-rich Ajwa dates with a naturally sweet taste.",
    rating: 5.0,
    reviewCount: 42,
    reviews: [
      { id: "r3", author: "Fatima", rating: 5, comment: "Authentic Ajwa dates, best quality!", date: "2025-10-12" }
    ]
  },
  {
    id: "3",
    name: "Chilgoza Pine Nuts",
    slug: "chilgoza-pine-nuts",
    price: 3500,
    weight: "250g",
    image: "/chilgoza-pine-nuts-close-up.jpg",
    description: "Rare Chilgoza pine nuts from Pakistan's northern regions.",
    rating: 4.7,
    reviewCount: 18,
    reviews: []
  },
  {
    id: "4",
    name: "Kashmir Walnuts",
    slug: "kashmir-walnuts",
    price: 1800,
    weight: "500g",
    image: "/kashmir-walnuts-close-up.jpg",
    description: "Light-colored walnut kernels with rich omega-3 content.",
    rating: 4.6,
    reviewCount: 31,
    reviews: []
  },
  {
    id: "5",
    name: "Cashew Nuts",
    slug: "cashew-nuts",
    price: 1600,
    weight: "500g",
    image: "/premium-cashew-nuts-close-up.jpg",
    description: "Premium whole cashews — buttery, fresh, and perfectly roasted.",
    rating: 4.9,
    reviewCount: 56,
    reviews: []
  },
  {
    id: "6",
    name: "Dried Apricots",
    slug: "dried-apricots",
    price: 900,
    weight: "500g",
    image: "/dried-apricots-hunza-close-up.jpg",
    description: "Naturally sun-dried Hunza apricots — sweet and tangy.",
    rating: 4.5,
    reviewCount: 22,
    reviews: []
  },
  {
    id: "7",
    name: "Pistachios",
    slug: "pistachios",
    price: 2200,
    weight: "500g",
    image: "/premium-pistachios-close-up.jpg",
    description: "Roasted pistachios with a savory crunch — a perfect snack.",
    rating: 4.7,
    reviewCount: 38,
    reviews: []
  },
  {
    id: "8",
    name: "Mixed Dry Fruits",
    slug: "mixed-dry-fruits",
    price: 1400,
    weight: "500g",
    image: "/mixed-dry-fruits-assortment-close-up.jpg",
    description: "A balanced mix of almonds, cashews, pistachios, and raisins.",
    rating: 4.6,
    reviewCount: 45,
    reviews: []
  },
  {
    id: "9",
    name: "Medjool Dates",
    slug: "medjool-dates",
    price: 1800,
    weight: "500g",
    image: "/medjool-dates-premium-close-up.jpg",
    description: "Large, soft Medjool dates with a caramel-like sweetness.",
    rating: 4.8,
    reviewCount: 29,
    reviews: []
  },
  {
    id: "10",
    name: "Dried Figs",
    slug: "dried-figs",
    price: 1100,
    weight: "500g",
    image: "/dried-figs-close-up.jpg",
    description: "Naturally sweet dried figs — great for snacking and baking.",
    rating: 4.4,
    reviewCount: 19,
    reviews: []
  },
  {
    id: "11",
    name: "Raisins",
    slug: "raisins",
    price: 600,
    weight: "500g",
    image: "/golden-raisins-close-up.jpg",
    description: "Golden raisins — plump, sweet, and perfect for desserts.",
    rating: 4.3,
    reviewCount: 27,
    reviews: []
  },
  {
    id: "12",
    name: "Brazil Nuts",
    slug: "brazil-nuts",
    price: 2000,
    weight: "500g",
    image: "/brazil-nuts-premium-close-up.jpg",
    description: "Large Brazil nuts rich in selenium and healthy fats.",
    rating: 4.5,
    reviewCount: 15,
    reviews: []
  },
]

export function getAllProducts() {
  return products
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    // Fetch from Firestore
    const { db } = await import("@/lib/firebase")
    const { collection, query, where, getDocs } = await import("firebase/firestore")
    
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("slug", "==", slug))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data(),
      } as Product
    }
    
    // Fallback to local data if not found in Firestore
    return products.find((p) => p.slug === slug)
  } catch (error) {
    console.error("Error fetching product from Firestore:", error)
    // Fallback to local data on error
    return products.find((p) => p.slug === slug)
  }
}
