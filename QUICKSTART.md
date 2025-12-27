# 🎯 QUICK START - WHOM.CLOTHING API Integration

## ✅ What's Done

**Full Shopify + Tapstitch Integration is LIVE!**

### 📦 Files Created
```
src/
├── services/
│   ├── shopify.js      ← Shopify Storefront API
│   └── tapstitch.js    ← Tapstitch Print-on-Demand API
├── composables/
│   └── useCart.js      ← Global Cart State
├── config/
│   └── api.js          ← API Configuration
```

### 🔧 Components Updated
- **Navigation.vue** - Live cart count + dropdown
- **ProductGrid.vue** - Fetches real Shopify products
- **ProductCard.vue** - Add to cart + product images

---

## 🚀 TO GET IT WORKING:

### 1️⃣ Create `.env.local` file (in project root):

```bash
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
VITE_TAPSTITCH_API_KEY=your_key_here
VITE_TAPSTITCH_STORE_ID=your_store_id_here
```

### 2️⃣ Get Shopify Credentials:
1. Shopify Admin → Apps → Develop apps
2. Create app → Configure Storefront API
3. Enable: product listings, checkouts
4. Copy **Storefront Access Token**

### 3️⃣ Get Tapstitch Credentials:
1. Tapstitch Dashboard → Settings → API
2. Generate API Key
3. Copy Store ID

### 4️⃣ Test:
```bash
npm run dev
```

Visit http://localhost:3000

---

## ✨ Features Working:

✅ **Products** - Load from Shopify  
✅ **Cart** - Add/update/remove items  
✅ **Checkout** - Direct to Shopify  
✅ **Images** - Product photos display  
✅ **Inventory** - Real availability status  
✅ **Collections** - FAITH, PURPOSE, IDENTITY tags  

---

## 📚 Full Documentation:
See **INTEGRATION_GUIDE.md** for complete details!

---

**Git Commit:** `8baae82`  
**Status:** ✅ SUCCESS  
**Pushed to:** https://github.com/ezequielcasillas1/whom.cl

