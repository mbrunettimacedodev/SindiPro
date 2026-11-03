package br.com.sindipro.sindipro.exception;

// Lançada quando e-mail ou senha estão errados no login.
// O TratadorDeExcecoes transforma isso em HTTP 401 (não autorizado).
public class CredenciaisInvalidasException extends RuntimeException {

    public CredenciaisInvalidasException() {
        // Mensagem propositalmente genérica: não contamos se o erro foi no e-mail ou na senha,
        // senão um atacante descobriria quais e-mails existem no sistema.
        super("E-mail ou senha inválidos");
    }
}
