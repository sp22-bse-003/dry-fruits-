"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/firebase"
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider 
} from "firebase/auth"

export default function AuthTestPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState("")

  const testEmailSignIn = async () => {
    try {
      setResult("Attempting email sign-in...")
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setResult(`Success! User: ${userCredential.user.email}`)
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      console.error(error)
    }
  }

  const testEmailSignUp = async () => {
    try {
      setResult("Attempting email sign-up...")
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setResult(`Success! Created user: ${userCredential.user.email}`)
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      console.error(error)
    }
  }

  const testGoogleSignIn = async () => {
    try {
      setResult("Attempting Google sign-in...")
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      setResult(`Success! User: ${result.user.email}`)
    } catch (error: any) {
      setResult(`Error: ${error.code} - ${error.message}`)
      console.error("Google sign-in error:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Auth Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={testEmailSignIn} variant="outline">
              Test Sign In
            </Button>
            <Button onClick={testEmailSignUp} variant="outline">
              Test Sign Up
            </Button>
            <Button onClick={testGoogleSignIn}>
              Test Google
            </Button>
          </div>

          {result && (
            <div className="p-4 bg-muted rounded text-sm">
              <strong>Result:</strong>
              <pre className="mt-2 whitespace-pre-wrap">{result}</pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded text-sm">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>First, try signing up with email/password</li>
              <li>Then try signing in with that account</li>
              <li>For Google: Make sure it's enabled in Firebase Console</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
