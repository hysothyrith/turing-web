<template>
  <div>
    <movie-backdrop class="backdrop" :movie="movie" />
    <div class="main__wrapper">
      <main class="main">
        <div class="poster__wrapper">
          <movie-poster :movie="movie" />
        </div>
        <div class="info">
          <h1>{{ movie.title }}</h1>
          <movie-genres :genres="movie.genres" />
          <spacer size="2" axis="horizontal" />
          <movie-rating>R</movie-rating>
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
})
</script>

<style scoped>
.poster__wrapper {
  width: 250px;
  margin-right: var(--spacing-8);
}

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
  flex-grow: 1;
  margin: 0 var(--spacing-side);
  display: flex;
  max-width: var(--width-max);
  border: 1px solid red;
  z-index: 5;
  align-items: center;
}
</style>
