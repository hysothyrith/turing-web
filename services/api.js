const API = {
  getMovies() {
    return [
      {
        id: 1,
        title: 'Luca',
        rating: 'G',
        poster:
          'https://www.themoviedb.org/t/p/w300/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
        backdrop:
          'https://www.themoviedb.org/t/p/original/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg',
        genres: ['Action', 'Comedy'],
        synopsis:
          'Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water’s surface.',
      },
      {
        id: 2,
        title: 'Joker',
        rating: 'R',
        poster:
          'https://www.themoviedb.org/t/p/w300/tfzagTRS9eLEwC3UMmYqiA48D8k.jpg',
        backdrop:
          'https://www.themoviedb.org/t/p/original/hO7KbdvGOtDdeg0W4Y5nKEHeDDh.jpg',
        genres: ['Adventure'],
        synopsis:
          'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
      },
      {
        id: 3,
        title: 'Tenet',
        rating: 'PG-13',
        poster:
          'https://www.themoviedb.org/t/p/w300/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
        backdrop:
          'https://www.themoviedb.org/t/p/original/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
        genres: ['Science fiction', 'Thriller'],
        synopsis:
          'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      },
    ]
  },

  getTheater(id) {
    return {
      id,
      rows: 15,
      cols: 15,
      grid: [
        [1, 1, 0, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1],
        [-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1],
      ],
    }
  },
}

export default API
