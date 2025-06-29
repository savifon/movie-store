# Movie Store 🎬

A **Movie Store** é uma plataforma de e-commerce (fictício) voltada para a venda de filmes. Desenvolvida com Vue 3, Vuex e TailwindCSS, a aplicação consome dados em tempo real da API pública da TMDb e oferece funcionalidades completas como carrinho de compras, checkout e sistema de favoritos.

## 🔗 Acesso Online

[➡️ Clique aqui para acessar o sistema](https://dot-movie-store.netlify.app/)

## 🚀 Principais Funcionalidades

- Pesquisa de filmes
- Carrinho de compras com persistência de estado
- Sistema de favoritos por usuário
- Checkout com formulário validado e máscara de campos
- Modal de sucesso personalizado após finalização da compra
- Integração com a API TMDb para dados reais de filmes

## 🛠️ Principais Tecnologias Utilizadas

- Vue 3 + Composition API
- Vue Router e Vuex
- TailwindCSS
- Axios
- v-mask
- Docker

## 📦 Instalação Local

### Requisitos

📄 **Importante:** É necessário criar o arquivo `.env` na raiz do projeto com base no arquivo `.env.example` e preencher sua chave da API TMDb.

- Node.js 20+

```bash
# Clone o repositório
https://github.com/savifon/movie-store.git

# Acesse a pasta
cd movie-store

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

### Usando Docker

📄 **Importante:** É necessário substituir `SUA_CHAVE_AQUI` no script abaixo pela sua chave da API TMDb.

```bash
# Build da imagem
docker build --build-arg VITE_TMDB_API_KEY='SUA_CHAVE_AQUI' -t movie-store .

# Execute o container na porta 3000
docker run -p 3000:3000 --name movie-store movie-store
```
