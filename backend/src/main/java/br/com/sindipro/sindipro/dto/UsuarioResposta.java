package br.com.sindipro.sindipro.dto;

import br.com.sindipro.sindipro.model.Usuario;

// O que a API devolve sobre o usuário logado. Repare: NÃO tem senha nem hash.
public record UsuarioResposta(Long id, String nome, String email) {

    public static UsuarioResposta de(Usuario usuario) {
        return new UsuarioResposta(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}
