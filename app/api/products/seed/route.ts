import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { products as seedProducts } from "@/lib/products"

export async function POST(req: Request) {
  const token = process.env.ADMIN_TOKEN
  const auth = req.headers.get("authorization") || ""
  if (!token || auth !== `Bearer ${token}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    let count = 0
    for (const p of seedProducts) {
      const productRef = doc(db, "products", p.id)
      await setDoc(productRef, {
        name: p.name,
        price: p.price,
        weight: p.weight,
        image: p.image,
        description: p.description || "",
        rating: p.rating || 0,
        reviewCount: p.reviewCount || 0,
        reviews: p.reviews || [],
      })
      count++
    }
    return NextResponse.json({ ok: true, count })
  } catch (e) {
    console.error("Seed products error", e)
    return new NextResponse("Failed to seed products", { status: 500 })
  }
}
