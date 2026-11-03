package br.com.sindipro.sindipro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SegurancaConfig {

    // BCrypt: transforma "admin123" em algo como "$2a$10$N9qo8u...". Não dá para desfazer;
    // no login, o BCrypt compara a senha digitada com o hash guardado.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
