# ---- Etapa 1: compila o projeto com Maven (essa imagem não vai para a versão final) ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copia primeiro só o pom.xml e baixa as dependências: o Docker guarda essa etapa em cache,
# então nas próximas builds ele só recompila o código, sem baixar tudo de novo.
COPY pom.xml .
RUN mvn -q -B dependency:go-offline

COPY src ./src
RUN mvn -q -B package -DskipTests

# ---- Etapa 2: imagem final, só com o Java e o .jar (bem menor) ----
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
