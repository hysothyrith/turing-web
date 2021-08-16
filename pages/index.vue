<template>
  <div>
    <spotlight />
    <div class="container">
      <main class="main">
        <movie-list
          title="Now screening"
          :movies="nowScreeningMovies"
          :loading="status.isLoading()"
        />
        <movie-list
          title="Upcoming"
          :movies="upcomingMovies"
          :loading="status.isLoading()"
        />
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import AsyncStatus from '~/utils/AsyncStatus'
import { Actions } from '~/constants'
import preloadImages from '~/utils/preloadImages'

export default Vue.extend({
  layout: 'home',
  data() {
    return {
      status: new AsyncStatus(),
    }
  },
  computed: {
    ...mapState(['nowScreeningMovies', 'upcomingMovies']),
  },
  async mounted() {
    this.status.beginLoading(0)
    await this.$store.dispatch(Actions.getMovies)
    this.status.resolve()

    await Promise.all([
      preloadImages(
        this.nowScreeningMovies.map(
          (el) => `${this.$config.BASE_URL}/uploads/images/w500${el.poster}`
        )
      ),
      preloadImages(
        this.upcomingMovies.map(
          (el) => `${this.$config.BASE_URL}/uploads/images/w500${el.poster}`
        )
      ),
    ])
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
