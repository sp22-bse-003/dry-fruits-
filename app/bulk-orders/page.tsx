import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, FileText, Package, TrendingDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BulkOrdersPage() {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Wholesale Pricing",
      description: "Get the best prices on bulk orders starting from 10kg",
    },
    {
      icon: Package,
      title: "Custom Packaging",
      description: "Branded packaging options available for businesses",
    },
    {
      icon: FileText,
      title: "Transparent Pricing",
      description: "Download our PDF price sheets for complete transparency",
    },
    {
      icon: MessageCircle,
      title: "Dedicated Support",
      description: "Personal account manager for all your bulk order needs",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-primary/90 to-accent">
            <Image
              src="/premium-assorted-dry-fruits-almonds-dates-walnuts-.jpg"
              alt="Bulk Orders"
              fill
              className="object-cover brightness-[0.3] mix-blend-overlay"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Bulk Orders & B2B</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance leading-relaxed">
              Special pricing for restaurants, hotels, retailers, and corporate clients
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                      <benefit.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-secondary/30 rounded-lg p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">Ready to Place a Bulk Order?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Contact us on WhatsApp or email for custom quotes, price sheets, and special B2B pricing
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://wa.me/923450650242" target="_blank">
                  <Button size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Us
                  </Button>
                </Link>
                <Link href="mailto:bulk@premiumdryfruits.pk">
                  <Button size="lg" variant="outline">
                    Email for Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
