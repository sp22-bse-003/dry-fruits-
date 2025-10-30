"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { formatNumber } from "@/lib/utils"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const totalPrice = getTotalPrice()
  const deliveryFee = totalPrice >= 5000 ? 0 : 200

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Add some delicious dry fruits to get started!</p>
                <Link href="/products">
                  <Button size="lg">Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.weight}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-lg font-bold text-primary">Rs. {formatNumber(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">Rs. {formatNumber(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span className="font-medium">
                          {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `Rs. ${deliveryFee}`}
                        </span>
                      </div>
                      {totalPrice < 5000 && (
                        <p className="text-sm text-muted-foreground">
                          Add Rs. {formatNumber(5000 - totalPrice)} more for free delivery!
                        </p>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-primary">Rs. {formatNumber(totalPrice + deliveryFee)}</span>
                        </div>
                      </div>
                      <Link href="/checkout">
                        <Button className="w-full" size="lg">
                          Proceed to Checkout
                        </Button>
                      </Link>
                      <Link href="/products">
                        <Button variant="outline" className="w-full bg-transparent" >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
