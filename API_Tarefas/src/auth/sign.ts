import jwt, { type SignOptions } from 'jsonwebtoken'

interface TokenPayload {
  id: number    // mesmo campo do model User gerado pelo Prisma
  email: string
}

export function generateToken(payload: TokenPayload): string {

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN as NonNullable<SignOptions['expiresIn']> // ex: '1h', '7d', '15m'
  })
}
