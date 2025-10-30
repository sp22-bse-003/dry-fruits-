import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  <strong>Last Updated:</strong> October 30, 2025
                </p>
                <p className="text-muted-foreground">
                  At A1 Dry Fruits, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Personal Information:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Name and contact details (phone number, email address)</li>
                    <li>Delivery address and city</li>
                    <li>Payment information (if applicable)</li>
                    <li>Order history and preferences</li>
                  </ul>
                  
                  <p className="mt-3"><strong>Automatically Collected Information:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and delivery updates</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Improve our website and services</li>
                  <li>Send promotional offers and marketing communications (with your consent)</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">3. Information Sharing</h2>
                <p className="text-muted-foreground mb-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li><strong>Delivery Partners:</strong> To deliver your orders</li>
                  <li><strong>Payment Processors:</strong> To process transactions securely</li>
                  <li><strong>Service Providers:</strong> Who assist in operating our website and business</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mt-3">
                  <li>Secure SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information by authorized personnel only</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">5. Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
                <p className="text-muted-foreground mb-3">You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">7. Third-Party Links</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">8. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">9. Changes to Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">10. Contact Us</h2>
                <p className="text-muted-foreground mb-3">
                  If you have any questions about this Privacy Policy or your personal data, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> info@a1dryfruits.com</p>
                  <p><strong>Phone:</strong> +92 345 0650242</p>
                  <p><strong>WhatsApp:</strong> +92 345 0650242</p>
                  <p><strong>Address:</strong> Pakistan</p>
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
