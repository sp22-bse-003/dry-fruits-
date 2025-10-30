"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, User, Mail, Phone, ArrowLeft, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, userProfile, loading, updateUserProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || "",
        phone: userProfile.phone || "",
      })
    }
  }, [userProfile])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        phone: formData.phone,
      })
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
      setEditing(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || !userProfile) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold">My Profile</h1>
        <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                disabled={!editing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input id="email" value={user.email || ""} disabled />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 300 1234567"
                disabled={!editing}
              />
            </div>

            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Member since</span>
              <span>{new Date(userProfile.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Wishlist items</span>
              <span>{userProfile.wishlist?.length || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Saved addresses</span>
              <span>{userProfile.addresses?.length || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
