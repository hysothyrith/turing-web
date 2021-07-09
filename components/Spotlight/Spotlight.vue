<template>
  <div class="spotlight">
    <spotlight-slide :movie="movies[index]" :interval="interval" />
    <!-- <button @click="pause">Pause</button>
    <button @click="next">Tick</button> -->
  </div>
</template>

<script>
import API from '~/services/api'

export default {
  props: {
    interval: {
      type: Number,
      default: 6000,
    },
  },
  data() {
    return {
      index: 0,
      tick: null,
      movies: API.getMovies(),
    }
  },
  mounted() {
    this.tick = setInterval(this.next, this.interval)
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
