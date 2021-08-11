import { Actions, Getters, Mutations } from '~/constants'
import { mapKeys } from '~/utils/objects'

export const state = () => ({
  user: null,
  movies: [], // TODO: remove
  spotlightMovies: [],
  nowScreeningMovies: [],
  upcomingMovies: [],
  showtimes: [],
  currentMovie: null,
  currentTheatre: null,
})

export const mutations = {
  [Mutations.SET_AUTH_DATA](state, { user, token }) {
    state.user = user
    this.$axios.setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  },
  [Mutations.CLEAR_AUTH_DATA](state) {
    state.user = null
    this.$axios.setToken('')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },
  // TODO: remove
  [Mutations.SET_MOVIES](state, movies) {
    state.movies = movies
  },
  [Mutations.SET_SPOTLIGHT_MOVIES](state, movies) {
    state.spotlightMovies = movies
  },
  [Mutations.SET_NOW_SCREENING_MOVIES](state, movies) {
    state.nowScreeningMovies = movies
  },
  [Mutations.SET_UPCOMING_MOVIES](state, movies) {
    state.upcomingMovies = movies
  },
  [Mutations.SET_CURRENT_MOVIE](state, movie) {
    state.currentMovie = movie
  },
  [Mutations.SET_SHOWTIMES](state, showtimes) {
    state.showtimes = showtimes
  },
  [Mutations.SET_CURRENT_THEATRE](state, theatre) {
    state.currentTheatre = theatre
  },
}

export const getters = {
  [Getters.isAuthenticated](state) {
    return state.user !== null
  },
}

export const actions = {
  async [Actions.login]({ commit }, creds) {
    const res = await this.$axios.$post('login', creds)
    commit(Mutations.SET_AUTH_DATA, res)
  },
  async [Actions.getSpotlightMovies]({ commit }) {
    const spotlightMovies = await this.$axios.$get('movies/advertisement')
    commit(Mutations.SET_SPOTLIGHT_MOVIES, mapMovies(spotlightMovies))
  },
  async [Actions.getMovies]({ commit }) {
    const nowScreeningMovies = await this.$axios.$get('movies/now-showing')
    const upcomingMovies = await this.$axios.$get('movies/upcoming')
    commit(Mutations.SET_NOW_SCREENING_MOVIES, mapMovies(nowScreeningMovies))
    commit(Mutations.SET_UPCOMING_MOVIES, mapMovies(upcomingMovies))
  },
  async [Actions.getMovie]({ commit }, id) {
    const data = await this.$axios.$get(`movies/${id}`)
    const movie = {
      ...data,
      cast: mapToNames(data.casts),
      genres: mapToNames(data.genres),
      directors: mapToNames(data.directors),
      releaseDate: data.releasedDate,
      runtime: data.runningTime,
      trailer: data.trailerUrl,
      screenings: data.cinemas.map((cinema) => {
        return {
          cinema: {
            id: cinema.id,
            name: cinema.name,
          },
          dates: cinema.screening,
        }
      }),
    }
    commit(Mutations.SET_CURRENT_MOVIE, movie)
  },
  async [Actions.getShowtimes]({ commit }) {
    const data = await this.$axios.$get('screenings')
    const showtimes = data.map((movie) => {
      const screenings = movie.screenings.map((screening) =>
        mapKeys({ start_time: 'startTime' })(screening)
      )
      return { ...movie, screenings }
    })
    commit(Mutations.SET_SHOWTIMES, showtimes)
  },
  async [Actions.getTheatre]({ commit }, screeningId) {
    const data = await this.$axios.$get(`grid/${screeningId}`)
    const theatre = { name: data.theaterName, rows: data.row, cols: data.col }
    theatre.grid = data.grid.map((row) => {
      return row.map((cell) => {
        if (cell === null) return null

        return {
          id: cell.id,
          designation: cell.name,
          type: {
            id: cell.seatType.id,
            name: cell.seatType.name,
            color: cell.seatType.color,
          },
          active: cell.status,
          booked: cell.booked,
          price: cell.price,
        }
      })
    })
    commit(Mutations.SET_CURRENT_THEATRE, theatre)
  },
}

function mapMovies(movies) {
  return movies.map((movie) => {
    return {
      ...movie,
      cast: mapToNames(movie.casts),
      directors: mapToNames(movie.directors),
      genres: mapToNames(movie.genres),
    }
  })
}

function mapToNames(objs) {
  return objs.map((obj) => obj.name)
}
