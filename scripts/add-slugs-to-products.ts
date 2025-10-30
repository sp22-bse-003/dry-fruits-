import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBvQlq31VCVUvznSNg8R7e7wDc0qJM4o9o",
  authDomain: "a1dryfruits-e5b09.firebaseapp.com",
  projectId: "a1dryfruits-e5b09",
  storageBucket: "a1dryfruits-e5b09.firebasestorage.app",
  messagingSenderId: "636743634299",
  appId: "1:636743634299:web:99d26d3d7cb50ff37b1e76",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Function to create slug from name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

async function addSlugsToProducts() {
  try {
    const productsRef = collection(db, "products")
    const snapshot = await getDocs(productsRef)
    
    console.log(`Found ${snapshot.docs.length} products`)
    
    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data()
      const slug = createSlug(data.name)
      
      await updateDoc(doc(db, "products", docSnapshot.id), {
        slug: slug
      })
      
      console.log(`✓ Updated ${data.name} with slug: ${slug}`)
    }
    
    console.log("\n✅ All products updated successfully!")
  } catch (error) {
    console.error("❌ Error updating products:", error)
  }
}

addSlugsToProducts()
