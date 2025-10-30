import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const docRef = doc(db, "orders", id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() })
  } catch (e) {
    console.error("Get order error", e)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}
