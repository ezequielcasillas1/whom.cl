export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    },
    body: JSON.stringify(body)
  }
}

export function methodNotAllowed(allowed = ['GET']) {
  return json(405, { error: `Method not allowed. Use ${allowed.join(', ')}` })
}

export function badRequest(message) {
  return json(400, { error: message })
}

export function serverError(message) {
  return json(500, { error: message })
}

export function getRawBody(event) {
  if (!event?.body) return ''
  if (event.isBase64Encoded) {
    return Buffer.from(event.body, 'base64')
  }
  return event.body
}

