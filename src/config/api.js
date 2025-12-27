// API Configuration for WHOM.CLOTHING
// Replace these with your actual credentials

export const shopifyConfig = {
  // Your Shopify store domain (e.g., 'whom-clothing.myshopify.com')
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
  
  // Storefront API Access Token (Create in Shopify Admin > Apps > Develop apps)
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'YOUR_STOREFRONT_ACCESS_TOKEN',
  
  // API Version
  apiVersion: '2024-01'
}

export const tapstitchConfig = {
  // Tapstitch API Key (Get from Tapstitch dashboard)
  apiKey: import.meta.env.VITE_TAPSTITCH_API_KEY || 'YOUR_TAPSTITCH_API_KEY',
  
  // Tapstitch API Base URL
  baseUrl: 'https://api.tapstitch.com/v1',
  
  // Your Tapstitch Store ID
  storeId: import.meta.env.VITE_TAPSTITCH_STORE_ID || 'YOUR_STORE_ID'
}

// Cart storage key
export const CART_STORAGE_KEY = 'whom_shopify_cart_id'

