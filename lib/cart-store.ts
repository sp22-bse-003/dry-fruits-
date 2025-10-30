"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase"

export interface CartItem {
  id: string
  name: string
  price: number
  weight: string
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  userId: string | null
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  setUserId: (userId: string | null) => void
  syncToFirestore: () => Promise<void>
  loadFromFirestore: (userId: string) => Promise<void>
  mergeAndSync: (userId: string) => Promise<void>
}

// Helper function to sync cart to Firestore
async function syncCartToFirestore(userId: string, items: CartItem[]) {
  if (!userId) return
  
  try {
    const cartRef = doc(db, "carts", userId)
    if (items.length === 0) {
      await deleteDoc(cartRef)
    } else {
      await setDoc(cartRef, {
        items,
        updatedAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Error syncing cart to Firestore:", error)
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      userId: null,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          let newItems
          if (existingItem) {
            newItems = state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
          } else {
            newItems = [...state.items, { ...item, quantity: 1 }]
          }
          
          // Sync to Firestore if user is logged in
          const userId = get().userId
          if (userId) {
            syncCartToFirestore(userId, newItems)
          }
          
          return { items: newItems }
        })
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id)
          
          // Sync to Firestore if user is logged in
          const userId = get().userId
          if (userId) {
            syncCartToFirestore(userId, newItems)
          }
          
          return { items: newItems }
        })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => {
          const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
          
          // Sync to Firestore if user is logged in
          const userId = get().userId
          if (userId) {
            syncCartToFirestore(userId, newItems)
          }
          
          return { items: newItems }
        })
      },
      clearCart: () => {
        const userId = get().userId
        set({ items: [] })
        
        // Clear from Firestore if user is logged in
        if (userId) {
          syncCartToFirestore(userId, [])
        }
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      setUserId: (userId) => {
        set({ userId })
      },
      syncToFirestore: async () => {
        const { userId, items } = get()
        if (userId) {
          await syncCartToFirestore(userId, items)
        }
      },
      loadFromFirestore: async (userId: string) => {
        try {
          const cartRef = doc(db, "carts", userId)
          const cartSnap = await getDoc(cartRef)
          
          if (cartSnap.exists()) {
            const data = cartSnap.data()
            set({ items: data.items || [], userId })
          } else {
            set({ userId })
          }
        } catch (error) {
          console.error("Error loading cart from Firestore:", error)
          set({ userId })
        }
      },
      mergeAndSync: async (userId: string) => {
        try {
          const localItems = get().items
          const cartRef = doc(db, "carts", userId)
          const cartSnap = await getDoc(cartRef)
          
          let mergedItems = [...localItems]
          
          if (cartSnap.exists()) {
            const firestoreItems = cartSnap.data().items || []
            
            // Merge: combine quantities for same items
            firestoreItems.forEach((firestoreItem: CartItem) => {
              const existingIndex = mergedItems.findIndex(item => item.id === firestoreItem.id)
              if (existingIndex >= 0) {
                // Item exists in both - add quantities
                mergedItems[existingIndex].quantity += firestoreItem.quantity
              } else {
                // Item only in Firestore - add it
                mergedItems.push(firestoreItem)
              }
            })
          }
          
          // Update state and sync to Firestore
          set({ items: mergedItems, userId })
          await syncCartToFirestore(userId, mergedItems)
        } catch (error) {
          console.error("Error merging cart:", error)
          set({ userId })
        }
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
