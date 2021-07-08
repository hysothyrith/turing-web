<template>
  <h1>{{ movie.title }}</h1>
</template>

<script>
import Vue from 'vue'
import API from '~/services/api'

export default Vue.extend({
  asyncData({ params }) {
    const id = parseInt(params.id)
    const movies = API.getMovies()
    return { movie: movies.find((movie) => movie.id === id) }
  },
})
</script>
