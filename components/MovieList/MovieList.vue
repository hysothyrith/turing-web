<template>
  <div class="movie-list">
    <template v-if="loading">
      <skeleton width="26ch" height="2rem" />
      <spacer size="1" />
      <div class="posters">
        <skeleton
          v-for="i in skeletonCount"
          :key="i"
          :delay="i"
          class="poster__skeleton"
        />
      </div>
    </template>
    <template v-else>
      <h2 class="title">{{ title }}</h2>
      <div class="posters">
        <movie-poster v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </template>
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
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      skeletonCount: 0,
    }
  },
  mounted() {
    this.skeletonCount = Math.floor(window.innerWidth / 250)
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
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--spacing-4);
}

.poster__skeleton::before {
  content: '';
  display: block;
  height: 0;
  width: 0;
  padding-bottom: calc(2.9 / 2 * 100%);
}

@media only screen and (min-width: 720px) {
  .posters {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>
