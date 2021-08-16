<template>
  <div>
    <h1>Showtimes</h1>
    <div v-if="status.isLoading()">Loading...</div>
    <main v-if="status.isResolved()" class="main">
      <div
        v-for="movie in selectedDateShowtimes"
        :key="movie.id"
        class="movie-showtimes"
      >
        <movie-poster :src="movie.poster" :movie-title="movie.title" />
        <div>
          <strong class="h5-size text-prominent"
            >{{ movie.title }}
            <spacer size="8" style="display: block" axis="vertical" />
          </strong>

          <div
            v-for="showtime in movie.showtimes"
            :key="showtime.id"
            class="screening-time__item"
          >
            <nuxt-link
              :to="{
                name: 'movies-id',
                params: { id: movie.id },
                query: {
                  cinema: showtime.cinemaId,
                  theatre: showtime.theatreId,
                  screening: showtime.id,
                },
              }"
              class="screening-time__link"
            >
              {{ formatTime(showtime.startTime) }}
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
import { mapState, mapGetters } from 'vuex'
import { Actions } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'

export default {
  data() {
    return {
      status: new AsyncStatus(),
      selectedDate: new Date(),
      selectedDateShowtimes: [],
    }
  },
  computed: {
    ...mapState(['showtimes']),
    ...mapGetters(['getShowtimesOnDate']),
  },
  async mounted() {
    this.status.beginLoading()
    await this.$store.dispatch(Actions.getShowtimes)
    this.selectedDate.setDate(this.selectedDate.getDate() + 1)
    this.setSelectedDateShowtimes()
    this.status.resolve()
  },
  methods: {
    formatTime(time) {
      return new Date(
        `${this.selectedDate.toLocaleDateString()} ${time}`
      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    setSelectedDateShowtimes() {
      const selectedDateString = this.selectedDate.toISOString().split('T')[0]
      this.selectedDateShowtimes = this.getShowtimesOnDate(selectedDateString)
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
