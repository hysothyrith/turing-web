<template>
  <div>
    <h4>{{ title }}</h4>
    <div class="posters">
      <movie-poster v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    movies: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.posters {
  display: grid;
  grid-template-columns: repeat(8, 250px);
}
</style>
