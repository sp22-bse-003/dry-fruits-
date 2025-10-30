import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle } from "lucide-react"


export function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
          Need Bulk Orders or Custom Gift Packs?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed">
          Contact us on WhatsApp for special pricing on bulk orders and customized gift hampers for weddings, corporate
          events, and special occasions
        </p>
  <Link href="https://wa.me/923450650242" target="_blank">
          <Button size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </Link>
      </div>
    </section>
  )
}
