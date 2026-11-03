package br.com.sindipro.sindipro.dto;

import jakarta.validation.constraints.NotBlank;

// DTO = "objeto de transporte": só os campos que o login precisa receber.
// record (Java 16+) cria sozinho construtor, getters, equals e toString.
public record LoginRequest(
        @NotBlank(message = "Informe o e-mail") String email,
        @NotBlank(message = "Informe a senha") String senha) {
}
