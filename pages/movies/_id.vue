<template>
  <div>
    <movie-backdrop class="backdrop" :movie="movie" />
    <div class="main__wrapper">
      <main class="main">
        <div class="movie">
          <div class="poster__wrapper">
            <movie-poster :movie="movie" />
          </div>
          <div class="info">
            <h1 class="movie__title">{{ movie.title }}</h1>
            <movie-genres :genres="movie.genres" />
            <spacer size="2" axis="horizontal" />
            <movie-rating>{{ movie.rating }}</movie-rating>
            <p>{{ movie.synopsis }}</p>
          </div>
        </div>
        <div class="showtimes__wrapper">
          <h2>Showtimes</h2>
          <div>
            <h3>Monday, May 8th</h3>
            <div class="showtimes__on">
              <div class="showtimes">
                <h4>Lakeside Cinema</h4>
                <div class="showtime_buttons">
                  <button class="showtime__button">12:00</button>
                  <button class="showtime__button">14:00</button>
                  <button class="showtime__button">15:20</button>
                </div>
              </div>
              <div class="showtimes">
                <h4>Grand Cinema</h4>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MovieBackdrop from '~/components/MovieBackdrop.vue'
import API from '~/services/api'

export default Vue.extend({
  components: { MovieBackdrop },
  asyncData({ params }) {
    const id = parseInt(params.id)
    const movies = API.getMovies()
    return { movie: movies.find((movie) => movie.id === id) }
  },
  head() {
    return { title: `Turing Cinemas - ${this.movie.title}` }
  },
})
</script>

<style scoped>
.backdrop {
  height: 60vw;
  max-height: 80vh;
}

.main__wrapper {
  display: flex;
  justify-content: center;
  margin-top: -120px;
}

.main {
  max-width: var(--width-max);
  z-index: 5;
}

.movie {
  flex-grow: 1;
  margin: 0 var(--spacing-side);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-8);
  align-items: center;
}

.info {
  grid-column: span 2;
}

.movie__title {
  margin-bottom: var(--spacing-1);
}

.showtimes__wrapper {
  margin: var(--spacing-8) var(--spacing-side);
  padding: var(--spacing-2) var(--spacing-side);
  border: 1px solid var(--color-muted);
}

.showtimes__on {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.showtime_buttons {
  display: flex;
  gap: var(--spacing-2);
}

.showtime__button {
  background: none;
  cursor: pointer;
  color: var(--color-less-prominent);
  padding: var(--spacing-2) var(--spacing-4);
  border: 2px solid var(--color-less-prominent);
  border-radius: 4px;
}

@media only screen and (min-width: 720px) {
  .movie {
    grid-template-columns: 250px auto;
  }

  .info {
    grid-column: span 1;
  }
}
</style>
