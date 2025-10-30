import { Truck, Shield, Award, Headphones } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping across Pakistan on orders over Rs. 5000",
    },
    {
      icon: Shield,
      title: "5-Day Returns",
      description: "Easy return and exchange policy within 5 days",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Sourced directly from trusted local growers",
    },
    {
      icon: Headphones,
      title: "WhatsApp Support",
      description: "24/7 customer support via WhatsApp",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-secondary/20 to-background" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <h2 id="features-heading" className="sr-only">Our Features</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-4 sm:p-6 rounded-2xl hover:bg-card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 mb-3 sm:mb-4 transition-colors">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">
                {feature.description}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed sm:hidden">
                {feature.description.split(' ').slice(0, 6).join(' ')}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
