"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package } from "lucide-react"

interface Order {
  id: string
  userId: string
  items: Array<{ id: string; name: string; price: number; quantity: number }>
  total: number
  status: string
  customerInfo: any
  createdAt: any
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        // Filter orders for current user
        const userOrders = data.orders.filter((order: Order) => order.userId === user?.uid)
        setOrders(userOrders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-sm text-muted-foreground">Start shopping to see your orders here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                  <Badge>{order.status || "pending"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>Rs. {order.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
