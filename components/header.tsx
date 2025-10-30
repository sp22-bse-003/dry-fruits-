"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { UserMenu } from "./user-menu"
import { SearchDialog } from "./search-dialog"
import { Logo } from "./logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  // Avoid hydration mismatch by only reading persisted state after mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const totalItems = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/10 bg-white/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/85 shadow-lg">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      
      {/* Top Bar - Promotional */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary text-white py-1.5 text-center">
        <p className="text-xs sm:text-sm font-medium">
          🎉 Free Delivery on Orders Over Rs.5,000 | Cash on Delivery Available 🚚
        </p>
      </div>
      
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transition-transform">
            <Logo iconSize={24} textSize="text-xl sm:text-2xl" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
              Home
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
              Products
            </Link>
            <Link href="/bulk-orders" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
              Bulk Orders
            </Link>
            <Link href="/gift-packs" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
              Gift Packs
            </Link>
            <Link href="/about" className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex hover:bg-primary/10 hover:text-primary rounded-full h-10 w-10"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="https://wa.me/923450650242" target="_blank">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex hover:bg-green-100 hover:text-green-600 rounded-full h-10 w-10"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-primary/10 hover:text-primary rounded-full h-10 w-10"
              >
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <UserMenu />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10 rounded-full h-10 w-10"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-border/40">
            <button
              onClick={() => {
                setSearchOpen(true)
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors w-full"
            >
              <Search className="h-4 w-4" />
              Search Products
            </button>
            <Link href="/" className="block text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="block text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/bulk-orders" className="block text-sm font-medium hover:text-primary transition-colors">
              Bulk Orders
            </Link>
            <Link href="/gift-packs" className="block text-sm font-medium hover:text-primary transition-colors">
              Gift Packs
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
