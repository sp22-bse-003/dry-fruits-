import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  <strong>Last Updated:</strong> October 30, 2025
                </p>
                <p className="text-muted-foreground">
                  Welcome to A1 Dry Fruits. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By using this website and placing an order, you agree to these Terms & Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, please do not use our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">2. Products and Services</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>All products are subject to availability</li>
                  <li>We reserve the right to limit quantities purchased</li>
                  <li>Product images are for illustration purposes only</li>
                  <li>Actual products may vary slightly in appearance</li>
                  <li>We strive to display accurate colors, but actual colors may vary</li>
                  <li>Weights mentioned are approximate and may have minor variations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">3. Pricing and Payment</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Pricing:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>All prices are in Pakistani Rupees (PKR)</li>
                    <li>Prices are subject to change without notice</li>
                    <li>The price at the time of order placement will be honored</li>
                    <li>Delivery charges apply as per our delivery policy</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Payment Methods:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Cash on Delivery (COD)</li>
                    <li>Bank Transfer</li>
                    <li>EasyPaisa</li>
                  </ul>
                  
                  <p className="mt-3">
                    By providing payment information, you confirm that you are authorized to use the payment method.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">4. Order Processing</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Order confirmation will be sent via SMS/Email</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                  <li>Orders may be cancelled if product is unavailable or pricing error occurs</li>
                  <li>Processing time: 1-2 business days</li>
                  <li>We will notify you if there are any delays</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">5. Delivery</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Delivery Policy:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Delivery fee: Rs. 200 (Free for orders above Rs. 5,000)</li>
                    <li>Delivery time: 3-7 business days depending on location</li>
                    <li>We deliver across Pakistan</li>
                    <li>Customer must be available at delivery address</li>
                    <li>Valid phone number required for delivery coordination</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Delivery Issues:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>We are not responsible for delays caused by courier services</li>
                    <li>Customer must inspect package upon delivery</li>
                    <li>Report any damage or missing items within 24 hours</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">6. Returns and Refunds</h2>
                <p className="text-muted-foreground mb-3">
                  Please see our detailed <a href="/policies/returns" className="text-primary underline">Return & Refund Policy</a> for complete information.
                </p>
                <p className="text-muted-foreground">
                  In brief: We accept returns within 7 days for damaged or incorrect products. Food items must be unopened and in original packaging.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">7. User Account</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>You are responsible for maintaining account confidentiality</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>We reserve the right to suspend or terminate accounts</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">8. Prohibited Activities</h2>
                <p className="text-muted-foreground mb-3">You may not:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Use our website for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our website</li>
                  <li>Upload viruses or malicious code</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect user information without consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">9. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including text, images, logos, and graphics, is the property of A1 Dry Fruits and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">10. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  A1 Dry Fruits shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products. Our liability is limited to the amount paid for the product.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">11. Product Quality</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>We source premium quality dry fruits from trusted suppliers</li>
                  <li>Products are stored in optimal conditions</li>
                  <li>We conduct quality checks before dispatch</li>
                  <li>Shelf life and expiry dates are clearly mentioned when applicable</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">12. Modifications to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">13. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of Pakistani courts.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">14. Contact Information</h2>
                <p className="text-muted-foreground mb-3">
                  For any questions regarding these Terms & Conditions, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> info@a1dryfruits.com</p>
                  <p><strong>Phone:</strong> +92 345 0650242</p>
                  <p><strong>WhatsApp:</strong> +92 345 0650242</p>
                  <p><strong>Business Hours:</strong> 9:00 AM - 8:00 PM (7 days a week)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
