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
  position: relative;
  margin: var(--spacing-4) var(--spacing-side);
  z-index: 1;
}
</style>
