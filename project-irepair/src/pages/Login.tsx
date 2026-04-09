import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    setErro(null)
    setCarregando(true)

    try {
      await login(email, senha)
      navigate('/')
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer login.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    
    <div>
    <h1 className="p-4 font-mono text-5xl font-bold text-blue-600">iRepair.</h1>
    <div className="flex justify-center py-6">
        <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-slate-200"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Login
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {erro && <p className="text-sm text-red-600">{erro}</p>}
          <button
            type="submit"
            disabled={carregando}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}
