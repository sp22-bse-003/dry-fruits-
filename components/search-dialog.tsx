"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onOpenChange(false)
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
      setQuery("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for almonds, dates, cashews..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {["Almonds", "Dates", "Cashews", "Walnuts", "Pistachios"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term)
                    onOpenChange(false)
                    router.push(`/products?search=${encodeURIComponent(term)}`)
                    setQuery("")
                  }}
                  className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
