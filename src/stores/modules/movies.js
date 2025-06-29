import tmdbService from '@/services/tmdb'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    genres: [],
    query: '',
    currentPage: 0,
  }),
  mutations: {
    SET_MOVIES(state, { movies, isFirstRequest }) {
      state.movies = isFirstRequest ? movies : [...state.movies, ...movies]
    },
    SET_GENRES(state, genres) {
      state.genres = genres
    },
    SET_QUERY(state, query) {
      state.query = query
    },
    SET_PAGE(state, page) {
      state.currentPage = page
    },
  },
  actions: {
    async fetchMovies({ dispatch, commit }, { isFirstRequest, page = 1 } = {}) {
      dispatch('loading/startLoading', null, { root: true })
      const response = await tmdbService.getMovies(page)
      const movies = response.data.results
      commit('SET_MOVIES', { movies, isFirstRequest })
      dispatch('loading/stopLoading', null, { root: true })
    },
    async fetchMoviesByTitle({ dispatch, commit }, { query, isFirstRequest, page = 1 }) {
      dispatch('loading/startLoading', null, { root: true })
      const response = await tmdbService.getMoviesByTitle(query, page)
      const movies = response.data.results
      commit('SET_MOVIES', { movies, isFirstRequest })
      dispatch('loading/stopLoading', null, { root: true })
    },
    async fetchGenres({ dispatch, commit }) {
      dispatch('loading/startLoading', null, { root: true })
      const response = await tmdbService.getGenres()
      const genres = response.data.genres
      commit('SET_GENRES', genres)
      dispatch('loading/stopLoading', null, { root: true })
    },
    async setQuery({ commit }, { query }) {
      commit('SET_QUERY', query)
    },
    async setPage({ commit }, { page }) {
      commit('SET_PAGE', page)
    },
  },
  getters: {
    movies: (state) => state.movies,
    genres: (state) => state.genres,
    query: (state) => state.query,
    currentPage: (state) => state.currentPage,
  },
}
