import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, ShieldCheck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/5 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content - Product Focus */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1.5 mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">100% Authentic Products</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
              Premium Dry Fruits in Pakistan
              <span className="block text-primary mt-1">Direct from Growers</span>
            </h1>
            
            <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0">
              Shop Pakistan's finest almonds, cashews, dates & walnuts. Sourced from Gilgit-Baltistan & Balochistan. Free delivery on orders over Rs.5000.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-xs text-muted-foreground">Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-xs text-muted-foreground">Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-base px-8"
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://wa.me/923450650242" target="_blank">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-primary/20 hover:bg-primary/5 text-base px-8"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp Order
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <div className="relative aspect-square max-w-lg mx-auto">
                <Image
                  src="/premium-assorted-dry-fruits-almonds-dates-walnuts-.jpg"
                  alt="A collection of premium assorted dry fruits including almonds, dates, and walnuts in a basket"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Price Badge */}
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-xl">
                  <div className="text-xs font-medium">Starting from</div>
                  <div className="text-2xl font-bold">Rs.499</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <div className="bg-card border border-border/40 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">🚚</div>
            <div className="text-xs font-medium">Free Delivery</div>
            <div className="text-xs text-muted-foreground">Orders over Rs.5000</div>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs font-medium">COD Available</div>
            <div className="text-xs text-muted-foreground">Pay on delivery</div>
          </div>
          <div className="bg-card border border-border/40 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-xs font-medium">Top Quality</div>
            <div className="text-xs text-muted-foreground">Premium graded</div>
          </div>
        </div>
      </div>
    </section>
  )
}
