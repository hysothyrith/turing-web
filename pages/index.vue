<template>
  <div>
    <spotlight />
    <div class="container">
      <main class="main">
        <movie-list
          title="Now screening"
          :movies="nowScreeningMovies"
          :loading="!status.isResolved()"
        />
        <movie-list
          title="Upcoming"
          :movies="upcomingMovies"
          :loading="!status.isResolved()"
        />
      </main>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import '~/assets/css/normalize.css'
import '~/assets/css/main.css'
import { mapState } from 'vuex'
import AsyncStatus from '~/utils/AsyncStatus'
import { Actions } from '~/constants'

export default Vue.extend({
  layout: 'home',
  data() {
    return {
      status: new AsyncStatus(),
    }
  },
  head: {
    title: 'Turing Cinemas',
  },
  computed: {
    ...mapState(['nowScreeningMovies', 'upcomingMovies']),
  },
  async mounted() {
    this.status.beginLoading()
    await this.$store.dispatch(Actions.getMovies)
    this.status.resolve()
  },
})
</script>

<style scoped>
.main {
  margin: 0 var(--spacing-side);
}

.movie__skeleton-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-4);
}

.poster__skeleton::before {
  content: '';
  display: block;
  height: 0;
  width: 0;
  padding-bottom: calc(3 / 2 * 100%);
}
</style>
