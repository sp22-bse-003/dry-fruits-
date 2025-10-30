import { NextResponse } from "next/server"
import type { Product } from "@/lib/products"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { products as seedProducts } from "@/lib/products"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      const local = seedProducts.find((p) => p.id === id)
      if (!local) return new NextResponse("Not found", { status: 404 })
      return NextResponse.json(local)
    }
    
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() } as Product)
  } catch (e) {
    const { id } = await params
    const local = seedProducts.find((p) => p.id === id)
    if (!local) return new NextResponse("Not found", { status: 404 })
    return NextResponse.json(local)
  }
}

export async function PUT(req: Request, { params }: Params) {
  const token = process.env.ADMIN_TOKEN
  const auth = req.headers.get("authorization") || ""
  if (!token || auth !== `Bearer ${token}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { id } = await params
    const body = (await req.json()) as Partial<Product>
    const productRef = doc(db, "products", id)
    
    if (typeof body.price === "number" && Object.keys(body).length === 1) {
      // Price-only update
      await updateDoc(productRef, { price: body.price })
      return NextResponse.json({ ok: true })
    }

    // Full upsert if complete payload provided
    if (body && body.name && typeof body.price === "number" && body.weight && body.image) {
      await setDoc(productRef, {
        name: body.name,
        price: body.price,
        weight: body.weight,
        image: body.image,
        description: body.description || "",
        rating: body.rating || 0,
        reviewCount: body.reviewCount || 0,
        reviews: body.reviews || [],
      })
      return NextResponse.json({ ok: true })
    }

    return new NextResponse("Invalid payload", { status: 400 })
  } catch (e) {
    console.error("PUT product error:", e)
    return new NextResponse("Failed to update product", { status: 500 })
  }
}
