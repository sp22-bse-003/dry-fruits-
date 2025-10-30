"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  image: string
  weight: string
}

export default function WishlistPage() {
  const { user, userProfile, loading: authLoading, removeFromWishlist } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (userProfile?.wishlist) {
      fetchWishlistProducts()
    } else {
      setLoading(false)
    }
  }, [userProfile?.wishlist])

  const fetchWishlistProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        const wishlistProducts = data.products.filter((p: Product) =>
          userProfile?.wishlist?.includes(p.id)
        )
        setProducts(wishlistProducts)
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId)
      setProducts(products.filter((p) => p.id !== productId))
      toast({
        title: "Removed from wishlist",
        description: "Product removed from your wishlist",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from wishlist",
        variant: "destructive",
      })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold mb-8">My Wishlist</h1>

      {products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">Add products to save them for later</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.weight}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">Rs. {product.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/products/${product.id}`}>View</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
