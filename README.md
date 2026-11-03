# 🏢 SindiPro

> Sistema de gestão condominial para síndicos — projeto final do bootcamp **+PraTI Fullstack**.

![Status](https://img.shields.io/badge/status-v1.0.0-brightgreen)
![Java](https://img.shields.io/badge/Java-17+-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4-6DB33F?logo=springboot)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)

## 🔗 Links

| Recurso | Link |
|---|---|
| 📦 Repositório | https://github.com/mbrunettimacedodev/SindiPro |
| 🖥️ Sistema (rodando localmente) | http://localhost:5173 |
| 📘 Documentação da API (Swagger) | http://localhost:8080/swagger-ui.html |
| 📄 Especificação OpenAPI (JSON) | http://localhost:8080/v3/api-docs |

> Os links `localhost` funcionam depois de subir o projeto (veja [Como executar](#-como-executar-passo-a-passo)).

## 📌 Sobre o projeto

O **SindiPro** é uma aplicação web fullstack que centraliza a administração de um condomínio em um único painel. O síndico consegue organizar prédios, andares e unidades, manter o cadastro de moradores, controlar vagas de garagem, registrar encomendas recebidas na portaria e agendar eventos do condomínio.

O objetivo é substituir planilhas e anotações soltas por um sistema simples, organizado e acessível pelo navegador.

## 🎓 Contexto acadêmico

Projeto desenvolvido como **trabalho final do bootcamp +PraTI Fullstack**, aplicando na prática os conteúdos do curso:

- Desenvolvimento de **API REST** em Java com Spring Boot
- Modelagem e persistência de dados em banco relacional (PostgreSQL + JPA)
- Construção de interfaces com **React** e estilização com framework CSS
- Integração frontend ↔ backend e consumo de APIs
- Versionamento com Git e boas práticas de organização de código

## ✨ Funcionalidades

- [x] Cadastro de **prédios** (blocos/torres)
- [x] Cadastro de **unidades** por prédio e andar
- [x] Cadastro de **moradores** vinculados às unidades, com e-mail atrelado ao CPF
- [x] Controle de **vagas de garagem** por unidade
- [x] Registro e baixa de **encomendas** da portaria
- [x] Agenda de **eventos** do condomínio
- [x] Painel com visão geral do condomínio
- [x] **Login** com senha criptografada (BCrypt) e logout
- [x] **Tema escuro**
- [x] Documentação da API com **Swagger**
- [x] Ambiente completo com **Docker** (banco + backend + frontend)

## 🛠️ Tecnologias

| Camada | Tecnologias |
|---|---|
| **Backend** | Java 17+, Spring Boot 4, Spring Data JPA, Bean Validation, BCrypt, Maven |
| **Documentação da API** | Swagger / OpenAPI (springdoc) |
| **Banco de dados** | PostgreSQL 16 |
| **Frontend** | React, Vite, Tailwind CSS |
| **Infraestrutura** | Docker, Docker Compose, Nginx |
| **Testes** | JUnit, MockMvc, H2 (banco em memória) |
| **Ferramentas** | Git, GitHub, IntelliJ IDEA |

## 🗂️ Estrutura do repositório

```
SindiPro/
├── backend/             # API REST (Java + Spring Boot)
│   ├── src/main/java/   # config, controller, dto, exception, model, repository, service
│   ├── src/test/java/   # teste de fluxo completo da API
│   ├── sql/             # scripts do banco (schema + dados de exemplo)
│   └── Dockerfile
├── frontend/            # Interface web (React + Vite + Tailwind)
│   ├── src/pages/       # uma tela por arquivo (Painel, Prédios, Eventos, Login...)
│   ├── src/components/  # peças reaproveitadas (botões, cartões, modal...)
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml   # sobe banco + backend + frontend
```

## 🧩 Modelo de domínio

```
Predio 1 ── N Unidade 1 ── N Morador 1 ── N Encomenda
   │              │
   │              └── N VagaGaragem
   └── N Evento

Usuario (login do sistema, independente dos moradores)
```

## 🚀 Como executar (passo a passo)

Há dois jeitos. **O jeito rápido (Docker) é o recomendado para avaliar o projeto**:
só precisa do Git e do Docker, sem instalar Java, Node ou IDE.

### ⚡ Jeito rápido: tudo no Docker

1. Instale o **[Git](https://git-scm.com/downloads)** e o **[Docker Desktop](https://www.docker.com/products/docker-desktop)** e abra o Docker Desktop
   (espere aparecer **"Engine running"**).
2. No terminal:

```bash
git clone https://github.com/mbrunettimacedodev/SindiPro.git
cd SindiPro
docker compose up -d --build
```

3. Na primeira vez a build leva alguns minutos (baixa as dependências do Java e do Node). Confira com `docker ps`:
   devem aparecer `sindipro-banco`, `sindipro-backend` e `sindipro-frontend`.
4. Acesse:
   - **Sistema:** http://localhost:5173 (login `admin@sindipro.com` / senha `admin123`)
   - **Swagger:** http://localhost:8080/swagger-ui.html

Para desligar: `docker compose down`. Para zerar o banco e voltar aos dados de exemplo: `docker compose down -v`.

> Se o backend ainda não respondeu logo após subir, espere uns segundos: ele aguarda o banco ficar pronto.
> Para acompanhar: `docker compose logs -f backend`.

---

### 🛠️ Jeito manual: para desenvolver

Use este caminho para editar o código (o backend roda no IntelliJ e o frontend no `npm`; só o banco fica no Docker).

#### 1. Instale os programas necessários

Instale apenas o que ainda não tiver. Depois de instalar, **feche e abra de novo** o terminal.

| Programa | Para quê | Onde baixar | Como conferir no terminal |
|---|---|---|---|
| **Git** | baixar o repositório | https://git-scm.com/downloads | `git --version` |
| **Docker Desktop** | rodar o banco PostgreSQL | https://www.docker.com/products/docker-desktop | `docker --version` |
| **Java 17 ou mais novo** (JDK) | rodar o backend | https://adoptium.net | `java -version` |
| **Node.js 18 ou mais novo** (versão LTS) | rodar o frontend | https://nodejs.org | `node -v` |
| **IntelliJ IDEA** (Community é gratuito) | abrir e rodar o backend | https://www.jetbrains.com/idea/download | — |

> **Windows:** o Docker Desktop precisa do **WSL 2**. Se a instalação reclamar de *"Virtual Machine Platform"*,
> abra o PowerShell **como administrador**, rode `wsl --install`, reinicie o computador e instale o Docker de novo.

#### 2. Baixe o repositório

Abra um terminal (no Windows: PowerShell) e rode:

```bash
git clone https://github.com/mbrunettimacedodev/SindiPro.git
cd SindiPro
```

> Sem Git? Na página do repositório, clique em **Code → Download ZIP**, extraia e abra o terminal dentro da pasta extraída.

#### 3. Suba o banco de dados

1. Abra o **Docker Desktop** e espere aparecer **"Engine running"**.
2. No terminal, **dentro da pasta do projeto** (onde está o arquivo `docker-compose.yml`), suba **só o banco**:

```bash
docker compose up -d banco
```

3. Confira se subiu:

```bash
docker ps
```

Deve aparecer `sindipro-banco` com o status **(healthy)**.
Na primeira vez o banco já é criado com todas as tabelas e alguns dados de exemplo.

#### 4. Rode o backend (API)

1. Abra o **IntelliJ IDEA** → **Open** → selecione a pasta **`backend`** do projeto.
2. Espere o IntelliJ terminar de baixar as dependências (barra de progresso no rodapé).
3. Abra o arquivo `src/main/java/br/com/sindipro/sindipro/SindiproApplication.java`
   e clique no **▶ verde** ao lado de `public class SindiproApplication`.
4. No console, procure por:

```
Started SindiproApplication in X seconds
>>> Usuário inicial criado: admin@sindipro.com
```

A API fica em **http://localhost:8080**. Deixe o IntelliJ aberto e rodando.

> Tem o Maven instalado? Também dá para rodar pelo terminal: `cd backend` e `mvn spring-boot:run`.

#### 5. Rode o frontend (site)

Abra **outro** terminal, na pasta do projeto, e rode:

```bash
cd frontend
npm install
npm run dev
```

O `npm install` só é necessário na primeira vez. Quando aparecer `Local: http://localhost:5173/`, o site está no ar.

#### 6. Acesse o sistema

Abra **http://localhost:5173** no navegador e entre com:

| E-mail | Senha |
|---|---|
| `admin@sindipro.com` | `admin123` |

Pronto! O condomínio de exemplo **Residencial Aurora** já aparece com unidades, moradores, vagas, encomendas e eventos.

### Para desligar e religar depois

- **Desligar:** pare o backend no IntelliJ (■ vermelho), aperte `Ctrl + C` no terminal do frontend e rode `docker compose stop banco`.
- **Religar:** `docker compose start banco`, ▶ no IntelliJ e `npm run dev` no frontend.
- **Zerar o banco** (apaga tudo e volta aos dados de exemplo): `docker compose down -v` e depois `docker compose up -d`.

### Problemas comuns

| Mensagem | Causa e solução |
|---|---|
| `'vite' não é reconhecido como um comando` | Faltou o `npm install` dentro da pasta `frontend`. |
| `Não foi possível conectar à API. O backend está rodando?` | O backend não está rodando (passo 4) ou ainda está iniciando. |
| `Connection to localhost:5432 refused` no console do backend | O banco não está rodando: abra o Docker Desktop e rode `docker compose up -d`. |
| `port is already allocated` (porta 5432) ao subir o banco | Já existe um PostgreSQL instalado usando a porta 5432. Pare esse serviço ou troque a porta no `docker-compose.yml` e no `DB_URL`. |
| `Port 8080 was already in use` | Outro programa usa a porta 8080: feche-o ou pare outra execução do backend. Atenção: não rode o backend no IntelliJ e no Docker ao mesmo tempo. |
| `docker: command not found` / `não é reconhecido` | O Docker Desktop não está instalado ou não está aberto. |
| Erro de versão do Java ao rodar o backend | Instale o JDK 17+ e, no IntelliJ, selecione-o em **File → Project Structure → SDK**. |

### Configuração (opcional)

O backend já vem apontando para o banco do Docker, então **não precisa configurar nada**.
Para usar outro banco (ex.: Supabase), copie `backend/segredos.properties.example` para `backend/segredos.properties`
e preencha `DB_URL`, `DB_USER` e `DB_PASSWORD`. Esse arquivo está no `.gitignore` e não vai para o GitHub.

### Testes automatizados

```bash
cd backend
mvn test
```

Ou, no IntelliJ: clique com o botão direito em `src/test/java` → **Run 'All Tests'**.
Os testes usam um banco em memória (H2) e não precisam do Docker.

## 📘 Documentação da API (Swagger)

Com o backend rodando, acesse **http://localhost:8080/swagger-ui.html**. Lá estão todos os endpoints,
com os campos de cada requisição, e dá para testar direto pelo navegador (botão **Try it out**).

Resumo dos endpoints:

| Recurso | Endpoints |
|---|---|
| Autenticação | `POST /auth/login` |
| Prédios | `GET/POST /predios` · `GET/PUT/DELETE /predios/{id}` |
| Unidades | `GET/POST /unidades` · `GET/PUT/DELETE /unidades/{id}` |
| Moradores | `GET/POST /moradores` (`?unidadeId=`) · `GET/PUT/DELETE /moradores/{id}` |
| Vagas | `GET/POST /vagas` (`?unidadeId=`) · `GET/PUT/DELETE /vagas/{id}` |
| Encomendas | `GET/POST /encomendas` (`?pendentes=true`, `?unidadeId=`) · `GET/PUT/DELETE /encomendas/{id}` · `PUT /encomendas/{id}/retirar` |
| Eventos | `GET/POST /eventos` (`?proximos=true`) · `GET/PUT/DELETE /eventos/{id}` |

Erros sempre voltam no mesmo formato: `{ "status": 409, "erro": "mensagem", "campos": { ... } }`
(400 = dados inválidos, 401 = login inválido, 404 = não encontrado, 409 = regra de negócio).

## 👨‍💻 Autor

**Matheus Brunetti Macedo**
Estudante de Análise e Desenvolvimento de Sistemas e do bootcamp +PraTI Fullstack.

[![GitHub](https://img.shields.io/badge/GitHub-mbrunettimacedodev-181717?logo=github)](https://github.com/mbrunettimacedodev)
