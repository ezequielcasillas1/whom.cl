# 🚀 How to Deploy Delete Function to Netlify

## Step 1: Deploy via Git (Auto-Deploy)

If your Netlify site is connected to Git (GitHub/GitLab/Bitbucket):

1. **Commit and push your changes:**
   ```bash
   git add netlify/functions/delete-product.js
   git commit -m "Add product delete function"
   git push
   ```

2. **Netlify will auto-deploy:**
   - Go to https://app.netlify.com
   - Select your site (whom.clothing)
   - Watch the deploy log in **Deploys** tab
   - Wait for "Site is live" ✅

---

## Step 2: Verify Function in Netlify Dashboard

### Navigate to Functions:

1. **Go to Netlify Dashboard:**
   - Visit: https://app.netlify.com
   - Click on your site: **whom.clothing**

2. **Open Functions Tab:**
   - Click **Functions** in the left sidebar
   - You should see: `delete-product` listed

3. **Test the Function:**
   - Click on `delete-product`
   - You'll see function details and logs
   - The endpoint URL will be: `https://whom.clothing/api/delete-product`

---

## Step 3: Test the Delete Endpoint

### Option A: Use Netlify Function Logs
1. In Functions tab → Click `delete-product`
2. Scroll to **Function logs**
3. Make a test DELETE request (see below)

### Option B: Use Browser/Postman
The function endpoint is:
```
DELETE https://whom.clothing/api/delete-product?id=415695270
```

**Test with PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://whom.clothing/api/delete-product?id=415695270" -Method Delete
```

---

## Step 4: Verify Environment Variables

Make sure these are set in Netlify:

1. **Go to Site Settings:**
   - Site dashboard → **Site settings** (gear icon)
   - Click **Environment variables** in left sidebar

2. **Required Variables:**
   - `PRINTFUL_API_TOKEN` ✅ (should already exist)
   - `PRINTFUL_STORE_ID` (if needed)
   - `PRINTFUL_CURRENCY` ✅ (should already exist)

---

## Step 5: Manual Deploy (If No Git Connection)

If you need to deploy manually:

1. **Install Netlify CLI:**
   ```powershell
   npm install -g netlify-cli
   ```

2. **Login:**
   ```powershell
   netlify login
   ```

3. **Deploy:**
   ```powershell
   netlify deploy --prod
   ```

---

## ✅ Success Checklist

- [ ] Function appears in **Functions** tab
- [ ] Function logs show no errors
- [ ] DELETE request returns success response
- [ ] Product is removed from Printful store

---

## 🐛 Troubleshooting

**Function not showing?**
- Check `netlify.toml` has `functions = "netlify/functions"`
- Verify file is in correct location: `netlify/functions/delete-product.js`

**401/403 Error?**
- Check `PRINTFUL_API_TOKEN` is set correctly
- Verify token has delete permissions

**404 Error?**
- Wait a few minutes after deploy (propagation delay)
- Check function name matches: `delete-product.js` → `/api/delete-product`
