import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Award, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: "Authenticity",
      description: "Sourced directly from trusted growers in Balochistan and Gilgit-Baltistan",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Strict quality checks and grading for every product we sell",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Dedicated to providing the best service and support",
    },
    {
      icon: Heart,
      title: "Trust & Transparency",
      description: "Honest pricing and clear policies for peace of mind",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/pakistani-dry-fruits-farm-landscape-balochistan-mo.jpg"
              alt="About Us"
              fill
              className="object-cover brightness-50"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-balance leading-relaxed">
              Bringing Pakistan's finest dry fruits directly to your doorstep
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Premium Dry Fruits was founded with a simple mission: to make authentic, high-quality Pakistani dry
                fruits accessible to everyone. We work directly with local growers in the fertile regions of Balochistan
                and Gilgit-Baltistan, ensuring that every product meets our strict quality standards.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started as a small family business has grown into Pakistan's trusted source for premium dry fruits.
                We're proud to serve thousands of customers across the country, from individual families to restaurants,
                hotels, and corporate clients.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Why Choose Us?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-xl mb-2">Direct from Growers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We partner directly with regional growers, cutting out middlemen to ensure freshness and fair
                    pricing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every batch undergoes strict quality checks, proper packaging, and careful grading before reaching
                    you.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Customer-First Policies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Free delivery over Rs. 500, 5-day return policy, and 24/7 WhatsApp support for your peace of mind.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Nationwide Delivery</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We deliver across Pakistan with plans to expand internationally soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
