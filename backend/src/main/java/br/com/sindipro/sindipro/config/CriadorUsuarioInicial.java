package br.com.sindipro.sindipro.config;

import br.com.sindipro.sindipro.model.Usuario;
import br.com.sindipro.sindipro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// CommandLineRunner = código que roda UMA vez, logo depois que a aplicação sobe.
// Se ainda não existe nenhum usuário, cria o administrador. Assim ninguém fica trancado fora
// do sistema na primeira execução (nem você, nem o professor).
@Component
public class CriadorUsuarioInicial implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // Lidos do application.properties (sindipro.admin.email / sindipro.admin.senha).
    @Value("${sindipro.admin.email}")
    private String emailAdmin;

    @Value("${sindipro.admin.senha}")
    private String senhaAdmin;

    public CriadorUsuarioInicial(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            usuarioRepository.save(new Usuario("Administrador", emailAdmin.trim().toLowerCase(),
                    passwordEncoder.encode(senhaAdmin)));
            System.out.println(">>> Usuário inicial criado: " + emailAdmin + " (troque a senha padrão!)");
        }
    }
}
