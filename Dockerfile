FROM node:20-alpine

ARG VITE_TMDB_API_KEY
ENV VITE_TMDB_API_KEY=${VITE_TMDB_API_KEY}
ENV VITE_TMDB_API_URL=https://api.themoviedb.org/3/
ENV VITE_VIACEP_API_URL=https://viacep.com.br/ws/

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npx", "vite", "preview", "--port", "3000", "--host"]