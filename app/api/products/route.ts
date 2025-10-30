import { NextResponse } from "next/server"
import type { Product } from "@/lib/products"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { products as seedProducts } from "@/lib/products"

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"))
    const items: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Product))
    return NextResponse.json(items.length ? items : seedProducts)
  } catch (e) {
    console.error("GET products error:", e)
    return NextResponse.json(seedProducts)
  }
}

export async function POST(req: Request) {
  const token = process.env.ADMIN_TOKEN
  const auth = req.headers.get("authorization") || ""
  if (!token || auth !== `Bearer ${token}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = (await req.json()) as Product
    if (!body?.id || !body?.name || typeof body.price !== "number" || !body.weight) {
      return new NextResponse("Invalid payload", { status: 400 })
    }

    const productRef = doc(db, "products", body.id)
    await setDoc(productRef, {
      name: body.name,
      price: body.price,
      weight: body.weight,
      image: body.image || "",
      description: body.description || "",
      rating: body.rating || 0,
      reviewCount: body.reviewCount || 0,
      reviews: body.reviews || [],
    })

    return NextResponse.json({ ok: true, id: body.id })
  } catch (e) {
    console.error("POST product error:", e)
    return new NextResponse("Failed to create product", { status: 500 })
  }
}
