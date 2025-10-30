import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Khan",
      location: "Karachi",
      rating: 5,
      text: "Best quality dry fruits I have ever purchased! Fresh, authentic, and delivered on time. Highly recommended!",
    },
    {
      name: "Fatima Ali",
      location: "Lahore",
      rating: 5,
      text: "Ordered for Eid gift packs. Everyone loved the quality and presentation. Will definitely order again.",
    },
    {
      name: "Hassan Raza",
      location: "Islamabad",
      rating: 5,
      text: "Great prices for bulk orders. Perfect for my restaurant. Customer service is excellent too!",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Trusted by thousands of customers across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
