<template>
  <div class="spotlight">
    <spotlight-slide
      v-if="status.isResolved()"
      :movie="movies[index]"
      :interval="interval"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'

export default {
  props: {
    interval: {
      type: Number,
      default: 6000,
    },
  },
  data() {
    return {
      status: new AsyncStatus(),
      index: 0,
      tick: null,
    }
  },
  computed: {
    ...mapState({ movies: (state) => state.spotlightMovies }),
  },
  mounted() {
    this.status.beginLoading()
    this.$store
      .dispatch(Actions.getSpotlightMovies)
      .then(() => {
        this.status.resolve()
        this.tick = setInterval(this.next, this.interval)
      })
      .catch((err) => alert(err))
  },
  methods: {
    next() {
      this.index = (this.index + 1) % this.movies.length
    },
    pause() {
      clearInterval(this.tick)
    },
  },
}
</script>

<style scoped>
.spotlight {
  height: 70vw;
  max-height: 90vh;
}
</style>
