import { useEffect, useState } from 'react'

// Chave usada para lembrar a escolha do usuário no navegador.
const CHAVE = 'sindipro.tema'

// Tema inicial: o que o usuário escolheu antes; se nunca escolheu, segue o sistema operacional.
function temaInicial() {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo === 'claro' || salvo === 'escuro') return salvo
  } catch {
    // localStorage pode estar bloqueado (aba anônima, por exemplo). Sem problema, seguimos o sistema.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

// Hook: devolve o tema atual e uma função para alternar entre claro e escuro.
export function useTema() {
  const [tema, setTema] = useState(temaInicial)

  // Sempre que o tema muda: coloca/tira a classe "dark" do <html> e salva a escolha.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'escuro')
    try {
      localStorage.setItem(CHAVE, tema)
    } catch {
      // ignorado: o tema só não fica salvo para a próxima visita
    }
  }, [tema])

  const alternar = () => setTema((atual) => (atual === 'escuro' ? 'claro' : 'escuro'))
  return { tema, alternar }
}
