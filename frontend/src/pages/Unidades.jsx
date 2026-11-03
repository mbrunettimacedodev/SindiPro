import { Fragment, useEffect, useState } from 'react'
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
  estiloInput,
  filtrar,
  tabela,
} from '../components/ui.jsx'

const FORM_VAZIO = { bloco: '', andar: '', numeroApartamento: '', predioId: '' }

export default function Unidades() {
  const [unidades, setUnidades] = useState([])
  const [predios, setPredios] = useState([]) // alimenta o <select> de prédios
  const [carregando, setCarregando] = useState(true)
  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [erro, setErro] = useState('')
  const [campos, setCampos] = useState({})
  const [sucesso, setSucesso] = useState('')
  const [busca, setBusca] = useState('')
  const [unidadeParaExcluir, setUnidadeParaExcluir] = useState(null)

  // Detalhes de uma unidade: moradores e vagas associadas
  const [detalheId, setDetalheId] = useState(null)
  const [detalhe, setDetalhe] = useState({ moradores: [], vagas: [] })

  async function carregar() {
    setCarregando(true)
    try {
      // Promise.all dispara as duas chamadas ao mesmo tempo e espera as duas terminarem.
      const [listaUnidades, listaPredios] = await Promise.all([api.get('/unidades'), api.get('/predios')])
      setUnidades(listaUnidades)
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

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setCampos({})
    setSucesso('')
    // O backend espera "predio": { "id": 1 } (objeto), não só o número. Montamos aqui.
    const corpo = {
      bloco: form.bloco,
      andar: Number(form.andar),
      numeroApartamento: Number(form.numeroApartamento),
      predio: form.predioId ? { id: Number(form.predioId) } : null,
    }
    try {
      if (editandoId) {
        await api.put(`/unidades/${editandoId}`, corpo)
      } else {
        await api.post('/unidades', corpo)
      }
      setSucesso(editandoId ? 'Unidade atualizada!' : 'Unidade cadastrada!')
      cancelar()
      carregar()
    } catch (e) {
      setErro(e.message)
      setCampos(e.campos || {})
    }
  }

  function editar(u) {
    setEditandoId(u.id)
    setForm({ bloco: u.bloco, andar: u.andar, numeroApartamento: u.numeroApartamento, predioId: u.predio.id })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  async function confirmarExclusao() {
    const unidade = unidadeParaExcluir
    setUnidadeParaExcluir(null)
    setErro('')
    setSucesso('')
    try {
      await api.delete(`/unidades/${unidade.id}`)
      setSucesso('Unidade excluída.')
      if (detalheId === unidade.id) setDetalheId(null)
      carregar()
    } catch (e) {
      // Ex.: "a unidade ainda possui moradores cadastrados"
      setErro(e.message)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Abre/fecha o painel de detalhes. Clicou de novo na mesma unidade = fecha.
  async function alternarDetalhe(id) {
    if (detalheId === id) {
      setDetalheId(null)
      return
    }
    try {
      const [moradores, vagas] = await Promise.all([
        api.get(`/moradores?unidadeId=${id}`),
        api.get(`/vagas?unidadeId=${id}`),
      ])
      setDetalhe({ moradores, vagas })
      setDetalheId(id)
    } catch (e) {
      setErro(e.message)
    }
  }

  const visiveis = filtrar(
    unidades,
    busca,
    (u) => `${u.predio?.nomeCondominio} bloco ${u.bloco} andar ${u.andar} apto ${u.numeroApartamento}`,
  )
  const contador = busca.trim() ? `${visiveis.length} de ${unidades.length}` : unidades.length

  return (
    <>
      <Aviso tipo="erro">{erro}</Aviso>
      <Aviso tipo="sucesso">{sucesso}</Aviso>

      <Cartao titulo={editandoId ? 'Editar unidade' : 'Nova unidade'}>
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
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
          <Campo rotulo="Bloco" erro={campos.bloco}>
            <input name="bloco" value={form.bloco} onChange={mudar} className={estiloInput} />
          </Campo>
          <Campo rotulo="Andar" erro={campos.andar}>
            <input name="andar" type="number" value={form.andar} onChange={mudar} className={estiloInput} />
          </Campo>
          <Campo rotulo="Nº do apartamento" erro={campos.numeroApartamento}>
            <input
              name="numeroApartamento"
              type="number"
              value={form.numeroApartamento}
              onChange={mudar}
              className={estiloInput}
            />
          </Campo>
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

      <Cartao titulo={`Unidades cadastradas (${contador})`}>
        {carregando ? (
          <Carregando />
        ) : unidades.length === 0 ? (
          <SemRegistros>Nenhuma unidade cadastrada ainda.</SemRegistros>
        ) : (
          <>
            <BarraFiltro busca={busca} aoBuscar={setBusca} placeholder="Pesquisar por prédio, bloco, andar ou apto..." />

            {visiveis.length === 0 ? (
              <SemRegistros>Nenhuma unidade encontrada para "{busca}".</SemRegistros>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={tabela.cabecalho}>
                    <tr>
                      <th className="py-2 pr-4">Prédio</th>
                      <th className="pr-4">Bloco</th>
                      <th className="pr-4">Andar</th>
                      <th className="pr-4">Apto</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((u) => (
                      // Fragment com key: agrupa as 2 linhas (<tr>) de cada unidade sem criar uma tag extra no HTML.
                      <Fragment key={u.id}>
                        <tr className={tabela.linha}>
                          <td className={tabela.principal}>{u.predio.nomeCondominio}</td>
                          <td className={tabela.texto}>{u.bloco}</td>
                          <td className={tabela.texto}>{u.andar}º</td>
                          <td className={tabela.texto}>{u.numeroApartamento}</td>
                          <td className="py-2 text-right">
                            <div className="flex justify-end gap-1">
                              <BotaoIcone
                                tipo="detalhes"
                                ativo={detalheId === u.id}
                                onClick={() => alternarDetalhe(u.id)}
                              />
                              <BotaoIcone tipo="editar" onClick={() => editar(u)} />
                              <BotaoIcone tipo="excluir" onClick={() => setUnidadeParaExcluir(u)} />
                            </div>
                          </td>
                        </tr>
                        {detalheId === u.id && (
                          <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
                            <td colSpan={5} className="px-3 py-3 text-slate-700 dark:text-slate-300">
                              <p className="font-medium text-slate-800 dark:text-slate-100">Moradores</p>
                              {detalhe.moradores.length === 0 ? (
                                <p className="mb-3 text-slate-500 dark:text-slate-400">Nenhum morador nesta unidade.</p>
                              ) : (
                                <ul className="mb-3 list-disc pl-5">
                                  {detalhe.moradores.map((m) => (
                                    <li key={m.id}>
                                      {m.nome} ({m.tipo === 'INQUILINO' ? 'inquilino' : 'proprietário'})
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <p className="font-medium text-slate-800 dark:text-slate-100">Vagas de garagem</p>
                              {detalhe.vagas.length === 0 ? (
                                <p className="text-slate-500 dark:text-slate-400">Nenhuma vaga vinculada.</p>
                              ) : (
                                <ul className="list-disc pl-5">
                                  {detalhe.vagas.map((v) => (
                                    <li key={v.id}>
                                      Vaga {v.numero} — {v.coberta ? 'coberta' : 'descoberta'}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Cartao>

      {unidadeParaExcluir && (
        <ModalConfirmar
          titulo="Excluir unidade?"
          mensagem={`Você vai excluir o apto ${unidadeParaExcluir.numeroApartamento} do bloco ${unidadeParaExcluir.bloco}. Essa ação não pode ser desfeita.`}
          aoConfirmar={confirmarExclusao}
          aoCancelar={() => setUnidadeParaExcluir(null)}
        />
      )}
    </>
  )
}
