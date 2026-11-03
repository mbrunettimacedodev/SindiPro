package br.com.sindipro.sindipro.service;

import br.com.sindipro.sindipro.dto.LoginRequest;
import br.com.sindipro.sindipro.dto.UsuarioResposta;
import br.com.sindipro.sindipro.exception.CredenciaisInvalidasException;
import br.com.sindipro.sindipro.model.Usuario;
import br.com.sindipro.sindipro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioResposta login(LoginRequest pedido) {
        String email = pedido.email().trim().toLowerCase();

        // Se o e-mail não existe OU a senha não confere, o erro é o MESMO (veja CredenciaisInvalidasException).
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(CredenciaisInvalidasException::new);
        if (!passwordEncoder.matches(pedido.senha(), usuario.getSenhaHash())) {
            throw new CredenciaisInvalidasException();
        }
        return UsuarioResposta.de(usuario);
    }
}
