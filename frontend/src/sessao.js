// Guarda "quem está logado" no navegador (localStorage), para o login sobreviver ao F5.
const CHAVE = 'sindipro.usuario'

export function lerUsuario() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE))
  } catch {
    return null // nada salvo, JSON inválido ou localStorage bloqueado
  }
}

export function salvarUsuario(usuario) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(usuario))
  } catch {
    // sem localStorage o login só não sobrevive ao F5
  }
}

export function apagarUsuario() {
  try {
    localStorage.removeItem(CHAVE)
  } catch {
    // ignorado
  }
}
