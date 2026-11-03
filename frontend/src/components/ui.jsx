// Peças visuais pequenas, reaproveitadas em todas as telas.

export function Campo({ rotulo, erro, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {rotulo}
      <div className="mt-1">{children}</div>
      {erro && <p className="mt-1 text-xs font-normal text-red-600 dark:text-red-400">{erro}</p>}
    </label>
  )
}

export const estiloInput =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-sky-900 dark:disabled:bg-slate-900 dark:disabled:text-slate-400'

export function Botao({ children, variante = 'primario', ...props }) {
  const cores = {
    primario: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-300',
    perigo: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
    neutro:
      'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:focus:ring-slate-500',
  }
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition
        focus:outline-none focus:ring-2 active:scale-95
        disabled:cursor-not-allowed disabled:opacity-50 ${cores[variante]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Aviso({ tipo = 'erro', children }) {
  if (!children) return null
  const cor =
    tipo === 'erro'
      ? 'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200'
      : 'border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/60 dark:text-green-200'
  const icone = tipo === 'erro' ? '❌' : '✅'
  return (
    <div className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${cor}`}>
      <span>{icone}</span>
      <span>{children}</span>
    </div>
  )
}

export function Carregando() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500 dark:text-slate-400">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600 dark:border-slate-600 dark:border-t-sky-400" />
      Carregando...
    </div>
  )
}

export function SemRegistros({ children }) {
  return (
    <div className="py-8 text-center">
      <p className="text-2xl">📭</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{children}</p>
    </div>
  )
}

export function Cartao({ titulo, children }) {
  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      {titulo && <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">{titulo}</h2>}
      {children}
    </section>
  )
}

// Etiquetinha colorida. Ex.: <Selo cor="vermelho">Lotado</Selo>
export function Selo({ cor = 'cinza', children }) {
  const cores = {
    cinza: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    vermelho: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
    verde: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    amarelo: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    azul: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
  }
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${cores[cor]}`}>
      {children}
    </span>
  )
}

// ---------- Card de número do Painel ----------

// Ícones de linha (todos no mesmo estilo). Use o nome em <CartaoNumero icone="predio" />
const ICONES = {
  predio: (
    <>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
    </>
  ),
  porta: (
    <>
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3M13 20h9M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
    </>
  ),
  pessoas: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  carro: (
    <>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  caixa: (
    <>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>
  ),
}

// Cores do quadradinho do ícone
const CORES_ICONE = {
  azul: 'bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400',
  verde: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  roxo: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400',
  laranja: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  amarelo: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  rosa: 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
}

// Card de número do Painel: ícone colorido à esquerda, número e nome à direita.
// destaque = true deixa o card amarelo (para algo que exige atenção)
export function CartaoNumero({
  icone,
  cor = 'azul',
  numero,
  rotulo,
  detalhe,
  destaque = false,
  ...props
}) {
  const estilo = destaque
    ? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40'
    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
  return (
    <div
      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 shadow-sm transition
        hover:-translate-y-1 hover:shadow-md ${estilo}`}
      {...props}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${CORES_ICONE[cor]}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {ICONES[icone]}
        </svg>
      </div>
      <div>
        <p className="text-3xl font-bold leading-none text-slate-800 dark:text-slate-100">{numero}</p>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{rotulo}</p>
        {detalhe && <div className="mt-1">{detalhe}</div>}
      </div>
    </div>
  )
}

// ---------- Pesquisa ----------

// Tira acentos e maiúsculas: "Ação" e "acao" passam a ser iguais na busca.
function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

// Filtra a lista pelo texto digitado (ignora acentos e maiúsculas).
//   lista   = os itens
//   busca   = texto digitado na pesquisa
//   textoDe = função que devolve o texto onde a busca procura (ex.: (p) => `${p.nome} ${p.cidade}`)
export function filtrar(lista, busca, textoDe) {
  const termo = normalizar(busca).trim()
  return termo ? lista.filter((item) => normalizar(textoDe(item)).includes(termo)) : lista
}

// Campo de pesquisa com ícone de lupa.
export function BarraFiltro({ busca, aoBuscar, placeholder = 'Pesquisar...' }) {
  return (
    <div className="relative mb-4">
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={busca}
        onChange={(e) => aoBuscar(e.target.value)}
        placeholder={placeholder}
        className={`${estiloInput} pl-9`}
      />
    </div>
  )
}

// ---------- Tabela (mesmo visual em todas as telas) ----------

// Use assim: <thead className={tabela.cabecalho}> ... <tr className={tabela.linha}>
export const tabela = {
  cabecalho:
    'border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400',
  linha:
    'border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60',
  principal: 'py-3 pr-4 font-medium text-slate-800 dark:text-slate-100',
  texto: 'pr-4 text-slate-600 dark:text-slate-300',
  apagado: 'text-xs font-normal text-slate-500 dark:text-slate-400',
}

// Desenhos dos botões de ícone. Para criar um tipo novo, é só acrescentar aqui.
const ICONES_BOTAO = {
  editar: {
    rotulo: 'Editar',
    desenho: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  excluir: {
    rotulo: 'Excluir',
    desenho: (
      <>
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
  // Olho: "ver detalhes"
  detalhes: {
    rotulo: 'Ver detalhes',
    desenho: (
      <>
        <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
}

// Botão pequeno só com ícone: tipo = "editar" (lápis), "excluir" (lixeira) ou "detalhes" (olho).
// ativo = true deixa o botão "aceso" (ex.: detalhes abertos).
export function BotaoIcone({ tipo = 'editar', ativo = false, ...props }) {
  const { rotulo, desenho } = ICONES_BOTAO[tipo]
  let cor = 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  if (tipo === 'excluir') cor = 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50'
  if (ativo) cor = 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
  return (
    <button
      type="button"
      title={rotulo}
      aria-label={rotulo}
      className={`rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900 ${cor}`}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {desenho}
      </svg>
    </button>
  )
}
