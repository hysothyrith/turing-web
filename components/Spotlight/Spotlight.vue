<template>
  <div class="spotlight">
    <spotlight-slide
      v-if="!$fetchState.pending"
      :movie="movies[index]"
      :interval="interval"
      @load="onSlideLoad"
      @next-ready="onNextSlideReady"
    />
    <fade-transition>
      <div v-if="showControllers" class="controller__container">
        <button
          v-for="i in movies.length"
          :key="i"
          :class="['controller', { active: i - 1 === controllersIndex }]"
          @click="onControllerClick(i - 1)"
        />
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import grabSentences from '~/utils/grabSentences'
import notifyApiError from '~/mixins/notifyApiError'

export default {
  mixins: [notifyApiError],
  props: {
    interval: {
      type: Number,
      default: 6000,
    },
  },
  data() {
    return {
      index: 0,
      controllersIndex: 0,
      timeout: null,
      paused: false,
      showControllers: false,
    }
  },
  async fetch() {
    await this.$store
      .dispatch(Actions.getSpotlightMovies)
      .catch(this.notifyApiError)
  },
  computed: {
    ...mapState({
      movies: (state) =>
        state.spotlightMovies.map((movie) => {
          return { ...movie, synopsis: grabSentences(movie.synopsis, 2) }
        }),
    }),
  },
  methods: {
    next() {
      this.index = (this.index + 1) % this.movies.length
    },
    pause() {
      this.paused = true
      clearTimeout(this.timeout)
    },
    onControllerClick(index) {
      this.index = index
      this.controllersIndex = index
      this.pause()
    },
    onSlideLoad() {
      if (!this.showControllers) {
        this.showControllers = true
      }
      if (!this.paused) {
        this.timeout = setTimeout(this.next, this.interval)
      }
    },
    onNextSlideReady() {
      this.controllersIndex = this.index
    },
  },
}
</script>

<style scoped>
.spotlight {
  position: relative;
  height: 90vw;
  max-height: 50vh;
}

.controller__container {
  margin-top: -4px;
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
  padding: 0;
}

.controller.active {
  background-color: var(--color-prominent);
}

@media only screen and (min-width: 768px) {
  .spotlight {
    height: 70vw;
    max-height: 85vh;
  }

  .controller__container {
    margin: 0;
    position: absolute;
    right: 4vw;
    top: 0;
    bottom: 0;
    width: 2rem;
    flex-direction: column;
  }
}
</style>
