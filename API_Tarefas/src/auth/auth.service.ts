// src/domains/auth/auth.service.ts
import bcrypt from 'bcrypt'
import { prisma } from '../config/prismaClient'
import { generateToken } from '../utils/token'

const SALT_ROUNDS = 10

type HttpError = Error & { status: number }

function createHttpError(message: string, status: number): HttpError {
  const error = new Error(message) as HttpError
  error.status = status
  return error
}

export class AuthService {
  async register(email: string, senha: string) {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    })

    if (usuarioExistente) {
      throw createHttpError('Email já cadastrado', 409)
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

    const usuario = await prisma.usuario.create({
      data: { email, senha: senhaHash },
      select: { id: true, email: true }, // nunca retorne o hash da senha
    })

    return usuario
  }

  async login(email: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    })

    if (!usuario) {
      // Mensagem genérica: não revele se o email existe ou não
      throw createHttpError('Credenciais inválidas', 401)
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      throw createHttpError('Credenciais inválidas', 401)
    }

    const token = generateToken({ id: usuario.id, email: usuario.email })

    return { token, usuario: { id: usuario.id, email: usuario.email } }
  }
}
