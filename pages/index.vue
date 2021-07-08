<template>
  <div>
    <spotlight />
    <div class="container">
      <main class="main">
        <movie-list title="Now screening" :movies="movies" />
        <movie-list title="Upcoming" :movies="movies" />
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import '~/assets/css/normalize.css'
import '~/assets/css/main.css'
import API from '~/services/api'

export default Vue.extend({
  data() {
    return {
      movies: API.getMovies(),
    }
  },
  head: {
    title: 'Turing Cinemas',
  },
})
</script>
