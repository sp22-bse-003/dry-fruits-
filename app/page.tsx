import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/structured-data"
import dynamic from "next/dynamic"

const FeaturesSection = dynamic(() => import("@/components/features-section").then(mod => ({ default: mod.FeaturesSection })))
const CategoriesSection = dynamic(() => import("@/components/categories-section").then(mod => ({ default: mod.CategoriesSection })))
const ProductsSection = dynamic(() => import("@/components/products-section").then(mod => ({ default: mod.ProductsSection })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })))
const CTASection = dynamic(() => import("@/components/cta-section").then(mod => ({ default: mod.CTASection })))
const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })))

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <OrganizationSchema />
      <WebSiteSchema />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <ProductsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
