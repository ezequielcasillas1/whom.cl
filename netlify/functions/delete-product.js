import { json, methodNotAllowed, serverError, badRequest, getRawBody } from './_http.js'
import { deleteStoreProduct } from './_printful.js'

export async function handler(event) {
  if (event.httpMethod !== 'DELETE') return methodNotAllowed(['DELETE'])

  try {
    // Support product ID from path, query params, or body
    let productId = event.pathParameters?.id || event.queryStringParameters?.id

    // If not in path/query, try parsing body
    if (!productId && event.body) {
      try {
        const body = JSON.parse(getRawBody(event))
        productId = body.id || body.productId
      } catch {
        // Ignore parse errors, will fail validation below
      }
    }

    if (!productId) {
      return badRequest('Product ID is required. Provide via path, query param (?id=XXX), or body ({id: XXX})')
    }

    const result = await deleteStoreProduct(productId)

    return json(200, {
      success: true,
      message: 'Product deleted successfully',
      productId,
      result
    })
  } catch (e) {
    return serverError(e?.message || 'Failed to delete product')
  }
}
