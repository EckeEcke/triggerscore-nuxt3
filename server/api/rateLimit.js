const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 50

export const rateLimit = (ip, userAgent) => {
  console.log(`User-Agent: ${userAgent}`)
  console.log(`IP: ${ip}`)

  const currentTime = Date.now()
  const requestLog = rateLimitMap.get(ip) || []
  const updatedRequestLog = requestLog.filter(timestamp => currentTime - timestamp < RATE_LIMIT_WINDOW_MS)

  if (updatedRequestLog.length >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      statusCode: 429,
      body: JSON.stringify({ message: 'Too many requests, please try again later.' }),
    }
  }

  updatedRequestLog.push(currentTime)
  rateLimitMap.set(ip, updatedRequestLog)

  return null
}