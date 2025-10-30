"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Chrome, Mail, Lock, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode?: "signin" | "signup"
  onSuccess?: () => void
}

export function AuthModal({ open, onOpenChange, mode = "signin", onSuccess }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [activeTab, setActiveTab] = useState(mode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  })

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(signInForm.email, signInForm.password)
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      console.error("Sign in error:", err)
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        setError("Invalid email or password")
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.")
      } else {
        setError("Failed to sign in. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (signUpForm.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      await signUp(signUpForm.email, signUpForm.password, signUpForm.name)
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      console.error("Sign up error:", err)
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Please sign in instead.")
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.")
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)

    try {
      await signInWithGoogle()
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      console.error("Google sign in error:", err)
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign in cancelled")
      } else {
        setError("Failed to sign in with Google. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to save your details and track your orders
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    required
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    minLength={6}
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    minLength={6}
                    value={signUpForm.confirmPassword}
                    onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
