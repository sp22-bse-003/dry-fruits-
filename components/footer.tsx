import Link from "next/link"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo iconSize={20} textSize="text-lg" className="[&_span]:text-white [&_.text-accent\\/80]:text-white/80" />
            </div>
            <p className="text-sm text-white/90">
              Pakistan's trusted online dry fruits marketplace. Premium quality almonds, dates, cashews, and more - sourced directly from Gilgit-Baltistan and Balochistan growers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-accent transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/gift-packs" className="hover:text-accent transition-colors">
                  Gift Packs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policies/shipping" className="hover:text-accent transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-accent transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <Link href="tel:+923450650242" className="hover:underline">0345 0650242</Link>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@dryfruits.pk</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Link href="https://facebook.com" target="_blank" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>© {new Date().getFullYear()} DryFruits.pk - All rights reserved. Pakistan's Trusted Dry Fruits Marketplace.</p>
          <p className="mt-2">🚚 Free delivery across Pakistan on orders over Rs. 5000 | 💰 Cash on Delivery Available</p>
        </div>
      </div>
    </footer>
  )
}
