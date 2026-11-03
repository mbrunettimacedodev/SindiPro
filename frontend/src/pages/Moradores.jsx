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

const FORM_VAZIO = {
  nome: '',
  cpf: '',
  email: '',
  idade: '',
  tipo: 'PROPRIETARIO',
  valorAluguel: '',
  unidadeId: '',
}

export default function Moradores() {
  const [moradores, setMoradores] = useState([])
  const [unidades, setUnidades] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [erro, setErro] = useState('')
  const [campos, setCampos] = useState({})
  const [sucesso, setSucesso] = useState('')
  const [busca, setBusca] = useState('')
  const [moradorParaExcluir, setMoradorParaExcluir] = useState(null)

  async function carregar() {
    setCarregando(true)
    try {
      const [listaMoradores, listaUnidades] = await Promise.all([api.get('/moradores'), api.get('/unidades')])
      setMoradores(listaMoradores)
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

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setCampos({})
    setSucesso('')
    const corpo = {
      nome: form.nome,
      cpf: form.cpf,
      email: form.email.trim().toLowerCase(),
      idade: Number(form.idade),
      tipo: form.tipo,
      // Só inquilino tem aluguel. Para proprietário mandamos null (o backend também garante isso).
      valorAluguel: form.tipo === 'INQUILINO' && form.valorAluguel !== '' ? Number(form.valorAluguel) : null,
      unidade: form.unidadeId ? { id: Number(form.unidadeId) } : null,
    }
    try {
      if (editandoId) {
        await api.put(`/moradores/${editandoId}`, corpo)
      } else {
        await api.post('/moradores', corpo)
      }
      setSucesso(editandoId ? 'Morador atualizado!' : 'Morador cadastrado!')
      cancelar()
      carregar()
    } catch (e) {
      // Ex.: "Já existe um morador cadastrado com o CPF 111.222.333-44"
      setErro(e.message)
      setCampos(e.campos || {})
    }
  }

  function editar(m) {
    setEditandoId(m.id)
    setForm({
      nome: m.nome,
      cpf: m.cpf,
      email: m.email ?? '', // ?? troca null por '' (input não aceita null)
      idade: m.idade,
      tipo: m.tipo,
      valorAluguel: m.valorAluguel ?? '',
      unidadeId: m.unidade.id,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelar() {
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  async function confirmarExclusao() {
    const morador = moradorParaExcluir
    setMoradorParaExcluir(null)
    setErro('')
    setSucesso('')
    try {
      await api.delete(`/moradores/${morador.id}`)
      setSucesso('Morador excluído.')
      carregar()
    } catch (e) {
      // Ex.: "o morador ainda possui encomendas registradas"
      setErro(e.message)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const visiveis = filtrar(
    moradores,
    busca,
    (m) =>
      `${m.nome} ${m.cpf} ${m.email ?? ''} ${m.tipo === 'INQUILINO' ? 'inquilino' : 'proprietario'} bloco ${
        m.unidade?.bloco
      } apto ${m.unidade?.numeroApartamento}`,
  )
  const contador = busca.trim() ? `${visiveis.length} de ${moradores.length}` : moradores.length

  return (
    <>
      <Aviso tipo="erro">{erro}</Aviso>
      <Aviso tipo="sucesso">{sucesso}</Aviso>

      <Cartao titulo={editandoId ? 'Editar morador' : 'Novo morador'}>
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Nome" erro={campos.nome}>
            <input name="nome" value={form.nome} onChange={mudar} className={estiloInput} />
          </Campo>
          {/* O CPF identifica o morador: depois de cadastrado não muda. O e-mail fica atrelado a ele e pode ser trocado. */}
          <Campo rotulo={editandoId ? 'CPF (não pode ser alterado)' : 'CPF'} erro={campos.cpf}>
            <input
              name="cpf"
              value={form.cpf}
              onChange={mudar}
              placeholder="000.000.000-00"
              disabled={!!editandoId}
              className={estiloInput}
            />
          </Campo>
          <Campo rotulo="E-mail" erro={campos.email}>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={mudar}
              placeholder="morador@email.com"
              className={estiloInput}
            />
          </Campo>
          <Campo rotulo="Idade" erro={campos.idade}>
            <input name="idade" type="number" value={form.idade} onChange={mudar} className={estiloInput} />
          </Campo>
          <Campo rotulo="Unidade" erro={campos.unidade}>
            <select name="unidadeId" value={form.unidadeId} onChange={mudar} className={estiloInput}>
              <option value="">Selecione...</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.predio.nomeCondominio} — bloco {u.bloco}, apto {u.numeroApartamento}
                </option>
              ))}
            </select>
          </Campo>
          <Campo rotulo="Tipo" erro={campos.tipo}>
            <select name="tipo" value={form.tipo} onChange={mudar} className={estiloInput}>
              <option value="PROPRIETARIO">Proprietário</option>
              <option value="INQUILINO">Inquilino</option>
            </select>
          </Campo>
          {/* Renderização condicional: o campo só existe na tela se o tipo for INQUILINO. */}
          {form.tipo === 'INQUILINO' && (
            <Campo rotulo="Valor do aluguel (R$)" erro={campos.valorAluguel}>
              <input
                name="valorAluguel"
                type="number"
                step="0.01"
                value={form.valorAluguel}
                onChange={mudar}
                className={estiloInput}
              />
            </Campo>
          )}
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

      <Cartao titulo={`Moradores cadastrados (${contador})`}>
        {carregando ? (
          <Carregando />
        ) : moradores.length === 0 ? (
          <SemRegistros>Nenhum morador cadastrado ainda.</SemRegistros>
        ) : (
          <>
            <BarraFiltro
              busca={busca}
              aoBuscar={setBusca}
              placeholder="Pesquisar por nome, CPF, e-mail, tipo, bloco ou apto..."
            />

            {visiveis.length === 0 ? (
              <SemRegistros>Nenhum morador encontrado para "{busca}".</SemRegistros>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={tabela.cabecalho}>
                    <tr>
                      <th className="py-2 pr-4">Nome</th>
                      <th className="pr-4">CPF</th>
                      <th className="pr-4">Tipo</th>
                      <th className="pr-4">Unidade</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((m) => (
                      <tr key={m.id} className={tabela.linha}>
                        <td className={tabela.principal}>
                          {m.nome}
                          <span className={`block ${tabela.apagado}`}>{m.email || 'sem e-mail'}</span>
                        </td>
                        <td className={`${tabela.texto} whitespace-nowrap`}>{m.cpf}</td>
                        <td className={tabela.texto}>
                          {m.tipo === 'INQUILINO' ? (
                            <>
                              <Selo cor="amarelo">Inquilino</Selo>
                              <span className={`block ${tabela.apagado}`}>
                                R$ {Number(m.valorAluguel).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <Selo cor="azul">Proprietário</Selo>
                          )}
                        </td>
                        <td className={tabela.texto}>
                          Bloco {m.unidade.bloco}, apto {m.unidade.numeroApartamento}
                        </td>
                        <td className="py-2 text-right">
                          <div className="flex justify-end gap-1">
                            <BotaoIcone tipo="editar" onClick={() => editar(m)} />
                            <BotaoIcone tipo="excluir" onClick={() => setMoradorParaExcluir(m)} />
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

      {moradorParaExcluir && (
        <ModalConfirmar
          titulo="Excluir morador?"
          mensagem={`Você vai excluir "${moradorParaExcluir.nome}". Essa ação não pode ser desfeita.`}
          aoConfirmar={confirmarExclusao}
          aoCancelar={() => setMoradorParaExcluir(null)}
        />
      )}
    </>
  )
}
