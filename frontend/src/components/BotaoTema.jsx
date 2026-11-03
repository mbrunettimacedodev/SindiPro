// Botão sol/lua que alterna o tema claro/escuro.
export default function BotaoTema({ tema, aoAlternar, className = '' }) {
  const escuro = tema === 'escuro'
  const rotulo = escuro ? 'Usar tema claro' : 'Usar tema escuro'
  return (
    <button
      type="button"
      onClick={aoAlternar}
      title={rotulo}
      aria-label={rotulo}
      className={`rounded-md p-2 transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
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
        {escuro ? (
          // Sol (no escuro, mostra o sol = "clique para clarear")
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          // Lua
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        )}
      </svg>
    </button>
  )
}
