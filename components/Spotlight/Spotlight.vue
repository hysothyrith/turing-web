<template>
  <div class="spotlight">
    <spotlight-slide
      v-if="status.isResolved()"
      :movie="movies[index]"
      :interval="interval"
    />
    <div class="controller__container">
      <button
        v-for="i in movies.length"
        :key="i"
        :class="['controller', { active: i - 1 === index }]"
        @click="onControllerClick(i - 1)"
      />
    </div>
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
    onControllerClick(index) {
      this.index = index
      this.pause()
    },
  },
}
</script>

<style scoped>
.spotlight {
  position: relative;
  height: 70vw;
  max-height: 90vh;
}

.controller__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.controller {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  border: none;
  outline: none;
  margin: var(--spacing-1);
  cursor: pointer;
  background-color: var(--color-less-prominent);
  transition: background-color 1000ms ease;
}

.controller.active {
  background-color: var(--color-prominent);
}

@media only screen and (min-width: 768px) {
  .controller__container {
    position: absolute;
    right: 4vw;
    top: 0;
    bottom: 0;
    width: 2rem;
    flex-direction: column;
  }
}
</style>
