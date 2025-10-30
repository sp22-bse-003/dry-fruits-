"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth-form"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/profile")
  }

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <AuthForm mode={mode} onToggleMode={toggleMode} onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
