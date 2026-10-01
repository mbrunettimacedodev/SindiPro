package br.com.sindipro.sindipro.service;

import br.com.sindipro.sindipro.model.Predio;
import br.com.sindipro.sindipro.repository.PredioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredioService {

    @Autowired
    private PredioRepository predioRepository;

    public List<Predio> listarTodos() {
        return predioRepository.findAll();
    }

    public Predio buscarPorId(Long id) {
        return predioRepository.findById(id).orElse(null);
    }

    public Predio salvar(Predio predio) {
        return predioRepository.save(predio);
    }

    public void deletar(Long id) {
        predioRepository.deleteById(id);
    }
}