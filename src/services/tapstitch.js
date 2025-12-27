import axios from 'axios'
import { tapstitchConfig } from '../config/api'

// Create axios instance for Tapstitch API
const tapstitchClient = axios.create({
  baseURL: tapstitchConfig.baseUrl,
  headers: {
    'Authorization': `Bearer ${tapstitchConfig.apiKey}`,
    'Content-Type': 'application/json'
  }
})

/**
 * Get all Tapstitch products/designs
 */
export const getTapstitchProducts = async () => {
  try {
    const response = await tapstitchClient.get('/products', {
      params: {
        store_id: tapstitchConfig.storeId
      }
    })
    return response.data
  } catch (error) {
    console.error('Tapstitch Products Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Get single Tapstitch product details
 * @param {string} productId - Tapstitch product ID
 */
export const getTapstitchProduct = async (productId) => {
  try {
    const response = await tapstitchClient.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    console.error('Tapstitch Product Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Create order in Tapstitch for fulfillment
 * @param {Object} orderData - Order details
 */
export const createTapstitchOrder = async (orderData) => {
  try {
    const response = await tapstitchClient.post('/orders', {
      store_id: tapstitchConfig.storeId,
      ...orderData
    })
    return response.data
  } catch (error) {
    console.error('Tapstitch Order Creation Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Get order status from Tapstitch
 * @param {string} orderId - Tapstitch order ID
 */
export const getTapstitchOrderStatus = async (orderId) => {
  try {
    const response = await tapstitchClient.get(`/orders/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Tapstitch Order Status Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Get available print locations for a product
 * @param {string} productId - Product ID
 */
export const getPrintLocations = async (productId) => {
  try {
    const response = await tapstitchClient.get(`/products/${productId}/print-locations`)
    return response.data
  } catch (error) {
    console.error('Tapstitch Print Locations Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Upload design/artwork to Tapstitch
 * @param {File} file - Image file
 * @param {Object} metadata - Design metadata
 */
export const uploadDesign = async (file, metadata = {}) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('store_id', tapstitchConfig.storeId)
    
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key])
    })

    const response = await tapstitchClient.post('/designs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response.data
  } catch (error) {
    console.error('Tapstitch Design Upload Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Get shipping estimates
 * @param {Object} shippingData - Shipping details (address, items)
 */
export const getShippingEstimate = async (shippingData) => {
  try {
    const response = await tapstitchClient.post('/shipping/estimate', {
      store_id: tapstitchConfig.storeId,
      ...shippingData
    })
    return response.data
  } catch (error) {
    console.error('Tapstitch Shipping Estimate Error:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Sync Tapstitch product catalog with Shopify
 * This maps Tapstitch products to Shopify products
 */
export const syncTapstitchWithShopify = async (tapstitchProductId, shopifyProductId) => {
  try {
    // Store mapping in your backend or use Shopify metafields
    const mapping = {
      tapstitch_product_id: tapstitchProductId,
      shopify_product_id: shopifyProductId,
      synced_at: new Date().toISOString()
    }
    
    // This would typically be saved to your backend database
    console.log('Product Mapping:', mapping)
    return mapping
  } catch (error) {
    console.error('Sync Error:', error)
    throw error
  }
}

/**
 * Webhook handler for Tapstitch order updates
 * Call this when Tapstitch sends webhook notifications
 */
export const handleTapstitchWebhook = async (webhookData) => {
  try {
    const { event_type, order_id, status } = webhookData
    
    console.log('Tapstitch Webhook:', {
      event: event_type,
      order: order_id,
      status
    })
    
    // Update your order tracking system
    // Send customer notifications
    // Update Shopify order fulfillment status
    
    return { received: true }
  } catch (error) {
    console.error('Webhook Handler Error:', error)
    throw error
  }
}

export default {
  getTapstitchProducts,
  getTapstitchProduct,
  createTapstitchOrder,
  getTapstitchOrderStatus,
  getPrintLocations,
  uploadDesign,
  getShippingEstimate,
  syncTapstitchWithShopify,
  handleTapstitchWebhook
}

