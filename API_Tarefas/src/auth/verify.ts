import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: number
  email: string
  iat: number
  exp: number
}

export function verifyToken(token: string): TokenPayload {
  // jwt.verify lança uma exceção se o token for inválido ou expirado
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
  return decoded
}