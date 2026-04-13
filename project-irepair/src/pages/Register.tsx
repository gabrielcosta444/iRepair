import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export function Register() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    setErro(null)
    setCarregando(true)

    try {
      await api.post('/auth/register', { email, senha })
      navigate('/login')
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao realizar cadastro.')
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
          className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-xl font-bold text-slate-800">Cadastro</h2>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {erro && <p className="text-sm text-red-600">{erro}</p>}
            <button
              type="submit"
              disabled={carregando}
              className="rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <Link
              to="/login"
              className="rounded-lg border border-blue-500 py-2 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Voltar para login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
