"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthModal } from "@/components/auth-modal"
import { PaymentInstructions } from "@/components/payment-instructions"
import { formatNumber } from "@/lib/utils"
import { User, LogIn, ShieldCheck } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CheckoutPage() {
  const router = useRouter()
  const { user, userProfile, signUp } = useAuth()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryFee = subtotal >= 5000 ? 0 : 200
  const total = subtotal + deliveryFee

  const [loading, setLoading] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)
  const [accountPassword, setAccountPassword] = useState("")
  const [transactionId, setTransactionId] = useState("")
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
    paymentMethod: "COD" as "COD" | "BANK_TRANSFER" | "EASYPAISA",
  })

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user && userProfile) {
      setForm(prev => ({
        ...prev,
        name: userProfile.displayName || user.displayName || prev.name,
        email: user.email || prev.email,
        phone: userProfile.phone || prev.phone,
        // Pre-fill address if user has a default address
        ...(userProfile.addresses && userProfile.addresses.length > 0 && {
          address: userProfile.addresses.find(a => a.isDefault)?.addressLine1 || userProfile.addresses[0].addressLine1,
          city: userProfile.addresses.find(a => a.isDefault)?.city || userProfile.addresses[0].city,
        })
      }))
    }
  }, [user, userProfile])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (items.length === 0) return
    
    // Validate transaction ID for non-COD payments
    if (form.paymentMethod !== "COD" && !transactionId.trim()) {
      alert("Please enter the transaction ID for your payment")
      return
    }
    
    setLoading(true)
    
    try {
      // If guest wants to create account, do it first
      if (!user && createAccount && accountPassword) {
        try {
          await signUp(form.email, accountPassword, form.name)
          // After signup, user will be automatically set by auth context
        } catch (signupError: any) {
          console.error("Account creation error:", signupError)
          // Continue with order even if signup fails
          alert("Could not create account, but we'll process your order. You can create an account later.")
        }
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            city: form.city,
            address: form.address,
            notes: form.notes || undefined,
          },
          paymentMethod: form.paymentMethod,
          transactionId: form.paymentMethod !== "COD" ? transactionId : undefined,
          paymentStatus: form.paymentMethod === "COD" ? "pending" : "verifying",
          userId: user?.uid || null, // Link order to authenticated user
        }),
      })
      if (!res.ok) throw new Error("Failed to place order")
      const order = await res.json()
      clearCart()
      router.replace(`/checkout/success?id=${order.id}`)
    } catch (err) {
      console.error(err)
      alert("Could not place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h1 className="font-serif text-3xl font-bold mb-6">Checkout</h1>

                {/* Sign In Option for Guests */}
                {!user && (
                  <Alert className="mb-6 bg-primary/5 border-primary/20">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <AlertDescription className="ml-2 flex items-center justify-between">
                      <span className="text-sm">
                        <strong>Have an account?</strong> Sign in for faster checkout & order tracking
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAuthModal(true)}
                        className="ml-4"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Logged In User Info */}
                {user && (
                  <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <AlertDescription className="ml-2">
                      <strong>Signed in as:</strong> {user.email}
                      <p className="text-xs text-muted-foreground mt-1">
                        Your order will be saved to your account
                      </p>
                    </AlertDescription>
                  </Alert>
                )}

                <form className="space-y-4" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        required 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        disabled={!!user}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        required 
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        disabled={!!user}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        required 
                        value={form.city} 
                        onChange={(e) => setForm({ ...form, city: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Complete Address</Label>
                    <Input 
                      id="address" 
                      required 
                      value={form.address} 
                      onChange={(e) => setForm({ ...form, address: e.target.value })} 
                      placeholder="House #, Street, Area"
                    />
                  </div>

                  {/* Guest Account Creation Option */}
                  {!user && (
                    <div className="rounded-lg border p-4 bg-accent/5">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="create-account"
                          checked={createAccount}
                          onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor="create-account"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            Create an account to track your order
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            View order history, save addresses, and get exclusive offers
                          </p>
                          {createAccount && (
                            <div className="mt-3">
                              <Label htmlFor="account-password" className="text-xs">
                                Set Password (min. 6 characters)
                              </Label>
                              <Input
                                id="account-password"
                                type="password"
                                placeholder="••••••••"
                                minLength={6}
                                required={createAccount}
                                value={accountPassword}
                                onChange={(e) => setAccountPassword(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="notes">Order Notes (optional)</Label>
                    <Textarea 
                      id="notes" 
                      value={form.notes} 
                      onChange={(e) => setForm({ ...form, notes: e.target.value })} 
                      placeholder="Any special instructions for your order"
                    />
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {(["COD", "BANK_TRANSFER", "EASYPAISA"] as const).map((pm) => (
                        <Button
                          key={pm}
                          type="button"
                          variant={form.paymentMethod === pm ? "default" : "outline"}
                          className={form.paymentMethod === pm ? "" : "bg-transparent"}
                          onClick={() => setForm((f) => ({ ...f, paymentMethod: pm }))}
                        >
                          {pm === "EASYPAISA" ? "EasyPaisa" : pm.replace("_", " ")}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <PaymentInstructions 
                    paymentMethod={form.paymentMethod}
                    totalAmount={total}
                    onTransactionIdChange={setTransactionId}
                  />

                  <Button type="submit" size="lg" disabled={loading || items.length === 0}>
                    {loading ? "Placing order..." : "Place Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  {items.map((i) => (
                    <div className="flex justify-between text-sm" key={i.id}>
                      <span>
                        {i.name} × {i.quantity}
                      </span>
                      <span>Rs. {formatNumber(i.price * i.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">Rs. {formatNumber(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">{deliveryFee === 0 ? "FREE" : `Rs. ${formatNumber(deliveryFee)}`}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">Rs. {formatNumber(total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onSuccess={() => {
          // Form will auto-fill via useEffect when user state changes
        }}
      />
    </div>
  )
}
