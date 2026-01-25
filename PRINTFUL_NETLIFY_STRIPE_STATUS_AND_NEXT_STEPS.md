# Printful + Netlify + Stripe (Status + Next Steps)

## Current setup (already in repo)

- **Netlify config**
  - `netlify.toml`
  - Redirect: `/api/*` → `/.netlify/functions/:splat`
  - Functions dir: `netlify/functions`

- **Netlify Functions**
  - `netlify/functions/catalog.js` — public catalog endpoint (Printful store products)
  - `netlify/functions/create-checkout-session.js` — creates Stripe Checkout session after Printful shipping quote
  - `netlify/functions/stripe-webhook.js` — verifies Stripe signature and creates Printful order on `checkout.session.completed`
  - Helpers: `netlify/functions/_printful.js`, `netlify/functions/_http.js`

- **Frontend**
  - Catalog fetch: `src/services/catalog.js` → `GET /api/catalog`
  - Cart is local: `src/config/api.js` uses `CART_STORAGE_KEY = "whom_cart"`
  - Cart logic: `src/composables/useCart.js` (local cart + calls `/api/create-checkout-session`)
  - UI wired:
    - `src/components/ProductGrid.vue` loads from catalog endpoint
    - `src/components/ProductCard.vue` adds Printful `sync_variant_id` items to cart
    - `src/components/Navigation.vue` mini-cart checkout calls `startCheckout()` and collects `country/state/zip`

- **Local dev proxy**
  - `vite.config.js` proxies `/api/*` to Netlify dev: `http://localhost:8888/.netlify/functions/*`

## Required environment variables (Netlify)

Set these in Netlify site settings (do not expose in Vite client env):
- `PRINTFUL_API_TOKEN`
- `PRINTFUL_STORE_ID` (optional; needed for account-level tokens)
- `PRINTFUL_CURRENCY` (ex: `USD`)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SITE_URL` (ex: `https://whom.clothing`)

See `env.example.txt`.

## Next steps (to finish MVP end-to-end)

- **Netlify site**
  - Add env vars above
  - Deploy and confirm functions are reachable:
    - `GET /.netlify/functions/catalog`
    - `POST /.netlify/functions/create-checkout-session`
    - `POST /.netlify/functions/stripe-webhook`

- **Stripe**
  - Create a webhook endpoint pointing to `/.netlify/functions/stripe-webhook`
  - Enable event: `checkout.session.completed`
  - Copy webhook secret into `STRIPE_WEBHOOK_SECRET`

- **Printful**
  - Confirm your Printful store has products/variants (the catalog function reads **store products**)
  - Confirm the token has access to store products, shipping rates, and order creation
  - Optional (File library upload via API):
    - Set `PRINTFUL_API_TOKEN` in your shell (or Windows env)
    - Run: `powershell -ExecutionPolicy Bypass -File .\scripts\printful-upload.ps1`
    - Result shows `file_id` values for each uploaded PNG

- **Frontend UX completion**
  - Add a simple “Checkout success” flow (clear cart + show confirmation using `session_id`)
  - Optional: validate shipping input (country/state/zip) before calling checkout

- **Order tracking (needed soon)**
  - Add minimal persistence for `Stripe session id -> Printful order id` (Netlify Blobs/KV or external DB)
  - Optional: add Printful webhook for fulfillment status updates

## Known gaps (intentional for MVP)

- **Shopify code still exists** (not used in the new flow): `src/services/shopify.js` + `@shopify/storefront-api-client`
- **Shipping selection**: we currently pick a rate automatically (no UI selection yet)
- **Address precision**: shipping quote is based on the minimal recipient fields provided (improve for higher accuracy)

