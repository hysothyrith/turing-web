<template>
  <nuxt-link :to="`/movies/${movie.id}`">
    <div class="poster">
      <img class="image" :src="movie.poster" :alt="`${movie.title} poster`" />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.poster {
  transition: transform 200ms ease;
  cursor: pointer;
}

.poster:hover {
  transform: scale(1.05);
}

.image {
  object-fit: cover;
}
</style>
