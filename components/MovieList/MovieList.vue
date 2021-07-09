<template>
  <div class="movie-list">
    <h4 class="title">{{ title }}</h4>
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
.movie-list {
  margin-bottom: 3rem;
}

.title {
  margin-top: 0;
}

.posters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-4);
}
</style>
