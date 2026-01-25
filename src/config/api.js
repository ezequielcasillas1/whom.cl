export const tapstitchConfig = {
  // Tapstitch API Key (Get from Tapstitch dashboard)
  apiKey: import.meta.env.VITE_TAPSTITCH_API_KEY || 'YOUR_TAPSTITCH_API_KEY',
  
  // Tapstitch API Base URL
  baseUrl: 'https://api.tapstitch.com/v1',
  
  // Your Tapstitch Store ID
  storeId: import.meta.env.VITE_TAPSTITCH_STORE_ID || 'YOUR_STORE_ID'
}

// Cart storage key
export const CART_STORAGE_KEY = 'whom_cart'

