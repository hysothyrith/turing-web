<template>
  <div>
    <h1>Showtimes</h1>
    <main class="main">
      <div v-for="movie in showtimes" :key="movie.id" class="movie-showtimes">
        <movie-poster :src="movie.poster" :movie-title="movie.title" />
        <div>
          <strong class="h5-size text-prominent"
            >{{ movie.title }}
            <spacer size="8" style="display: block" axis="vertical" />
          </strong>

          <div
            v-for="screening in movie.screenings"
            :key="screening.id"
            class="screening-time__item"
          >
            <nuxt-link to="/" class="screening-time__link">
              {{ formatTime(screening.startTime) }}
            </nuxt-link>
            <ph-caret-right :size="18" />
          </div>
        </div>
        <spacer size="8" style="display: block" axis="vertical" />
      </div>
    </main>
  </div>
</template>

<script>
import { PhCaretRight } from 'phosphor-vue'
import { mapState } from 'vuex'
import { Actions } from '~/constants'

export default {
  components: {
    PhCaretRight,
  },
  data() {
    return {
      selectedDate: new Date(),
    }
  },
  computed: {
    ...mapState(['showtimes']),
  },
  mounted() {
    this.$store.dispatch(Actions.getShowtimes)
  },
  methods: {
    formatTime(time) {
      return new Date(
        `${this.selectedDate.toLocaleDateString()} ${time}`
      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  },
}
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
}

.movie-showtimes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}

.screening-time__link {
  color: var(--color-primary);
  width: 100%;
}

.screening-time__link:hover {
  color: var(--color-prominent);
}

.screening-time__item {
  border-bottom: 1px solid var(--color-muted);
  padding: var(--spacing-4) var(--spacing-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (min-width: 920px) {
  .main {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8);
  }
  .movie-showtimes {
    gap: var(--spacing-8);
  }
}
</style>
