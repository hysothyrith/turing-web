import { Actions, Getters, Mutations } from '~/constants'

function cachedCaller(context, axios, cacheTimeout = 1000 * 60 * 5) {
  async function get(route) {
    const cache = context.getters.getFromCache(route)
    if (!cache) {
      const data = await axios.$get(route)
      context.commit(Mutations.SET_CACHE, { key: route, data })
      setTimeout(() => {
        context.commit(Mutations.INVALIDATE_CACHE, route)
      }, cacheTimeout)
      return data
    } else {
      return cache
    }
  }

  return { get }
}

export const state = () => ({
  user: null,
  spotlightMovies: [],
  nowScreeningMovies: [],
  upcomingMovies: [],
  showtimes: [],
  currentMovie: null,
  currentScreening: null,
  tickets: [],
  currentRouteMeta: {},
  cache: {},
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
  [Mutations.SET_CURRENT_ROUTE_META](state, meta) {
    state.currentRouteMeta = meta
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
  [Mutations.SET_CURRENT_SCREENING](state, screening) {
    state.currentScreening = screening
  },
  [Mutations.SET_TICKETS](state, tickets) {
    state.tickets = tickets
  },
  [Mutations.INVALIDATE_CACHE](state, key) {
    delete state.cache[key]
  },
  [Mutations.SET_CACHE](state, { key, data }) {
    state.cache[key] = data
  },
}

export const getters = {
  [Getters.isAuthenticated](state) {
    return state.user !== null
  },
  [Getters.getShowtimesOnDate]: (state) => (dateString) => {
    const screenings = state.showtimes.filter((movie) =>
      Object.keys(movie.screenings).includes(dateString)
    )

    return screenings.map((movie) => {
      return {
        ...movie,
        screenings: undefined,
        showtimes: movie.screenings[dateString].map((screening) => {
          return {
            id: screening.id,
            startTime: screening.start_time,
            theatreId: screening.theaterId,
            cinemaId: screening.cinemaId,
          }
        }),
      }
    })
  },
  [Getters.getFromCache]: (state) => (key) => {
    return state.cache[key]
  },
}

export const actions = {
  async [Actions.signup]({ commit }, creds) {
    const data = await this.$axios.$post('register', creds)
    commit(Mutations.SET_AUTH_DATA, data)
  },
  async [Actions.login]({ commit }, creds) {
    const data = await this.$axios.$post('login', creds)
    commit(Mutations.SET_AUTH_DATA, data)
  },
  async [Actions.getSpotlightMovies](context) {
    const data = await cachedCaller(context, this.$axios).get(
      'movies/advertisement'
    )
    context.commit(Mutations.SET_SPOTLIGHT_MOVIES, mapMovies(data))
  },
  async [Actions.getMovies](context) {
    const { commit } = context
    const caller = cachedCaller(context, this.$axios)
    const [nowScreeningMovies, upcomingMovies] = await Promise.all([
      caller.get('movies/now-showing'),
      caller.get('movies/upcoming'),
    ])
    commit(Mutations.SET_NOW_SCREENING_MOVIES, mapMovies(nowScreeningMovies))
    commit(Mutations.SET_UPCOMING_MOVIES, mapMovies(upcomingMovies))
  },
  async [Actions.getMovie](context, id) {
    const { commit } = context
    const data = await cachedCaller(context, this.$axios).get(`movies/${id}`)

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
  async [Actions.getShowtimes](context) {
    const data = await cachedCaller(context, this.$axios).get(
      'screenings/now-showing'
    )
    const showtimes = data.reduce((acc, movie) => {
      Object.entries(movie.screenings).forEach(([date, screenings]) => {
        if (!acc[date]) {
          acc[date] = {}
        }
        const stringMovieId = movie.id.toString()
        if (!acc[date][stringMovieId]) {
          acc[date][stringMovieId] = {
            details: {
              ...movie,
              directors: mapToNames(movie.directors),
              cast: mapToNames(movie.casts),
              genres: mapToNames(movie.genres),
              trailer: movie.trailerUrl,
              screenings: undefined,
              casts: undefined,
              trailerUrl: undefined,
            },
          }
        }
        acc[date][stringMovieId].screenings = screenings
      })
      return acc
    }, {})

    context.commit(Mutations.SET_SHOWTIMES, showtimes)
  },
  async [Actions.getScreening]({ commit }, screeningId) {
    const data = await this.$axios.$get(`grid/${screeningId}`)
    const screening = {
      cinemaName: data.cinemaName,
      date: data.date,
      theatre: {
        name: data.theatreName,
        rows: data.row,
        cols: data.col,
      },
    }
    screening.theatre.grid = data.grid.map((row) => {
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
    commit(Mutations.SET_CURRENT_SCREENING, screening)
  },
  async [Actions.purchaseTickets](_, data) {
    await this.$axios.$post('tickets', data)
  },
  async [Actions.getTickets]({ commit }) {
    const data = await this.$axios.$get('tickets')
    const tickets = data.map((el) => {
      return {
        ...el,
        movie: mapMovie(el.movie),
        screening: {
          ...el.screening,
          startTime: el.screening.start_time,
          start_time: undefined,
        },
      }
    })
    commit(Mutations.SET_TICKETS, tickets)
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

function mapMovie(movie) {
  return {
    ...movie,
    releaseDate: movie.releasedDate,
    cast: mapToNames(movie.casts),
    directors: mapToNames(movie.directors),
    genres: mapToNames(movie.genres),
    casts: undefined,
    releasedDate: undefined,
  }
}

function mapToNames(objs) {
  return objs.map((obj) => obj.name)
}
