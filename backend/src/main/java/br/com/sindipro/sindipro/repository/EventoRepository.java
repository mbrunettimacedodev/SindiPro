package br.com.sindipro.sindipro.repository;

import br.com.sindipro.sindipro.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    // Todos, do mais antigo para o mais novo ("OrderBy DataHora Asc" = ORDER BY data_hora ASC).
    List<Evento> findAllByOrderByDataHoraAsc();

    // Só os que acontecem a partir de "inicio" ("GreaterThanEqual" = >=).
    List<Evento> findByDataHoraGreaterThanEqualOrderByDataHoraAsc(LocalDateTime inicio);

    // Impede apagar um prédio que ainda tem eventos.
    boolean existsByPredioId(Long predioId);
}
