import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customer, paymentMethod, transactionId, paymentStatus, userId } = body

    const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
    const deliveryFee = subtotal >= 5000 ? 0 : 200
    const total = subtotal + deliveryFee

    const payload = {
      items,
      customer,
      paymentMethod: paymentMethod || "COD",
      transactionId: transactionId || null,
      paymentStatus: paymentStatus || "pending",
      userId: userId || null, // Link order to user if authenticated
      subtotal,
      deliveryFee,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const ordersRef = collection(db, "orders")
    const docRef = await addDoc(ordersRef, payload)
    
    return NextResponse.json({ id: docRef.id, ...payload }, { status: 201 })
  } catch (e: any) {
    console.error("Create order error", e)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"))
    const orders = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    // Sort by createdAt desc (client-side since we don't have server-side orderBy without composite index)
    orders.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    return NextResponse.json({ orders: orders.slice(0, 100) })
  } catch (e) {
    console.error("List orders error", e)
    return NextResponse.json({ error: "Failed to list orders" }, { status: 500 })
  }
}
