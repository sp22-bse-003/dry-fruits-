import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PackageCheck, Package, AlertCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-8">Return & Refund Policy</h1>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  <strong>Last Updated:</strong> October 30, 2025
                </p>
                <p className="text-muted-foreground">
                  At A1 Dry Fruits, customer satisfaction is our priority. We want you to be completely happy with your purchase. Please read our return and refund policy carefully.
                </p>
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                <PackageCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="ml-2">
                  <strong className="text-blue-900 dark:text-blue-100">7-Day Return Policy</strong>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    You can return eligible products within 7 days of delivery
                  </p>
                </AlertDescription>
              </Alert>

              <div>
                <h2 className="text-2xl font-bold mb-3">1. Eligibility for Returns</h2>
                <p className="text-muted-foreground mb-3">
                  We accept returns under the following conditions:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <PackageCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">Damaged Products</p>
                      <p className="text-sm text-green-800 dark:text-green-200">Products received in damaged or broken condition</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <PackageCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">Wrong Product</p>
                      <p className="text-sm text-green-800 dark:text-green-200">Received a different product than ordered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <PackageCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">Expired Products</p>
                      <p className="text-sm text-green-800 dark:text-green-200">Products past their expiration date</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <PackageCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 dark:text-green-100">Quality Issues</p>
                      <p className="text-sm text-green-800 dark:text-green-200">Products with quality defects (stale, contaminated, etc.)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">2. Non-Returnable Items</h2>
                <Alert className="bg-red-50 dark:bg-red-950 border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <AlertDescription className="ml-2">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      The following items CANNOT be returned:
                    </p>
                  </AlertDescription>
                </Alert>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mt-3">
                  <li>Opened or used products (for hygiene and food safety reasons)</li>
                  <li>Products with broken or tampered seals</li>
                  <li>Items without original packaging</li>
                  <li>Products damaged due to mishandling by customer</li>
                  <li>Items returned after 7 days of delivery</li>
                  <li>Custom or special orders (unless defective)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">3. Return Process</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Contact Us</p>
                      <p className="text-sm text-muted-foreground">
                        Contact us within 7 days of delivery via phone, WhatsApp, or email
                      </p>
                      <div className="mt-2 text-sm">
                        <p>📞 Phone: +92 345 0650242</p>
                        <p>📱 WhatsApp: +92 345 0650242</p>
                        <p>✉️ Email: info@a1dryfruits.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">Provide Details</p>
                      <p className="text-sm text-muted-foreground">
                        Share your order number, product details, and reason for return. Include photos/videos of damaged or incorrect items.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">Approval</p>
                      <p className="text-sm text-muted-foreground">
                        Our team will review your request and approve if it meets our return criteria.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-semibold">Return Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        We will arrange pickup or provide return shipping instructions. Keep the product in its original packaging.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <p className="font-semibold">Refund/Replacement</p>
                      <p className="text-sm text-muted-foreground">
                        Once we receive and inspect the item, we'll process your refund or send a replacement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">4. Refund Policy</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Refund Methods:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>Cash on Delivery:</strong> Bank transfer to your account</li>
                    <li><strong>Online Payment:</strong> Refund to original payment method</li>
                    <li><strong>Bank Transfer:</strong> Refund to your bank account</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Refund Timeline:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Refund processing: 3-5 business days after receiving the returned item</li>
                    <li>Bank transfer: 5-7 business days</li>
                    <li>Online payment refund: 7-10 business days</li>
                  </ul>
                  
                  <p className="mt-3">
                    <strong>Note:</strong> Delivery charges are non-refundable unless the return is due to our error (damaged, wrong, or defective product).
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">5. Replacement Policy</h2>
                <p className="text-muted-foreground mb-3">
                  You can choose a replacement instead of a refund for:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Damaged products</li>
                  <li>Wrong items received</li>
                  <li>Defective products</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Replacement will be shipped at no additional cost. Processing time: 2-3 business days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">6. Cancellation Policy</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Before Shipping:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Orders can be cancelled free of charge</li>
                    <li>Contact us immediately to cancel</li>
                    <li>Full refund will be processed</li>
                  </ul>
                  
                  <p className="mt-3"><strong>After Shipping:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Orders cannot be cancelled once shipped</li>
                    <li>You can refuse delivery and request a refund</li>
                    <li>Delivery charges may apply</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">7. Important Notes</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Always inspect your order upon delivery</li>
                  <li>Take photos/videos if you notice any damage or issues</li>
                  <li>Keep the original packaging until you're satisfied with the product</li>
                  <li>Contact us immediately if there are any problems</li>
                  <li>Return shipping costs are borne by us for defective/wrong items</li>
                  <li>Customer bears return shipping for non-defective items</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">8. Exchange Policy</h2>
                <p className="text-muted-foreground">
                  We offer exchanges for different products or sizes (subject to availability). Exchange requests must be made within 7 days of delivery. Additional charges may apply for price differences.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">9. Contact for Returns</h2>
                <p className="text-muted-foreground mb-3">
                  For any return or refund queries, please contact our customer service:
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> returns@a1dryfruits.com or info@a1dryfruits.com</p>
                  <p><strong>Phone:</strong> +92 345 0650242</p>
                  <p><strong>WhatsApp:</strong> +92 345 0650242</p>
                  <p><strong>Business Hours:</strong> 9:00 AM - 8:00 PM (7 days a week)</p>
                </div>
              </div>

              <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200">
                <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="ml-2">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Quality Guarantee:</strong> We stand behind the quality of our products. If you're not satisfied, we'll make it right!
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
