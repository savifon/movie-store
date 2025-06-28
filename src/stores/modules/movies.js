import tmdbService from '@/services/tmdb'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    genres: [],
    movie: null,
  }),
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
    SET_MOVIE(state, movie) {
      state.movie = movie
    },
    SET_GENRES(state, genres) {
      state.genres = genres
    },
  },
  actions: {
    async fetchMovies({ dispatch, commit }, { page = 1 } = {}) {
      dispatch('loading/startLoading', null, { root: true })
      const response = await tmdbService.getMovies(page)
      const movies = response.data.results
      commit('SET_MOVIES', movies)
      dispatch('loading/stopLoading', null, { root: true })
    },
    async fetchMoviesByTitle({ dispatch, commit }, { name, page = 1 }) {
      dispatch('loading/startLoading', null, { root: true })
      const response = await tmdbService.getMoviesByTitle(name, page)
      const movies = response.data.results
      commit('SET_MOVIES', movies)
      dispatch('loading/stopLoading', null, { root: true })
    },
    async fetchGenres({ dispatch, commit }) {
      dispatch('loading/startLoading', null, { root: true })
      const response = await tmdbService.getGenres()
      const genres = response.data.genres
      commit('SET_GENRES', genres)
      dispatch('loading/stopLoading', null, { root: true })
    },
  },
  getters: {
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    genres: (state) => state.genres,
  },
}
