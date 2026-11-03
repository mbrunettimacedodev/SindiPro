package br.com.sindipro.sindipro.controller;

import br.com.sindipro.sindipro.dto.LoginRequest;
import br.com.sindipro.sindipro.dto.UsuarioResposta;
import br.com.sindipro.sindipro.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /auth/login  { "email": "...", "senha": "..." }
    //   200 -> { id, nome, email }
    //   401 -> { status: 401, erro: "E-mail ou senha inválidos" }
    @PostMapping("/login")
    public UsuarioResposta login(@Valid @RequestBody LoginRequest pedido) {
        return authService.login(pedido);
    }
}
