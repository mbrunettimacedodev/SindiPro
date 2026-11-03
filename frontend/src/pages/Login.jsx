import { useState } from 'react'
import { api } from '../api.js'
import BotaoTema from '../components/BotaoTema.jsx'
import Logo from '../components/Logo.jsx'
import { Aviso, Botao, Campo, estiloInput } from '../components/ui.jsx'

// Tela de login. aoEntrar(usuario) é chamado pelo App quando o login dá certo.
export default function Login({ aoEntrar, tema, aoAlternarTema }) {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false) // trava o botão enquanto espera a API

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      // O backend devolve { id, nome, email } se e-mail e senha conferem. A senha NUNCA volta.
      const usuario = await api.post('/auth/login', { email: form.email.trim().toLowerCase(), senha: form.senha })
      aoEntrar(usuario)
    } catch (e) {
      setErro(e.message)
      setForm({ ...form, senha: '' }) // limpa só a senha
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <BotaoTema
        tema={tema}
        aoAlternar={aoAlternarTema}
        className="absolute right-4 top-4 text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800"
      />

      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo className="h-14 w-14" />
          <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">SindiPro</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gestão de condomínios</p>
        </div>

        <form
          onSubmit={entrar}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Entrar</h2>

          <Aviso tipo="erro">{erro}</Aviso>

          <Campo rotulo="E-mail">
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              value={form.email}
              onChange={mudar}
              className={estiloInput}
              autoFocus
            />
          </Campo>
          <Campo rotulo="Senha">
            <input
              name="senha"
              type="password"
              autoComplete="current-password"
              required
              value={form.senha}
              onChange={mudar}
              className={estiloInput}
            />
          </Campo>

          <Botao type="submit" disabled={enviando} style={{ width: '100%' }}>
            {enviando ? 'Entrando...' : 'Entrar'}
          </Botao>
        </form>
      </div>
    </div>
  )
}
