import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"
import { products } from "../lib/products"
import { config } from "dotenv"
import { resolve } from "path"

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") })

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

console.log("📦 Firebase Config:")
console.log("  - Project ID:", firebaseConfig.projectId)
console.log("  - Storage Bucket:", firebaseConfig.storageBucket)
console.log("")

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seedProducts() {
  console.log("🌱 Starting Firestore seed...")
  
  try {
    for (const product of products) {
      const productRef = doc(db, "products", product.id)
      await setDoc(productRef, {
        name: product.name,
        price: product.price,
        weight: product.weight,
        image: product.image,
        description: product.description || "",
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        reviews: product.reviews || [],
      })
      console.log(`✅ Added product: ${product.name}`)
    }
    
    console.log(`\n🎉 Successfully seeded ${products.length} products to Firestore!`)
    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding Firestore:", error)
    process.exit(1)
  }
}

seedProducts()
