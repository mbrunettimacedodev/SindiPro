package br.com.sindipro.sindipro.repository;

import br.com.sindipro.sindipro.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Optional = "pode vir vazio" (e-mail não cadastrado). Obriga quem chama a tratar esse caso.
    Optional<Usuario> findByEmail(String email);
}
