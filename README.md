# Dryfruits Ecommerce – Firebase Client SDK# Dryfruits Ecommerce – Firebase Integration



This project uses Next.js (App Router) with Firestore (client SDK) as the source of truth for products. Products include reviews and ratings.This project uses Next.js (App Router) with Firestore as a source of truth for products. It falls back to local seed data until Firestore is configured.



## Features## Configure environment

- 🔥 Firebase client SDK (no Admin SDK)

- ⭐ Products with reviews and ratings1. Copy `.env.local.example` to `.env.local` and fill values:

- 🛒 Shopping cart with checkout   - NEXT_PUBLIC_SITE_URL (e.g., http://localhost:3000)

- 📦 Order management   - Firebase Client SDK keys (public)

- 🔐 Token-protected admin panel   - FIREBASE_SERVICE_ACCOUNT (paste full service account JSON on one line)

   - ADMIN_TOKEN (random long string)

## Configure environment

2. In Firebase Console:

1. Copy `.env.local.example` to `.env.local` and fill values:   - Create a project and Firestore database (Start in production or test rules).

   ```bash   - Create a Web App to get public config keys.

   cp .env.local.example .env.local   - Create a Service Account (Project settings → Service accounts) and generate JSON.

   ```

3. Firestore Rules (basic):

2. Add your Firebase Web App config (from Firebase Console → Project settings → Web app):

   - NEXT_PUBLIC_FIREBASE_API_KEY```

   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAINrules_version = '2';

   - NEXT_PUBLIC_FIREBASE_PROJECT_IDservice cloud.firestore {

   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET  match /databases/{database}/documents {

   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID    match /products/{id} {

   - NEXT_PUBLIC_FIREBASE_APP_ID      allow read: if true;    // public read

   - NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID (optional)      allow write: if false;  // writes only via API routes

    }

3. Set ADMIN_TOKEN to a strong random string:  }

   ```bash}

   openssl rand -hex 32```

   ```

## API routes

4. In Firebase Console, create Firestore database and deploy rules:

   ```bash- GET /api/products → list products

   # Install Firebase CLI if needed- POST /api/products → upsert product (Authorization: Bearer ADMIN_TOKEN)

   npm install -g firebase-tools- GET /api/products/[id] → get one product

   - PUT /api/products/[id] → update price or full upsert (Authorization: Bearer ADMIN_TOKEN)

   # Login

   firebase login## Run locally

   

   # Deploy rules1. Install deps:

   firebase deploy --only firestore:rules

   ``````sh

pnpm install

## Install dependencies```



```bash2. Start dev server:

pnpm install

``````sh

pnpm dev

## Seed products to Firestore```



Products include reviews and ratings. You can seed via script or admin UI.Open http://localhost:3000



### Option 1: Seed script (recommended for first time)## Seeding products (optional)

```bash

pnpm seedUntil you add documents in Firestore (collection: `products`), the UI falls back to the local seed defined in `lib/products.ts`.

```

To add a product using API (replace token):

### Option 2: Admin UI

1. Start dev server: `pnpm dev````sh

2. Visit http://localhost:3000/admin/productscurl -X POST http://localhost:3000/api/products \

3. Login with your ADMIN_TOKEN  -H "Content-Type: application/json" \

4. Click "Seed All Products"  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \

  -d '{

### Option 3: API endpoint    "id": "1",

```bash    "name": "Premium Almonds",

curl -X POST http://localhost:3000/api/products/seed \    "price": 1200,

  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"    "weight": "500g",

```    "image": "/premium-california-almonds-close-up.jpg",

    "description": "..."

## Run locally  }'

```

```bash

pnpm dev## Notes

```

- Pages fetch via the API and revalidate every 60s.

Open http://localhost:3000- If Firestore is unreachable/misconfigured, pages still render using seed data.

- Admin writes are server-side only using Firebase Admin SDK.
## Firestore Rules

The `firestore.rules` file sets:
- Products: public read, no direct client writes (only via API with ADMIN_TOKEN)
- Orders: no direct client access (only via API)

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

## API routes

- GET /api/products → list products (public)
- POST /api/products → upsert product (requires Authorization: Bearer ADMIN_TOKEN)
- GET /api/products/[id] → get one product (public)
- PUT /api/products/[id] → update product (requires ADMIN_TOKEN)
- POST /api/products/seed → seed all products (requires ADMIN_TOKEN)
- POST /api/orders → create order (public)
- GET /api/orders → list orders (public, but should be protected in production)
- GET /api/orders/[id] → get one order (public)

## Admin Panel

Visit `/admin/products` to:
- Login with ADMIN_TOKEN
- View all products with ratings
- Add/update products
- Update prices
- Seed products with reviews & ratings

## Production deployment

1. Set environment variables in your hosting platform (Vercel, etc.)
2. Deploy Firestore rules: `firebase deploy --only firestore:rules`
3. Optional: Add Firebase Authentication for better security

## Notes

- Pages use ISR with 60s revalidation
- Products include rating, reviewCount, and reviews array
- If Firestore is unreachable, pages fall back to local seed data
- No Firebase Admin SDK - all operations use client SDK via API routes
