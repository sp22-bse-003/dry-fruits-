import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"
import Link from "next/link"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export const revalidate = 0

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface OrderData {
  id: string
  items: OrderItem[]
  customer: {
    name: string
    phone: string
    city: string
    address: string
    notes?: string
  }
  paymentMethod: string
  userId: string | null
  subtotal: number
  deliveryFee: number
  total: number
  status: string
  createdAt: string
}

async function getOrder(id: string): Promise<OrderData | null> {
  try {
    const docRef = doc(db, "orders", id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return { id: docSnap.id, ...docSnap.data() } as OrderData
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export default async function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams
  const order = id ? await getOrder(id) : null

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">Thank you for your order!</h1>
          {!order ? (
            <p>We couldn't find your order details. You can continue shopping.</p>
          ) : (
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{order.customer?.name} — {order.customer?.phone}</p>
                  <p className="text-sm">{order.customer?.address}, {order.customer?.city}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Items</p>
                  {order.items?.map((i: any) => (
                    <div className="flex justify-between text-sm" key={i.id}>
                      <span>
                        {i.name} × {i.quantity}
                      </span>
                      <span>Rs. {formatNumber(i.price * i.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rs. {formatNumber(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{order.deliveryFee === 0 ? "FREE" : `Rs. ${formatNumber(order.deliveryFee)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">Rs. {formatNumber(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            <Link href="/products" className="underline">Continue shopping</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
