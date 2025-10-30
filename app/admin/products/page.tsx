"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Package } from "lucide-react"
import type { Product } from "@/lib/products"
import Image from "next/image"

export default function AdminProducts() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/admin/login")
        return
      }

      await fetchProducts()
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const fetchProducts = async () => {
    try {
      const productsSnap = await getDocs(collection(db, "products"))
      const prods = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]
      setProducts(prods)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await deleteDoc(doc(db, "products", id))
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product inventory ({products.length} products)
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {showForm && (
          <ProductForm
            product={editingProduct}
            onClose={() => {
              setShowForm(false)
              setEditingProduct(null)
            }}
            onSave={async () => {
              await fetchProducts()
              setShowForm(false)
              setEditingProduct(null)
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.weight}</p>
                <p className="text-xl font-bold text-primary mb-4">
                  Rs. {product.price.toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setEditingProduct(product)
                      setShowForm(true)
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && !showForm && (
          <Card className="p-12">
            <div className="text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first product
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminSidebar>
  )
}

function ProductForm({
  product,
  onClose,
  onSave,
}: {
  product: Product | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    price: product?.price || 0,
    weight: product?.weight || "",
    image: product?.image || "",
    description: product?.description || "",
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()

      await setDoc(doc(db, "products", formData.id || Date.now().toString()), {
        name: formData.name,
        slug,
        price: Number(formData.price),
        weight: formData.weight,
        image: formData.image,
        description: formData.description,
        rating: product?.rating || 0,
        reviewCount: product?.reviewCount || 0,
        reviews: product?.reviews || [],
      })

      onSave()
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full border rounded-md p-2"
                placeholder="unique-product-id"
                required
                disabled={!!product}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (Rs)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full border rounded-md p-2"
                placeholder="500g"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border rounded-md p-2"
                placeholder="/image.jpg"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-md p-2"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
