package br.com.sindipro.sindipro.controller;

import br.com.sindipro.sindipro.model.Evento;
import br.com.sindipro.sindipro.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // GET /eventos                -> todos, em ordem de data
    // GET /eventos?proximos=true  -> só de hoje em diante
    @GetMapping
    public List<Evento> listar(@RequestParam(required = false) Boolean proximos) {
        if (Boolean.TRUE.equals(proximos)) {
            return eventoService.listarProximos();
        }
        return eventoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Evento buscarPorId(@PathVariable Long id) {
        return eventoService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Evento criar(@Valid @RequestBody Evento evento) {
        return eventoService.criar(evento);
    }

    @PutMapping("/{id}")
    public Evento atualizar(@PathVariable Long id, @Valid @RequestBody Evento evento) {
        return eventoService.atualizar(id, evento);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        eventoService.deletar(id);
    }
}
