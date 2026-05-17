import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AxiosResponse } from 'axios'
import { api } from '../services/api'

interface Usuario {
  id: number
  email: string
}

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => Promise<void>
}

interface AuthResponse {
  usuario: Usuario
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get<AuthResponse>('/auth/me')
      .then((res: AxiosResponse<AuthResponse>) => setUser(res.data.usuario))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, senha: string) {
    const response = await api.post('/auth/login', { email, senha })
    setUser(response.data.usuario)
  }

  async function logout() {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
