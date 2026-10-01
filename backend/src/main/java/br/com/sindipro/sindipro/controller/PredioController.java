package br.com.sindipro.sindipro.controller;

import br.com.sindipro.sindipro.model.Predio;
import br.com.sindipro.sindipro.service.PredioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/predios")
public class PredioController {

    @Autowired
    private PredioService predioService;

    @GetMapping
    public List<Predio> listarTodos() {
        return predioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Predio buscarPorId(@PathVariable Long id) {
        return predioService.buscarPorId(id);
    }

    @PostMapping
    public Predio criar(@RequestBody Predio predio) {
        return predioService.salvar(predio);
    }

    @PutMapping("/{id}")
    public Predio atualizar(@PathVariable Long id, @RequestBody Predio predio) {
        predio.setId(id);
        return predioService.salvar(predio);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        predioService.deletar(id);
    }
}