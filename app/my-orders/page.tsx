"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatNumber } from "@/lib/utils"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Package, Calendar, MapPin, Phone, Mail, CreditCard, Eye } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  items: any[]
  customer: {
    name: string
    email: string
    phone: string
    city: string
    address: string
    notes?: string
  }
  paymentMethod: string
  transactionId?: string
  paymentStatus?: string
  subtotal: number
  deliveryFee: number
  total: number
  status: string
  createdAt: string
  userId?: string
}

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/checkout")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return

      try {
        const ordersRef = collection(db, "orders")
        const q = query(
          ordersRef,
          where("userId", "==", user.uid)
        )
        const querySnapshot = await getDocs(q)
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[]

        // Sort by date descending
        ordersData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setOrders(ordersData)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl font-bold mb-8">My Orders</h1>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">
              View and track all your orders
            </p>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="font-serif text-2xl font-bold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start shopping to see your orders here
                </p>
                <Link href="/products">
                  <Button>Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 border-b">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {/* Customer Info */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                          Customer Details
                        </h3>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span className="text-sm">{order.customer.email}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span className="text-sm">{order.customer.phone}</span>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                          Delivery Address
                        </h3>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="text-sm">
                            <div>{order.customer.address}</div>
                            <div>{order.customer.city}</div>
                          </div>
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                          Payment
                        </h3>
                        <div className="flex items-start gap-2">
                          <CreditCard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="text-sm">
                            <div>{order.paymentMethod.replace("_", " ")}</div>
                            {order.transactionId && (
                              <div className="mt-1 text-xs text-muted-foreground">
                                TXN: {order.transactionId}
                              </div>
                            )}
                            {order.paymentStatus && (
                              <Badge 
                                variant="outline" 
                                className="mt-1 text-xs"
                              >
                                {order.paymentStatus}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <h3 className="font-semibold mb-3">Items ({order.items.length})</h3>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium">
                              Rs. {formatNumber(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-3 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>Rs. {formatNumber(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Delivery Fee</span>
                          <span>
                            {order.deliveryFee === 0 ? "FREE" : `Rs. ${formatNumber(order.deliveryFee)}`}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total</span>
                          <span className="text-primary">Rs. {formatNumber(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-4">
                      <Link href={`/checkout/success?id=${order.id}`}>
                        <Button variant="outline" className="w-full md:w-auto">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
