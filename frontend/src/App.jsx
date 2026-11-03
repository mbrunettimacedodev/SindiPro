import { useState } from 'react'
import BotaoTema from './components/BotaoTema.jsx'
import Logo from './components/Logo.jsx'
import Encomendas from './pages/Encomendas.jsx'
import Eventos from './pages/Eventos.jsx'
import Login from './pages/Login.jsx'
import Moradores from './pages/Moradores.jsx'
import Painel from './pages/Painel.jsx'
import Predios from './pages/Predios.jsx'
import Unidades from './pages/Unidades.jsx'
import Vagas from './pages/Vagas.jsx'
import { apagarUsuario, lerUsuario, salvarUsuario } from './sessao.js'
import { useTema } from './tema.js'

// E-mail de suporte/contato mostrado no footer. TROQUE pelo e-mail real.
const EMAIL_SUPORTE = 'suporte@sindipro.com'
// Telefone de suporte mostrado no footer. TROQUE pelo número real.
const TELEFONE_SUPORTE = '(51) 99999-9999'

// Menu do sistema. "chave" é o identificador interno; "componente" é a tela que ela abre.
const MENU = [
  { chave: 'painel', rotulo: 'Painel', componente: Painel },
  { chave: 'predios', rotulo: 'Prédios', componente: Predios },
  { chave: 'unidades', rotulo: 'Unidades', componente: Unidades },
  { chave: 'moradores', rotulo: 'Moradores', componente: Moradores },
  { chave: 'vagas', rotulo: 'Vagas', componente: Vagas },
  { chave: 'encomendas', rotulo: 'Encomendas', componente: Encomendas },
  { chave: 'eventos', rotulo: 'Eventos', componente: Eventos },
]

export default function App() {
  // useState guarda "qual tela está aberta". Mudou o valor -> o React redesenha a página.
  const [aberta, setAberta] = useState('painel')
  // Quem está logado. Começa com o que ficou salvo no navegador (sobrevive ao F5).
  const [usuario, setUsuario] = useState(lerUsuario)
  const { tema, alternar } = useTema()

  function entrar(dados) {
    salvarUsuario(dados)
    setUsuario(dados)
    setAberta('painel')
  }

  function sair() {
    apagarUsuario()
    setUsuario(null)
  }

  // Sem ninguém logado, a única tela possível é o login.
  if (!usuario) return <Login aoEntrar={entrar} tema={tema} aoAlternarTema={alternar} />

  // Procura no MENU o item da tela aberta e pega o componente dele.
  const Tela = MENU.find((item) => item.chave === aberta).componente

  return (
    // flex-col + min-h-screen + flex-1 no <main> = o footer fica sempre no pé da tela,
    // mesmo quando a página tem pouco conteúdo.
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="bg-slate-900 text-white dark:border-b dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold">SindiPro</h1>
          </div>

          {/* flex-wrap: no celular o menu quebra em mais de uma linha em vez de estourar a tela */}
          <nav className="flex flex-wrap gap-2">
            {MENU.map((item) => (
              <button
                key={item.chave}
                onClick={() => setAberta(item.chave)}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  aberta === item.chave ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {item.rotulo}
              </button>
            ))}
          </nav>

          {/* Usuário logado, tema e sair */}
          <div className="flex items-center gap-2 border-t border-slate-800 pt-3 lg:border-0 lg:pt-0">
            <span className="mr-auto truncate text-sm text-slate-300 lg:mr-1" title={usuario.email}>
              Olá, <strong className="text-white">{usuario.nome?.split(' ')[0]}</strong>
            </span>
            <BotaoTema tema={tema} aoAlternar={alternar} className="text-slate-300 hover:bg-slate-800 hover:text-white" />
            <button
              onClick={sair}
              title="Sair do sistema"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5M21 12H9" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {/* irPara deixa a tela abrir outra tela (usado pelos cards do Painel). */}
        <Tela irPara={setAberta} />
      </main>

      <footer className="bg-slate-900 text-slate-400 dark:border-t dark:border-slate-800">
        <div className="mx-auto grid max-w-6xl items-center gap-3 px-4 py-5 text-center text-sm sm:grid-cols-3">
          {/* Esquerda: logo e nome */}
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Logo className="h-6 w-6" />
            <span className="font-semibold text-white">SindiPro</span>
          </div>

          {/* Centro: copyright */}
          <p className="text-xs">© {new Date().getFullYear()} SindiPro · Gestão de condomínios</p>

          {/* Direita: e-mail e telefone */}
          <p className="sm:text-right">
            <a
              href={`mailto:${EMAIL_SUPORTE}`}
              className="font-medium text-sky-400 transition hover:text-sky-300 hover:underline"
            >
              {EMAIL_SUPORTE}
            </a>
            {' | '}
            <a
              href={`tel:${TELEFONE_SUPORTE.replace(/\D/g, '')}`}
              className="font-medium text-sky-400 transition hover:text-sky-300 hover:underline"
            >
              {TELEFONE_SUPORTE}
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
