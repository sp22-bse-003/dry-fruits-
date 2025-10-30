import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, MapPin, Package, Clock } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-8">Shipping & Delivery Policy</h1>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  <strong>Last Updated:</strong> October 30, 2025
                </p>
                <p className="text-muted-foreground">
                  At A1 Dry Fruits, we deliver premium quality dry fruits across Pakistan with care and efficiency. Read our shipping policy for delivery details.
                </p>
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="ml-2">
                  <strong className="text-blue-900 dark:text-blue-100">Free Shipping on Orders Over Rs. 5,000!</strong>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    Standard delivery fee: Rs. 200
                  </p>
                </AlertDescription>
              </Alert>

              <div>
                <h2 className="text-2xl font-bold mb-3">1. Delivery Coverage</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">Nationwide Delivery</p>
                      <p className="text-sm text-green-800 dark:text-green-200">We deliver to all cities and major towns across Pakistan</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    <strong>Major Cities:</strong> Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala, and all other cities.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">2. Shipping Charges</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 text-left">Order Amount</th>
                        <th className="border p-3 text-left">Delivery Fee</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr>
                        <td className="border p-3">Below Rs. 5,000</td>
                        <td className="border p-3 font-semibold">Rs. 200</td>
                      </tr>
                      <tr className="bg-green-50 dark:bg-green-950">
                        <td className="border p-3">Rs. 5,000 and above</td>
                        <td className="border p-3 font-semibold text-green-600">FREE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  * Delivery charges are calculated at checkout based on your order total.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">3. Delivery Time</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Processing Time</p>
                      <p className="text-sm text-muted-foreground">1-2 business days for order processing and packaging</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left">Location Type</th>
                          <th className="border p-3 text-left">Delivery Time</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr>
                          <td className="border p-3">Major Cities</td>
                          <td className="border p-3">3-5 business days</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Other Cities</td>
                          <td className="border p-3">5-7 business days</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Remote Areas</td>
                          <td className="border p-3">7-10 business days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    * Business days exclude weekends and public holidays. Actual delivery time may vary due to courier service schedules.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">4. Order Tracking</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Order confirmation will be sent via SMS and Email</li>
                  <li>Tracking number will be provided once the order is shipped</li>
                  <li>Track your order through our courier partner's website</li>
                  <li>You can also check order status in "My Orders" section (for registered users)</li>
                  <li>Our support team is available to help with tracking queries</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">5. Delivery Process</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Order Confirmation</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive order confirmation via SMS/Email immediately after placing order
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">Order Processing</p>
                      <p className="text-sm text-muted-foreground">
                        We carefully pack your order with quality packaging materials (1-2 days)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">Dispatch</p>
                      <p className="text-sm text-muted-foreground">
                        Order is handed over to courier service with tracking number
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-semibold">Out for Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Courier will contact you for delivery. Please keep your phone accessible
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <p className="font-semibold">Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Receive your order and inspect the package before accepting
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">6. Packaging</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Premium quality packaging materials used</li>
                  <li>Products sealed to maintain freshness</li>
                  <li>Protective packaging to prevent damage during transit</li>
                  <li>Eco-friendly packaging materials whenever possible</li>
                  <li>Clear labeling with product and expiry information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">7. Delivery Instructions</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>For Customers:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide accurate and complete delivery address</li>
                    <li>Include landmark and detailed directions if needed</li>
                    <li>Keep phone number active and accessible</li>
                    <li>Someone must be available to receive the delivery</li>
                    <li>Inspect package before signing/accepting delivery</li>
                  </ul>
                  
                  <p className="mt-3"><strong>At the Time of Delivery:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Check package for any visible damage</li>
                    <li>Verify items against your order</li>
                    <li>Report any issues immediately to courier and us</li>
                    <li>For COD: Have exact cash amount ready</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">8. Delivery Delays</h2>
                <p className="text-muted-foreground mb-3">
                  Delivery may be delayed due to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Extreme weather conditions</li>
                  <li>Natural disasters or emergencies</li>
                  <li>Political unrest or strikes</li>
                  <li>Public holidays or festive seasons</li>
                  <li>Incomplete or incorrect address</li>
                  <li>Customer unavailability</li>
                  <li>Courier service delays</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  We will notify you of any significant delays. We appreciate your patience and understanding.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">9. Failed Delivery Attempts</h2>
                <p className="text-muted-foreground mb-3">
                  If delivery fails due to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Customer unavailable</li>
                  <li>Incorrect address or phone number</li>
                  <li>Customer refuses to accept</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  The courier will make 2-3 attempts. After that, the order will be returned to us. Re-delivery charges may apply.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">10. International Shipping</h2>
                <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200">
                  <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="ml-2">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Currently, we only deliver within Pakistan. International shipping is not available at this time.
                    </p>
                  </AlertDescription>
                </Alert>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">11. Bulk Orders</h2>
                <p className="text-muted-foreground mb-3">
                  For bulk orders (above 10kg or Rs. 20,000):
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Contact us for special shipping arrangements</li>
                  <li>We can arrange express delivery</li>
                  <li>Discounted shipping rates may apply</li>
                  <li>Dedicated support for order tracking</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">12. Contact Shipping Support</h2>
                <p className="text-muted-foreground mb-3">
                  For shipping queries, tracking, or delivery issues:
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> shipping@a1dryfruits.com or info@a1dryfruits.com</p>
                  <p><strong>Phone:</strong> +92 345 0650242</p>
                  <p><strong>WhatsApp:</strong> +92 345 0650242</p>
                  <p><strong>Business Hours:</strong> 9:00 AM - 8:00 PM (7 days a week)</p>
                </div>
              </div>

              <Alert className="bg-green-50 dark:bg-green-950 border-green-200">
                <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="ml-2">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Safe Delivery Guarantee:</strong> We ensure your products are delivered safely and in perfect condition!
                  </p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
