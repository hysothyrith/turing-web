<template>
  <div
    :class="[
      'slide',
      {
        leave: transition === LEAVE,
        enter: transition === ENTER,
      },
    ]"
  >
    <movie-backdrop
      class="backdrop"
      :src="currentMovie.backdrop"
      :movie-title="currentMovie.title"
      overlay
      @load="enter"
    />
    <div class="info">
      <h2 class="title">{{ currentMovie.title }}</h2>
      <div class="meta">
        <movie-genres :genres="currentMovie.genres" />
        <spacer axis="horizontal" size="2" />
        <movie-rating>{{ currentMovie.rating }}</movie-rating>
      </div>
      <p class="synopsis d-sm-none d-md-block">{{ currentMovie.synopsis }}</p>
      <span class="d-sm-inline-block d-md-none"
        ><spacer size="8" axis="vertical"
      /></span>
    </div>
    <div class="overlay" />
  </div>
</template>

<script>
const ENTER = true
const LEAVE = false
const transitionDuration = 500

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ENTER,
      LEAVE,
      transition: LEAVE,
      currentMovie: this.movie,
    }
  },
  watch: {
    movie(newVal) {
      const backdrop = new Image()
      backdrop.src = `${this.$config.BASE_URL}/uploads/images/original${newVal.backdrop}`
      backdrop.onload = () => {
        this.$emit('next-ready')
        this.leave()
        setTimeout(() => {
          this.currentMovie = newVal
        }, transitionDuration)
      }
    },
  },
  methods: {
    leave() {
      this.transition = LEAVE
    },
    enter() {
      this.transition = ENTER
      this.$emit('load')
    },
  },
}
</script>

<style scoped>
.slide {
  position: relative;
}

.backdrop {
  height: 90vw;
  max-height: 50vh;
  transition: opacity 500ms ease;
}

.info {
  position: absolute;
  bottom: 8vw;
  margin-left: 4vw;
  z-index: 1;
}

.synopsis {
  max-width: 50ch;
}

.overlay {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    25deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.36458333333333337) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Transitions */
.info * {
  transition: opacity 500ms ease, transform 600ms ease;
}

.enter .backdrop {
  opacity: 1;
}

.leave .backdrop {
  opacity: 0;
}

.enter .info * {
  opacity: 1;
  transform: translateY(0);
}

.leave .info * {
  opacity: 0;
  transform: translateY(60px);
}

.title {
  transition-delay: 100ms;
  margin-bottom: var(--spacing-1);
  font-size: var(--size-h4);
}

.meta {
  transition-delay: 50ms;
}

@media only screen and (min-width: 768px) {
  .backdrop {
    height: 70vw;
    max-height: 85vh;
  }

  .title {
    font-size: var(--size-h2);
  }
}
</style>
