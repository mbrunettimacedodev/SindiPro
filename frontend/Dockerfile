# ---- Etapa 1: gera os arquivos finais do site (npm run build) ----
FROM node:20-alpine AS build
WORKDIR /app

# Endereço da API que o NAVEGADOR vai chamar. O Vite "grava" esse valor no build.
ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Etapa 2: serve o site pronto com o Nginx (servidor web leve) ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
