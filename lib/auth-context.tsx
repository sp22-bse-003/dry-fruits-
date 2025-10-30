"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebase"
import { useCartStore } from "./cart-store"

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  phone: string | null
  addresses: Address[]
  wishlist: string[] // product IDs
  createdAt: any
  updatedAt: any
}

export interface Address {
  id: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
  addAddress: (address: Omit<Address, "id">) => Promise<void>
  updateAddress: (addressId: string, address: Partial<Address>) => Promise<void>
  deleteAddress: (addressId: string) => Promise<void>
  addToWishlist: (productId: string) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [previousUserId, setPreviousUserId] = useState<string | null>(null)

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid))
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        await fetchUserProfile(user.uid)
        
        // Check if switching users
        const currentUserId = useCartStore.getState().userId
        if (currentUserId && currentUserId !== user.uid) {
          // User switching - save current cart to old user, then load new user's cart
          await useCartStore.getState().syncToFirestore()
          await useCartStore.getState().loadFromFirestore(user.uid)
        } else if (!currentUserId) {
          // Fresh login - merge local cart with Firestore cart
          await useCartStore.getState().mergeAndSync(user.uid)
        } else {
          // Same user - just set userId
          useCartStore.getState().setUserId(user.uid)
        }
        
        setPreviousUserId(user.uid)
      } else {
        setUserProfile(null)
        // Clear userId from cart store on logout (keep cart items in localStorage)
        useCartStore.getState().setUserId(null)
        setPreviousUserId(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update display name
    await updateProfile(user, { displayName })

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      photoURL: null,
      phone: null,
      addresses: [],
      wishlist: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    setUserProfile(userProfile)
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user profile exists
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      // Create new user profile
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phone: user.phoneNumber,
        addresses: [],
        wishlist: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
      await setDoc(doc(db, "users", user.uid), userProfile)
      setUserProfile(userProfile)
    }
  }

  // Logout
  const logout = async () => {
    // Clear cart from Firestore before logging out
    const userId = useCartStore.getState().userId
    if (userId) {
      await useCartStore.getState().syncToFirestore()
    }
    await signOut(auth)
  }

  // Reset password
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error("No user logged in")

    const updatedProfile = {
      ...data,
      updatedAt: serverTimestamp(),
    }

    await setDoc(doc(db, "users", user.uid), updatedProfile, { merge: true })
    setUserProfile((prev) => (prev ? { ...prev, ...data } : null))
  }

  // Add address
  const addAddress = async (address: Omit<Address, "id">) => {
    if (!user) throw new Error("No user logged in")

    const addressId = `addr_${Date.now()}`
    const newAddress = { ...address, id: addressId }

    const addresses = [...(userProfile?.addresses || []), newAddress]
    await updateUserProfile({ addresses })
  }

  // Update address
  const updateAddress = async (addressId: string, address: Partial<Address>) => {
    if (!user) throw new Error("No user logged in")

    const addresses = (userProfile?.addresses || []).map((addr) =>
      addr.id === addressId ? { ...addr, ...address } : addr
    )
    await updateUserProfile({ addresses })
  }

  // Delete address
  const deleteAddress = async (addressId: string) => {
    if (!user) throw new Error("No user logged in")

    const addresses = (userProfile?.addresses || []).filter((addr) => addr.id !== addressId)
    await updateUserProfile({ addresses })
  }

  // Add to wishlist
  const addToWishlist = async (productId: string) => {
    if (!user) throw new Error("No user logged in")

    const wishlist = [...(userProfile?.wishlist || []), productId]
    await updateUserProfile({ wishlist })
  }

  // Remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!user) throw new Error("No user logged in")

    const wishlist = (userProfile?.wishlist || []).filter((id) => id !== productId)
    await updateUserProfile({ wishlist })
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    addToWishlist,
    removeFromWishlist,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
