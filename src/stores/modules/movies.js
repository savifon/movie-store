import tmdbService from '@/services/tmdb'

export default {
  namespaced: true,

  state: () => ({
    movies: [],
    genres: [],
    query: '',
    currentPage: 0,
    totalPages: 0,
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
    SET_TOTAL_PAGES(state, total) {
      state.totalPages = total
    },
  },

  actions: {
    async fetchMovies({ dispatch, commit, state }, { isFirstRequest, page = 1 } = {}) {
      if (state.totalPages <= state.currentPage && state.totalPages > 0) return
      dispatch('loading/startLoading', null, { root: true })
      try {
        const response = await tmdbService.getMovies(page)
        const movies = response.data.results
        commit('SET_MOVIES', { movies, isFirstRequest })
        commit('SET_TOTAL_PAGES', response.data.total_pages)
      } catch (error) {
        commit('SET_MOVIES', { movies: [], isFirstRequest })
        dispatch('errors/setError', error.message, { root: true })
      }
      dispatch('loading/stopLoading', null, { root: true })
    },

    async fetchMoviesByTitle(
      { dispatch, commit, state },
      { query, isFirstRequest, page = 1 },
    ) {
      if (state.totalPages <= state.currentPage && state.totalPages > 0) return
      dispatch('loading/startLoading', null, { root: true })
      try {
        const response = await tmdbService.getMoviesByTitle(query, page)
        const movies = response.data.results
        commit('SET_MOVIES', { movies, isFirstRequest })
        commit('SET_TOTAL_PAGES', response.data.total_pages)
      } catch (error) {
        commit('SET_MOVIES', { movies: [], isFirstRequest })
        dispatch('errors/setError', error.message, { root: true })
      }
      dispatch('loading/stopLoading', null, { root: true })
    },

    async fetchGenres({ dispatch, commit }) {
      dispatch('loading/startLoading', null, { root: true })
      try {
        const response = await tmdbService.getGenres()
        const genres = response.data.genres
        commit('SET_GENRES', genres)
      } catch (error) {
        commit('SET_GENRES', [])
        dispatch('errors/setError', error.message, { root: true })
      }
      dispatch('loading/stopLoading', null, { root: true })
    },

    async setQuery({ commit }, { query }) {
      commit('SET_QUERY', query)
    },

    async setPage({ commit }, { page }) {
      if (page === 0) commit('SET_TOTAL_PAGES', 0)
      commit('SET_PAGE', page)
    },
  },

  getters: {
    movies: (state) => state.movies,
    genres: (state) => state.genres,
    query: (state) => state.query,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
  },
}
