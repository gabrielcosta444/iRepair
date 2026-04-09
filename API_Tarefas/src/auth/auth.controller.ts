// src/domains/auth/auth.controller.ts
import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, senha } = req.body
    const usuario = await authService.register(email, senha)
    return res.status(201).json(usuario)
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body
    const { token, usuario } = await authService.login(email, senha)

    // Setando o cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    })

    return res.status(200).json({ usuario })
  }

  async logout(req: Request, res: Response) {
    // Limpa o cookie usando os mesmos atributos definidos no login.
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    })

    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user })
  }
}
