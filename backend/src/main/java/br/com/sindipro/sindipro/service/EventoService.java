package br.com.sindipro.sindipro.service;

import br.com.sindipro.sindipro.exception.RecursoNaoEncontradoException;
import br.com.sindipro.sindipro.exception.RegraNegocioException;
import br.com.sindipro.sindipro.model.Evento;
import br.com.sindipro.sindipro.model.Predio;
import br.com.sindipro.sindipro.repository.EventoRepository;
import br.com.sindipro.sindipro.repository.PredioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private PredioRepository predioRepository;

    public List<Evento> listarTodos() {
        return eventoRepository.findAllByOrderByDataHoraAsc();
    }

    // "Próximos" = de HOJE 00:00 em diante. Assim um evento de hoje de manhã ainda aparece à tarde.
    public List<Evento> listarProximos() {
        return eventoRepository.findByDataHoraGreaterThanEqualOrderByDataHoraAsc(LocalDate.now().atStartOfDay());
    }

    public Evento buscarPorId(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento " + id + " não encontrado"));
    }

    public Evento criar(Evento evento) {
        evento.setId(null);
        carregarPredio(evento);
        return eventoRepository.save(evento);
    }

    public Evento atualizar(Long id, Evento dados) {
        buscarPorId(id);
        dados.setId(id);
        carregarPredio(dados);
        return eventoRepository.save(dados);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        eventoRepository.deleteById(id);
    }

    // Mesma receita do Morador/Unidade: o JSON traz só { "id": 1 }, aqui buscamos o prédio completo.
    private void carregarPredio(Evento evento) {
        Long predioId = evento.getPredio().getId();
        if (predioId == null) {
            throw new RegraNegocioException("Informe o id do prédio: \"predio\": { \"id\": 1 }");
        }
        Predio predio = predioRepository.findById(predioId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Prédio " + predioId + " não encontrado"));
        evento.setPredio(predio);
    }
}
