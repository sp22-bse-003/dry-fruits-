import { auth } from "@/lib/firebase"

export default function AuthDebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Firebase Auth Debug</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-bold mb-2">Firebase Configuration</h2>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
            {JSON.stringify({
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Set ✓" : "Missing ✗",
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "Missing",
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "Missing",
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "Missing",
              messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? "Set ✓" : "Missing ✗",
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "Set ✓" : "Missing ✗",
            }, null, 2)}
          </pre>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-bold mb-2">Auth Instance</h2>
          <p className="text-sm">Auth initialized: {auth ? "✓ Yes" : "✗ No"}</p>
          <p className="text-sm">Auth Domain: {auth?.config?.authDomain || "Not set"}</p>
        </div>

        <div className="p-4 border rounded bg-yellow-50">
          <h2 className="font-bold mb-2">⚠️ Google Sign-In Setup Required</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to Firebase Console → Authentication → Sign-in method</li>
            <li>Enable "Google" provider</li>
            <li>Add your domain (localhost:3001 or localhost:3000) to authorized domains</li>
            <li>Save and try again</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
