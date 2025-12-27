import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { shopifyConfig, CART_STORAGE_KEY } from '../config/api'

// Initialize Shopify Storefront API Client
const client = createStorefrontApiClient({
  storeDomain: shopifyConfig.domain,
  apiVersion: shopifyConfig.apiVersion,
  publicAccessToken: shopifyConfig.storefrontAccessToken
})

/**
 * Fetch all products or filtered by collection
 * @param {string} collectionHandle - Optional collection filter
 * @param {number} first - Number of products to fetch
 */
export const fetchProducts = async (collectionHandle = null, first = 20) => {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first${collectionHandle ? `, query: "tag:${collectionHandle}"` : ''}) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query, {
      variables: { first }
    })

    if (errors) {
      console.error('Shopify GraphQL Errors:', errors)
      throw new Error(errors[0]?.message || 'Failed to fetch products')
    }

    return data.products.edges.map(edge => ({
      ...edge.node,
      images: edge.node.images.edges.map(img => img.node),
      variants: edge.node.variants.edges.map(v => v.node)
    }))
  } catch (error) {
    console.error('Shopify API Error:', error)
    throw error
  }
}

/**
 * Fetch single product by handle
 * @param {string} handle - Product handle/slug
 */
export const fetchProductByHandle = async (handle) => {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await client.request(query, {
      variables: { handle }
    })

    if (errors) throw new Error(errors[0]?.message)

    return {
      ...data.product,
      images: data.product.images.edges.map(img => img.node),
      variants: data.product.variants.edges.map(v => v.node)
    }
  } catch (error) {
    console.error('Product Fetch Error:', error)
    throw error
  }
}

/**
 * Create a new cart
 */
export const createCart = async () => {
  const mutation = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const { data } = await client.request(mutation)
    
    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors[0].message)
    }

    const cart = data.cartCreate.cart
    
    // Store cart ID in localStorage
    localStorage.setItem(CART_STORAGE_KEY, cart.id)
    
    return cart
  } catch (error) {
    console.error('Cart Creation Error:', error)
    throw error
  }
}

/**
 * Get existing cart or create new one
 */
export const getCart = async () => {
  const cartId = localStorage.getItem(CART_STORAGE_KEY)
  
  if (!cartId) {
    return await createCart()
  }

  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `

  try {
    const { data } = await client.request(query, {
      variables: { cartId }
    })

    if (!data.cart) {
      // Cart expired or invalid, create new one
      return await createCart()
    }

    return data.cart
  } catch (error) {
    console.error('Get Cart Error:', error)
    return await createCart()
  }
}

/**
 * Add items to cart
 * @param {string} merchandiseId - Variant ID
 * @param {number} quantity - Quantity to add
 */
export const addToCart = async (merchandiseId, quantity = 1) => {
  let cart = await getCart()
  
  const mutation = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const { data } = await client.request(mutation, {
      variables: {
        cartId: cart.id,
        lines: [{ merchandiseId, quantity }]
      }
    })

    if (data.cartLinesAdd.userErrors.length > 0) {
      throw new Error(data.cartLinesAdd.userErrors[0].message)
    }

    return data.cartLinesAdd.cart
  } catch (error) {
    console.error('Add to Cart Error:', error)
    throw error
  }
}

/**
 * Update cart line item quantity
 */
export const updateCartLine = async (lineId, quantity) => {
  const cart = await getCart()
  
  const mutation = `
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 50) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const { data } = await client.request(mutation, {
      variables: {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }]
      }
    })

    if (data.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(data.cartLinesUpdate.userErrors[0].message)
    }

    return data.cartLinesUpdate.cart
  } catch (error) {
    console.error('Update Cart Error:', error)
    throw error
  }
}

/**
 * Remove item from cart
 */
export const removeFromCart = async (lineId) => {
  const cart = await getCart()
  
  const mutation = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 50) {
            edges {
              node {
                id
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const { data } = await client.request(mutation, {
      variables: {
        cartId: cart.id,
        lineIds: [lineId]
      }
    })

    if (data.cartLinesRemove.userErrors.length > 0) {
      throw new Error(data.cartLinesRemove.userErrors[0].message)
    }

    return data.cartLinesRemove.cart
  } catch (error) {
    console.error('Remove from Cart Error:', error)
    throw error
  }
}

/**
 * Get cart item count
 */
export const getCartCount = async () => {
  try {
    const cart = await getCart()
    return cart.lines.edges.reduce((total, { node }) => total + node.quantity, 0)
  } catch (error) {
    console.error('Get Cart Count Error:', error)
    return 0
  }
}

export default {
  fetchProducts,
  fetchProductByHandle,
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  getCartCount
}

