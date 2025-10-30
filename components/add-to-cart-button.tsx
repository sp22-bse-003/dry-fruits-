"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"

type Props = {
  id: string
  name: string
  price: number
  image: string
  weight: string
  inStock?: boolean
  stockQuantity?: number
}

export function AddToCartButton({ id, name, price, image, weight, inStock = true, stockQuantity }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

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

  if (!inStock) {
    return (
      <div className="space-y-2">
        <Button className="w-full sm:w-auto" size="lg" disabled>
          Out of Stock
        </Button>
        <p className="text-sm text-red-600 font-medium">This product is currently unavailable</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button className="w-full sm:w-auto" size="lg" onClick={handleAddToCart}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to Cart
      </Button>
      {stockQuantity !== undefined && stockQuantity > 0 && stockQuantity <= 10 && (
        <p className="text-sm text-orange-600 font-medium">Only {stockQuantity} left in stock!</p>
      )}
      {stockQuantity !== undefined && stockQuantity > 10 && (
        <p className="text-sm text-green-600">In Stock</p>
      )}
    </div>
  )
}
