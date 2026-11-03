import { useEffect, useState } from 'react'
import { api } from '../api.js'
import ModalConfirmar from '../components/ModalConfirmar.jsx'
import {
  Aviso,
  BarraFiltro,
  Botao,
  BotaoIcone,
  Campo,
  Carregando,
  Cartao,
  SemRegistros,
  Selo,
  estiloInput,
  filtrar,
  tabela,
} from '../components/ui.jsx'

const FORM_VAZIO = { titulo: '', local: '', dataHora: '', descricao: '', predioId: '' }

// "2026-11-05T19:00:00" -> "05/11/2026 19:00"
function formatarData(data) {
  return data ? new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—'
}

// O <input type="datetime-local"> só aceita "AAAA-MM-DDTHH:MM" (sem segundos).
function paraInput(data) {
  return data ? String(data).slice(0, 16) : ''
}

// Selo de situação: hoje, próximo ou já aconteceu.
function situacao(data) {
  const evento = new Date(data)
  const hoje = new Date()
  if (evento.toDateString() === hoje.toDateString()) return <Selo cor="verde">Hoje</Selo>
  if (evento > hoje) return <Selo cor="azul">Próximo</Selo>
  return <Selo cor="cinza">Encerrado</Selo>
}

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [predios, setPredios] = useState([])
  const [somenteProximos, setSomenteProximos] = useState(true)
  const [carregando, setCarregando] = useState(true)
  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [erro, setErro] = useState('')
  const [campos, setCampos] = useState({})
  const [sucesso, setSucesso] = useState('')
  const [busca, setBusca] = useState('')
  const [eventoParaExcluir, setEventoParaExcluir] = useState(null)

  // Recebe o filtro como parâmetro para sempre usar o valor mais novo do checkbox.
  async function carregar(proximos = somenteProximos) {
    setCarregando(true)
    try {
      const [listaEventos, listaPredios] = await Promise.all([
        api.get(proximos ? '/eventos?proximos=true' : '/eventos'),
        api.get('/predios'),
      ])
      setEventos(listaEventos)
      setPredios(listaPredios)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function alternarFiltro(e) {
    setSomenteProximos(e.target.checked)
    carregar(e.target.checked)
  }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setCampos({})
    setSucesso('')
    const corpo = {
      titulo: form.titulo,
      local: form.local,
      descricao: form.descricao || null,
      // datetime-local devolve "2026-11-05T19:00"; o Spring (LocalDateTime) entende esse formato.
      dataHora: form.dataHora || null,
      predio: form.predioId ? { id: Number(form.predioId) } : null,
    }
    try {
      if (editandoId) {
        await api.put(`/eventos/${editandoId}`, corpo)
      } else {
        await api.post('/eventos', corpo)
      }
      setSucesso(editandoId ? 'Evento atualizado!' : 'Evento cadastrado!')
      cancelar()
      carregar()
    } catch (e) {
      setErro(e.message)
      setCampos(e.campos || {})
    }
  }

  function editar(ev) {
    setEditandoId(ev.id)
    setForm({
      titulo: ev.titulo,
      local: ev.local ?? '',
      dataHora: paraInput(ev.dataHora),
      descricao: ev.descricao ?? '',
      predioId: ev.predio?.id ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  async function confirmarExclusao() {
    const evento = eventoParaExcluir
    setEventoParaExcluir(null)
    setErro('')
    setSucesso('')
    try {
      await api.delete(`/eventos/${evento.id}`)
      setSucesso('Evento excluído.')
      carregar()
    } catch (e) {
      setErro(e.message)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const visiveis = filtrar(
    eventos,
    busca,
    (ev) => `${ev.titulo} ${ev.local ?? ''} ${ev.descricao ?? ''} ${ev.predio?.nomeCondominio ?? ''}`,
  )
  const contador = busca.trim() ? `${visiveis.length} de ${eventos.length}` : eventos.length

  return (
    <>
      <Aviso tipo="erro">{erro}</Aviso>
      <Aviso tipo="sucesso">{sucesso}</Aviso>

      <Cartao titulo={editandoId ? 'Editar evento' : 'Novo evento'}>
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Título" erro={campos.titulo}>
            <input
              name="titulo"
              value={form.titulo}
              onChange={mudar}
              placeholder="Assembleia geral"
              className={estiloInput}
            />
          </Campo>
          <Campo rotulo="Prédio" erro={campos.predio}>
            <select name="predioId" value={form.predioId} onChange={mudar} className={estiloInput}>
              <option value="">Selecione...</option>
              {predios.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nomeCondominio}
                </option>
              ))}
            </select>
          </Campo>
          <Campo rotulo="Data e hora" erro={campos.dataHora}>
            <input
              name="dataHora"
              type="datetime-local"
              value={form.dataHora}
              onChange={mudar}
              className={estiloInput}
            />
          </Campo>
          <Campo rotulo="Local" erro={campos.local}>
            <input
              name="local"
              value={form.local}
              onChange={mudar}
              placeholder="Salão de festas"
              className={estiloInput}
            />
          </Campo>
          <div className="sm:col-span-2">
            <Campo rotulo="Descrição (opcional)" erro={campos.descricao}>
              <textarea
                name="descricao"
                rows={3}
                value={form.descricao}
                onChange={mudar}
                placeholder="Pauta, observações, o que levar..."
                className={estiloInput}
              />
            </Campo>
          </div>
          <div className="flex justify-center gap-2 sm:col-span-2">
            <Botao type="submit">{editandoId ? 'Salvar alterações' : 'Cadastrar'}</Botao>
            {editandoId && (
              <Botao type="button" variante="neutro" onClick={cancelar}>
                Cancelar
              </Botao>
            )}
          </div>
        </form>
      </Cartao>

      <Cartao titulo={`Eventos (${contador})`}>
        <label className="mb-4 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={somenteProximos} onChange={alternarFiltro} className="h-4 w-4" />
          Mostrar só os eventos de hoje em diante
        </label>

        {carregando ? (
          <Carregando />
        ) : eventos.length === 0 ? (
          <SemRegistros>Nenhum evento por aqui.</SemRegistros>
        ) : (
          <>
            <BarraFiltro busca={busca} aoBuscar={setBusca} placeholder="Pesquisar por título, local ou prédio..." />

            {visiveis.length === 0 ? (
              <SemRegistros>Nenhum evento encontrado para "{busca}".</SemRegistros>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={tabela.cabecalho}>
                    <tr>
                      <th className="py-2 pr-4">Evento</th>
                      <th className="pr-4">Quando</th>
                      <th className="pr-4">Onde</th>
                      <th className="pr-4">Situação</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((ev) => (
                      <tr key={ev.id} className={tabela.linha}>
                        <td className={tabela.principal}>
                          {ev.titulo}
                          {ev.descricao && (
                            <span className={`block max-w-xs truncate ${tabela.apagado}`} title={ev.descricao}>
                              {ev.descricao}
                            </span>
                          )}
                        </td>
                        <td className={`${tabela.texto} whitespace-nowrap`}>{formatarData(ev.dataHora)}</td>
                        <td className={tabela.texto}>
                          {ev.local}
                          <span className={`block ${tabela.apagado}`}>{ev.predio?.nomeCondominio}</span>
                        </td>
                        <td className="pr-4">{situacao(ev.dataHora)}</td>
                        <td className="py-2 text-right">
                          <div className="flex justify-end gap-1">
                            <BotaoIcone tipo="editar" onClick={() => editar(ev)} />
                            <BotaoIcone tipo="excluir" onClick={() => setEventoParaExcluir(ev)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Cartao>

      {eventoParaExcluir && (
        <ModalConfirmar
          titulo="Excluir evento?"
          mensagem={`Você vai excluir "${eventoParaExcluir.titulo}". Essa ação não pode ser desfeita.`}
          aoConfirmar={confirmarExclusao}
          aoCancelar={() => setEventoParaExcluir(null)}
        />
      )}
    </>
  )
}
