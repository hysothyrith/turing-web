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
    <img
      :src="currentMovie.backdrop"
      :alt="`${currentMovie.title} backdrop`"
      class="backdrop"
    />
    <div class="info">
      <h2 class="title">{{ currentMovie.title }}</h2>
      <small class="genres">{{ currentMovie.genres.join(', ') }}</small>
      <rating rating="PG-13" />
      <p class="synopsis">{{ currentMovie.synopsis }}</p>
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
    interval: {
      type: Number,
      required: true,
    },
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ENTER,
      LEAVE,
      transition: ENTER,
      currentMovie: this.movie,
    }
  },
  watch: {
    movie(newVal) {
      this.transition = LEAVE
      setTimeout(() => {
        this.currentMovie = newVal
        this.transition = ENTER
      }, transitionDuration)
    },
  },
}
</script>

<style scoped>
.slide {
  position: relative;
}

.backdrop {
  width: 100vw;
  height: 70vw;
  max-height: 90vh;
  object-fit: cover;
  object-position: top;
  transition: opacity 600ms ease;
}

.info,
.title,
.synopsis {
  transition: opacity 400ms ease, transform 700ms ease;
}

.info {
  position: absolute;
  bottom: 4vw;
  margin-left: 4vw;
  z-index: 1;
}

.genres {
  margin-right: var(--spacing-2);
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
    ),
    linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5690651260504201) 20%,
      rgba(0, 0, 0, 0.20211834733893552) 60%,
      rgba(0, 0, 0, 0) 100%
    );
}

/* transitions */
.enter .backdrop {
  opacity: 1;
}

.leave .backdrop {
  opacity: 0;
}

.enter .info,
.enter .title,
.enter .synopsis {
  opacity: 1;
  transform: translateY(0);
}

.leave .info,
.leave .title {
  opacity: 0;
  transform: translateY(40px);
}

.leave .synopsis {
  opacity: 0;
  transform: translateY(60px);
}
</style>
