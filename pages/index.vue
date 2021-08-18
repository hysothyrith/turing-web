<template>
  <div>
    <spotlight />
    <div class="container">
      <main class="main">
        <movie-list
          title="Now screening"
          :movies="nowScreeningMovies"
          :loading="$fetchState.pending"
        />
        <movie-list
          title="Upcoming"
          :movies="upcomingMovies"
          :loading="$fetchState.pending"
        />
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'
import preloadImages from '~/utils/preloadImages'

export default Vue.extend({
  layout: 'home',
  fetchDelay: 0,
  data() {
    return {
      status: new AsyncStatus(),
    }
  },
  async fetch() {
    await this.$store.dispatch(Actions.getMovies)
    const mapPosters = (el) =>
      `${this.$config.BASE_URL}/uploads/images/w500${el.poster}`
    await Promise.all([
      preloadImages(this.nowScreeningMovies.map(mapPosters)),
      preloadImages(this.upcomingMovies.map(mapPosters)),
    ])
  },
  computed: {
    ...mapState(['nowScreeningMovies', 'upcomingMovies']),
  },
})
</script>

<style scoped>
.main {
  position: relative;
  margin: var(--spacing-4) var(--spacing-side);
  z-index: 1;
}
</style>
