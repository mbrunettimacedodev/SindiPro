package br.com.sindipro.sindipro.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Swagger: o springdoc lê os controllers e monta sozinho a página de documentação da API.
// Aqui só preenchemos o "cabeçalho" que aparece no topo da página.
//   Página interativa: http://localhost:8080/swagger-ui.html
//   JSON (OpenAPI):    http://localhost:8080/v3/api-docs
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI sindiproOpenApi() {
        return new OpenAPI().info(new Info()
                .title("SindiPro API")
                .version("1.0.0")
                .description("API REST do SindiPro: gestão de prédios, unidades, moradores, "
                        + "vagas de garagem, encomendas e eventos de condomínio.")
                .contact(new Contact()
                        .name("Matheus Brunetti Macedo")
                        .url("https://github.com/mbrunettimacedodev")));
    }
}
