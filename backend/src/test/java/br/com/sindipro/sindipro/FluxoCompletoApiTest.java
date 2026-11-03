package br.com.sindipro.sindipro;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Teste que usa a API de verdade (com banco H2 em memória, perfil "h2"):
// cria prédio -> unidade -> morador -> encomenda e confere as regras de negócio.
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2")
class FluxoCompletoApiTest {

    @Autowired
    private MockMvc mvc;

    private static final String PREDIO = """
            {"rua":"Rua A","bairro":"Centro","cidade":"Novo Hamburgo","cep":"93510-000",
             "nomeCondominio":"Aurora","numeroCondominio":10}""";

    private static final String UNIDADE = """
            {"bloco":"A","andar":1,"numeroApartamento":101,"predio":{"id":1}}""";

    private static final String MORADOR = """
            {"nome":"Maria","cpf":"111.222.333-44","email":"maria@email.com","idade":40,"tipo":"PROPRIETARIO","unidade":{"id":1}}""";

    @Test
    void fluxoCompleto() throws Exception {
        // 1) Cria prédio -> 201 Created
        mvc.perform(post("/predios").contentType(MediaType.APPLICATION_JSON).content(PREDIO))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));

        // 2) Dado inválido (rua vazia) -> 400 com mensagem por campo
        mvc.perform(post("/predios").contentType(MediaType.APPLICATION_JSON)
                        .content(PREDIO.replace("Rua A", "")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.campos.rua").value("A rua é obrigatória"));

        // 3) Id que não existe -> 404
        mvc.perform(get("/predios/999")).andExpect(status().isNotFound());

        // 4) Cria unidade ligada ao prédio 1 e confere que o prédio veio completo na resposta
        mvc.perform(post("/unidades").contentType(MediaType.APPLICATION_JSON).content(UNIDADE))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.predio.nomeCondominio").value("Aurora"));

        // 5) Unidade apontando para prédio inexistente -> 404 (e não 500 de foreign key)
        mvc.perform(post("/unidades").contentType(MediaType.APPLICATION_JSON)
                        .content(UNIDADE.replace("\"id\":1", "\"id\":77")))
                .andExpect(status().isNotFound());

        // 6) Cria morador
        mvc.perform(post("/moradores").contentType(MediaType.APPLICATION_JSON).content(MORADOR))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.temPosse").value(true));

        // 7) CPF repetido (mesmo escrito sem pontuação) -> 409
        mvc.perform(post("/moradores").contentType(MediaType.APPLICATION_JSON)
                        .content(MORADOR.replace("111.222.333-44", "11122233344")))
                .andExpect(status().isConflict());

        // 8) Inquilino sem aluguel -> 409
        mvc.perform(post("/moradores").contentType(MediaType.APPLICATION_JSON)
                        .content(MORADOR.replace("PROPRIETARIO", "INQUILINO").replace("111.222.333-44", "555.666.777-88")))
                .andExpect(status().isConflict());

        // 9) Não pode apagar prédio com unidades nem unidade com moradores -> 409
        mvc.perform(delete("/predios/1")).andExpect(status().isConflict());
        mvc.perform(delete("/unidades/1")).andExpect(status().isConflict());

        // 10) Vaga livre (sem unidade) e vaga ligada à unidade
        mvc.perform(post("/vagas").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"numero\":\"V03\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.coberta").value(false));
        mvc.perform(post("/vagas").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"numero\":\"V01\",\"coberta\":true,\"unidade\":{\"id\":1}}"))
                .andExpect(status().isCreated());
        mvc.perform(get("/vagas?unidadeId=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));

        // 11) Encomenda: nasce pendente, é retirada uma vez, na segunda vez dá 409
        mvc.perform(post("/encomendas").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"descricao\":\"Caixa\",\"morador\":{\"id\":1}}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.dataRecebimento").exists())
                .andExpect(jsonPath("$.dataRetirada").doesNotExist());
        mvc.perform(get("/encomendas?pendentes=true"))
                .andExpect(jsonPath("$.length()").value(1));
        mvc.perform(put("/encomendas/1/retirar"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataRetirada").exists());
        mvc.perform(put("/encomendas/1/retirar")).andExpect(status().isConflict());
        mvc.perform(get("/encomendas?pendentes=true"))
                .andExpect(jsonPath("$.length()").value(0));

        // 12) Morador com encomenda não pode ser apagado
        mvc.perform(delete("/moradores/1")).andExpect(status().isConflict());

        // 13) E-mail: obrigatório, válido e sem repetir
        mvc.perform(post("/moradores").contentType(MediaType.APPLICATION_JSON)
                        .content(MORADOR.replace("\"email\":\"maria@email.com\",", "").replace("111.222.333-44", "555.666.777-88")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.campos.email").value("O e-mail é obrigatório"));
        mvc.perform(post("/moradores").contentType(MediaType.APPLICATION_JSON)
                        .content(MORADOR.replace("111.222.333-44", "555.666.777-88")))
                .andExpect(status().isConflict()); // mesmo e-mail da Maria

        // 14) O CPF não pode ser alterado; o e-mail pode (e é salvo em minúsculas)
        mvc.perform(put("/moradores/1").contentType(MediaType.APPLICATION_JSON)
                        .content(MORADOR.replace("111.222.333-44", "999.888.777-66")))
                .andExpect(status().isConflict());
        mvc.perform(put("/moradores/1").contentType(MediaType.APPLICATION_JSON)
                        .content(MORADOR.replace("maria@email.com", "Maria.Nova@Email.com")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cpf").value("111.222.333-44"))
                .andExpect(jsonPath("$.email").value("maria.nova@email.com"));

        // 15) Login: o admin é criado ao subir a aplicação. Senha errada -> 401, sem dizer o motivo
        mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"admin@sindipro.com\",\"senha\":\"admin123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Administrador"))
                .andExpect(jsonPath("$.senhaHash").doesNotExist()); // a senha nunca volta na resposta
        mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"admin@sindipro.com\",\"senha\":\"errada\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.erro").value("E-mail ou senha inválidos"));

        // 16) Eventos: um passado e um futuro; "proximos=true" só traz o futuro
        mvc.perform(post("/eventos").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"Assembleia\",\"local\":\"Salão\",\"dataHora\":\"2099-01-10T19:00\",\"predio\":{\"id\":1}}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.predio.nomeCondominio").value("Aurora"));
        mvc.perform(post("/eventos").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"Festa antiga\",\"local\":\"Salão\",\"dataHora\":\"2020-01-10T19:00\",\"predio\":{\"id\":1}}"))
                .andExpect(status().isCreated());
        mvc.perform(get("/eventos")).andExpect(jsonPath("$.length()").value(2));
        mvc.perform(get("/eventos?proximos=true"))
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].titulo").value("Assembleia"));

        // 17) Evento sem título nem data -> 400 com erro por campo
        mvc.perform(post("/eventos").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"local\":\"Salão\",\"predio\":{\"id\":1}}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.campos.titulo").exists())
                .andExpect(jsonPath("$.campos.dataHora").exists());
    }
}
