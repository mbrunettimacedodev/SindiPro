package br.com.sindipro.sindipro.controller;

import br.com.sindipro.sindipro.dto.LoginRequest;
import br.com.sindipro.sindipro.dto.UsuarioResposta;
import br.com.sindipro.sindipro.service.AuthService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Autenticação", description = "Login de usuários do sistema")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /auth/login  { "email": "...", "senha": "..." }
    //   200 -> { id, nome, email }
    //   401 -> { status: 401, erro: "E-mail ou senha inválidos" }
    @Operation(summary = "Faz login", description = "Devolve id, nome e e-mail se o e-mail e a senha conferem. Senha errada: 401.")
    @PostMapping("/login")
    public UsuarioResposta login(@Valid @RequestBody LoginRequest pedido) {
        return authService.login(pedido);
    }
}
