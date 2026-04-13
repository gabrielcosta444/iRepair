import jwt, { type SignOptions } from 'jsonwebtoken'

interface TokenPayloadGenerate {
  id: number    // mesmo campo do model User gerado pelo Prisma
  email: string
}

export function generateToken(payload: TokenPayloadGenerate): string {

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN as NonNullable<SignOptions['expiresIn']> // ex: '1h', '7d', '15m'
  })
}

interface TokenPayloadVerify {
  id: number
  email: string
  iat: number
  exp: number
}

export function verifyToken(token: string): TokenPayloadVerify {
  // jwt.verify lança uma exceção se o token for inválido ou expirado
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayloadVerify
  return decoded
}