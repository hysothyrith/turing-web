<template>
  <div class="movie-list">
    <template v-if="loading">
      <skeleton width="26ch" height="1.9rem" border-radius="1rem" />
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
        <nuxt-link
          v-for="movie in movies"
          :key="movie.id"
          :to="`/movies/${movie.id}`"
          class="poster__link"
        >
          <movie-poster :src="movie.poster" :movie-title="movie.title" />
        </nuxt-link>
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
      default: null,
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
    if (window.innerWidth < 768) {
      this.skeletonCount = Math.floor(window.innerWidth / 160)
    } else {
      this.skeletonCount = Math.floor(window.innerWidth / 250)
    }
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

.poster__link {
  transition: transform 200ms ease-in, border-color 200ms ease;
  border: 4px solid rgba(255, 255, 255, 0);
}

.poster__link:hover {
  transform: translateY(-10px);
  border-color: rgb(255, 255, 255);
}

@media only screen and (min-width: 768px) {
  .posters {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>
