"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { formatNumber } from "@/lib/utils"
import { OptimizedImage } from "@/components/optimized-image"

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  image: string
  weight: string
  inStock?: boolean
  stockQuantity?: number
}

export function ProductCard({ id, name, slug, price, image, weight, inStock = true, stockQuantity }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  // Debug log
  if (!slug) {
    console.warn(`Product ${name} is missing slug!`, { id, name, slug })
  }

  const handleAddToCart = () => {
    if (!inStock) {
      toast({
        title: "Out of Stock",
        description: `${name} is currently out of stock.`,
        variant: "destructive",
      })
      return
    }

    addItem({ id, name, price, image, weight })
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-card p-0">
      <div className="relative">
        <Link href={`/products/${slug}`}>
          <div className="relative h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-accent/5 to-primary/5">
            <OptimizedImage
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            />
            {/* Stock Badge */}
            {!inStock ? (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                OUT OF STOCK
              </div>
            ) : stockQuantity !== undefined && stockQuantity <= 10 && stockQuantity > 0 ? (
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                ONLY {stockQuantity} LEFT
              </div>
            ) : (
              <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                IN STOCK
              </div>
            )}
          </div>
        </Link>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-base mb-1 hover:text-primary transition-colors line-clamp-2">{name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-3">{weight}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">Rs. {formatNumber(price)}</p>
            <p className="text-xs text-muted-foreground line-through">Rs. {formatNumber(Math.round(price * 1.2))}</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-amber-500">★★★★★</span>
            <span className="text-muted-foreground">(4.8)</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          variant={inStock ? "outline" : "secondary"}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
