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
}

export function AddToCartButton({ id, name, price, image, weight }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({ id, name, price, image, weight })
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <Button className="w-full sm:w-auto" size="lg" onClick={handleAddToCart}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  )
}
