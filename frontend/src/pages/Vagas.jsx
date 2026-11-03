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

const FORM_VAZIO = { numero: '', coberta: false, unidadeId: '' }

export default function Vagas() {
  const [vagas, setVagas] = useState([])
  const [unidades, setUnidades] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [erro, setErro] = useState('')
  const [campos, setCampos] = useState({})
  const [sucesso, setSucesso] = useState('')
  const [busca, setBusca] = useState('')
  const [vagaParaExcluir, setVagaParaExcluir] = useState(null)

  async function carregar() {
    setCarregando(true)
    try {
      const [listaVagas, listaUnidades] = await Promise.all([api.get('/vagas'), api.get('/unidades')])
      setVagas(listaVagas)
      setUnidades(listaUnidades)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  // Checkbox é diferente dos outros inputs: o valor está em "checked", não em "value".
  function mudar(e) {
    const { name, type, checked, value } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setCampos({})
    setSucesso('')
    const corpo = {
      numero: form.numero,
      coberta: form.coberta,
      // RELAÇÃO OPCIONAL: sem unidade escolhida mandamos null = vaga livre.
      unidade: form.unidadeId ? { id: Number(form.unidadeId) } : null,
    }
    try {
      if (editandoId) {
        await api.put(`/vagas/${editandoId}`, corpo)
      } else {
        await api.post('/vagas', corpo)
      }
      setSucesso(editandoId ? 'Vaga atualizada!' : 'Vaga cadastrada!')
      cancelar()
      carregar()
    } catch (e) {
      setErro(e.message)
      setCampos(e.campos || {})
    }
  }

  function editar(v) {
    setEditandoId(v.id)
    setForm({ numero: v.numero, coberta: !!v.coberta, unidadeId: v.unidade ? v.unidade.id : '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  async function confirmarExclusao() {
    const vaga = vagaParaExcluir
    setVagaParaExcluir(null)
    setErro('')
    setSucesso('')
    try {
      await api.delete(`/vagas/${vaga.id}`)
      setSucesso('Vaga excluída.')
      carregar()
    } catch (e) {
      setErro(e.message)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const visiveis = filtrar(
    vagas,
    busca,
    (v) =>
      `${v.numero} ${v.coberta ? 'coberta' : 'descoberta'} ${
        v.unidade ? `bloco ${v.unidade.bloco} apto ${v.unidade.numeroApartamento}` : 'livre'
      }`,
  )
  const contador = busca.trim() ? `${visiveis.length} de ${vagas.length}` : vagas.length

  return (
    <>
      <Aviso tipo="erro">{erro}</Aviso>
      <Aviso tipo="sucesso">{sucesso}</Aviso>

      <Cartao titulo={editandoId ? 'Editar vaga' : 'Nova vaga de garagem'}>
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Número da vaga" erro={campos.numero}>
            <input name="numero" value={form.numero} onChange={mudar} className={estiloInput} />
          </Campo>
          <Campo rotulo="Unidade (opcional)" erro={campos.unidade}>
            <select name="unidadeId" value={form.unidadeId} onChange={mudar} className={estiloInput}>
              <option value="">Livre (sem unidade)</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.predio.nomeCondominio} — bloco {u.bloco}, apto {u.numeroApartamento}
                </option>
              ))}
            </select>
          </Campo>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <input name="coberta" type="checkbox" checked={form.coberta} onChange={mudar} className="h-4 w-4" />
            Vaga coberta
          </label>
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

      <Cartao titulo={`Vagas cadastradas (${contador})`}>
        {carregando ? (
          <Carregando />
        ) : vagas.length === 0 ? (
          <SemRegistros>Nenhuma vaga cadastrada ainda.</SemRegistros>
        ) : (
          <>
            <BarraFiltro busca={busca} aoBuscar={setBusca} placeholder="Pesquisar por número, tipo, bloco, apto ou livre..." />

            {visiveis.length === 0 ? (
              <SemRegistros>Nenhuma vaga encontrada para "{busca}".</SemRegistros>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={tabela.cabecalho}>
                    <tr>
                      <th className="py-2 pr-4">Vaga</th>
                      <th className="pr-4">Tipo</th>
                      <th className="pr-4">Unidade</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((v) => (
                      <tr key={v.id} className={tabela.linha}>
                        <td className={tabela.principal}>{v.numero}</td>
                        <td className={tabela.texto}>
                          <Selo cor={v.coberta ? 'azul' : 'cinza'}>{v.coberta ? 'Coberta' : 'Descoberta'}</Selo>
                        </td>
                        <td className={tabela.texto}>
                          {v.unidade ? (
                            `Bloco ${v.unidade.bloco}, apto ${v.unidade.numeroApartamento}`
                          ) : (
                            <Selo cor="verde">Livre</Selo>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          <div className="flex justify-end gap-1">
                            <BotaoIcone tipo="editar" onClick={() => editar(v)} />
                            <BotaoIcone tipo="excluir" onClick={() => setVagaParaExcluir(v)} />
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

      {vagaParaExcluir && (
        <ModalConfirmar
          titulo="Excluir vaga?"
          mensagem={`Você vai excluir a vaga "${vagaParaExcluir.numero}". Essa ação não pode ser desfeita.`}
          aoConfirmar={confirmarExclusao}
          aoCancelar={() => setVagaParaExcluir(null)}
        />
      )}
    </>
  )
}
