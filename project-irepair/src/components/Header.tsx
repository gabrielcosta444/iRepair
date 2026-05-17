import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    try {
      setIsLoggingOut(true)
      await logout()
      navigate('/login', { replace: true })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="flex items-center justify-between">
      <h1 className="p-4 font-mono text-5xl font-bold text-blue-600">iRepair.</h1>
      <nav className="flex items-center gap-4 p-7 text-blue-600">
        <Link to="/" className="px-7">
          Dashboard
        </Link>
        <Link to="/clients" className="px-7">
          Clientes
        </Link>
        <Link to="/service-orders" className="px-7">
          Ordens de Servico
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingOut ? 'Saindo...' : 'Sair'}
        </button>
      </nav>
    </header>
  )
}

export default Header
