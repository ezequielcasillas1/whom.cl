# 🔌 WHOM.CLOTHING - Shopify & Tapstitch Integration Guide

## ✅ What Was Implemented

### API Services Created
1. **Shopify Storefront API** (`src/services/shopify.js`)
   - Product fetching (all products & by collection)
   - Cart management (create, add, update, remove)
   - Checkout integration
   - GraphQL queries

2. **Tapstitch API** (`src/services/tapstitch.js`)
   - Product catalog sync
   - Order fulfillment
   - Design upload
   - Shipping estimates
   - Webhook handlers

3. **Cart Composable** (`src/composables/useCart.js`)
   - Global cart state management
   - Real-time cart updates
   - Cart persistence

### Components Updated
- **Navigation.vue** - Live cart count + mini cart dropdown
- **ProductGrid.vue** - Fetches products from Shopify API
- **ProductCard.vue** - Product images, add to cart, availability

---

## 🚀 Setup Instructions

### Step 1: Create Shopify Storefront Access Token

1. Go to your Shopify Admin
2. Navigate to **Apps** > **Develop apps**
3. Click **Create an app**
4. Name it "WHOM Storefront"
5. Go to **Configuration** tab
6. Under **Storefront API**, click **Configure**
7. Enable these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
8. Click **Save**, then **Install app**
9. Copy the **Storefront API access token**

### Step 2: Get Tapstitch API Credentials

1. Log into Tapstitch dashboard
2. Go to **Settings** > **API**
3. Generate API Key
4. Copy your **Store ID**

### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Shopify Configuration
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx

# Tapstitch Configuration
VITE_TAPSTITCH_API_KEY=ts_xxxxxxxxxxxxxxxxxxxxxxxx
VITE_TAPSTITCH_STORE_ID=your_store_id_here
```

**Replace:**
- `your-store.myshopify.com` with your actual Shopify domain
- `shpat_xxx` with your Storefront API token
- `ts_xxx` with your Tapstitch API key
- `your_store_id_here` with your Tapstitch store ID

### Step 4: Test the Integration

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Products should load from Shopify
# Add items to cart
# Click "Bag" to see cart dropdown
```

---

## 📦 How It Works

### Product Flow
1. **Shopify** stores your products + inventory
2. **Tapstitch** handles print-on-demand fulfillment
3. **Website** fetches products from Shopify API
4. Customer adds to cart → checkout via Shopify
5. Order → Tapstitch for printing & shipping

### Connecting Shopify + Tapstitch

#### Option A: Use Tapstitch Shopify App (Easiest)
1. Install Tapstitch app from Shopify App Store
2. Connect your Tapstitch account
3. Products auto-sync

#### Option B: Manual Integration
1. Create products in Shopify
2. Add Tapstitch product IDs to Shopify product metafields
3. Use webhook to send orders to Tapstitch

---

## 🛠️ Key Features Implemented

### ✅ Product Management
- Fetch products from Shopify
- Filter by collection (FAITH, PURPOSE, IDENTITY)
- Display product images, prices, variants
- Fallback to sample data if API fails

### ✅ Shopping Cart
- Add to cart functionality
- Update quantities
- Remove items
- Persistent cart (stored in browser)
- Live cart count in navigation
- Mini cart dropdown

### ✅ Checkout
- Direct checkout via Shopify
- Opens Shopify hosted checkout
- Secure payment processing

---

## 📝 Usage Examples

### Fetch Products by Collection

```javascript
import { fetchProducts } from '@/services/shopify'

// Get all FAITH collection products
const faithProducts = await fetchProducts('FAITH', 10)
```

### Add to Cart

```javascript
import { useCart } from '@/composables/useCart'

const { addToCart } = useCart()

// Add product variant to cart
await addToCart('gid://shopify/ProductVariant/12345', 1)
```

### Get Cart Total

```javascript
import { useCart } from '@/composables/useCart'

const { cartTotal, cartCount } = useCart()

console.log(`Cart has ${cartCount.value} items`)
console.log(`Total: $${cartTotal.value}`)
```

---

## 🔗 Tapstitch Integration Examples

### Create Fulfillment Order

```javascript
import { createTapstitchOrder } from '@/services/tapstitch'

const order = await createTapstitchOrder({
  shopify_order_id: '12345',
  line_items: [
    {
      product_id: 'ts_product_123',
      quantity: 1,
      size: 'L',
      design_url: 'https://...'
    }
  ],
  shipping: {
    name: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US'
  }
})
```

### Upload Custom Design

```javascript
import { uploadDesign } from '@/services/tapstitch'

const design = await uploadDesign(
  imageFile,
  {
    name: 'Faith Cross Design',
    collection: 'FAITH'
  }
)
```

---

## 🎯 Next Steps

### Recommended Enhancements

1. **Product Detail Pages**
   - Create individual product pages
   - Show all variants (sizes, colors)
   - Multiple product images

2. **Collection Pages**
   - Dedicated pages for FAITH, PURPOSE, IDENTITY
   - Filter & sort functionality

3. **Backend Integration**
   - Webhook endpoint for Shopify orders
   - Automatic Tapstitch order creation
   - Order tracking system

4. **Customer Features**
   - Account creation/login
   - Order history
   - Wishlist

5. **Custom Design Tool**
   - Let customers upload designs
   - Preview on products
   - Integration with Tapstitch print locations

---

## 🐛 Troubleshooting

### Products Not Loading
- Check `.env.local` has correct credentials
- Verify Shopify Storefront API is enabled
- Check browser console for errors

### Cart Not Working
- Clear browser localStorage
- Check Shopify API permissions
- Verify cart mutations are working

### CORS Errors
- Shopify Storefront API supports CORS
- Tapstitch may need backend proxy

---

## 📚 API Documentation

- **Shopify Storefront API**: https://shopify.dev/docs/api/storefront
- **Tapstitch API**: Contact Tapstitch support for docs
- **Vue.js Composables**: https://vuejs.org/guide/reusability/composables

---

## 🔒 Security Notes

- Never expose Admin API tokens in frontend
- Use Storefront API (public) for frontend
- Store sensitive keys in `.env.local` (never commit)
- Tapstitch orders should be created server-side

---

**Ready to launch! 🚀**

For questions, refer to the API service files or Shopify/Tapstitch documentation.

