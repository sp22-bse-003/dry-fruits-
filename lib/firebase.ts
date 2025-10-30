import { getApps, initializeApp, type FirebaseOptions } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// Firebase config is safe to expose; writes are protected by Firestore Rules and API routes.
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Log Firebase config (only in development)
if (process.env.NODE_ENV === "development") {
  console.log("Firebase Config:", {
    apiKey: firebaseConfig.apiKey ? "✓" : "✗",
    authDomain: firebaseConfig.authDomain || "missing",
    projectId: firebaseConfig.projectId || "missing",
    storageBucket: firebaseConfig.storageBucket || "missing",
  })
}

const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

export default app
