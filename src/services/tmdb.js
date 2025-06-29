import axios from 'axios'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

const defaultQuery = {
  include_adult: false,
  language: 'pt-BR',
}

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: apiKey,
  },
})

export default {
  async getMovies(page) {
    return tmdb.get('trending/movie/week', { params: { ...defaultQuery, page } })
  },
  async getMoviesByTitle(query, page) {
    return tmdb.get('search/movie', { params: { ...defaultQuery, query, page } })
  },
  async getGenres() {
    return tmdb.get('genre/movie/list', { params: { language: 'pt' } })
  },
}
