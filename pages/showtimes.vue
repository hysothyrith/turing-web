<template>
  <div>
    <h1>Showtimes</h1>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <main v-else class="main">
        <div class="mb-8">
          <div>
            <label for="date-select">Date</label>
            <t-select
              v-model="selectedDate"
              label="formatted"
              :options="datesAvailable"
              :clearable="false"
              :searchable="false"
            />
          </div>
        </div>
        <div
          v-for="({ name, movies }, cinemaId) in showtimes[selectedDate.key]
            .cinemas"
          :key="cinemaId"
          class="mb-8"
        >
          <h2 class="mb-6">{{ name }}</h2>
          <div class="showtimes__container">
            <div v-for="(movie, movieId) in movies" :key="movieId">
              <div class="showtimes__item">
                <div>
                  <movie-poster
                    :src="movie.poster"
                    :movie-title="movie.title"
                  />
                </div>
                <div>
                  <h3 class="h4-size text-prominent">{{ movie.title }}</h3>

                  <div
                    v-for="screening in movie.screenings"
                    :key="screening.id"
                    class="screening-time__item"
                  >
                    <nuxt-link
                      :to="{
                        name: 'movies-id',
                        params: { id: movieId },
                        query: {
                          screening: screening.id,
                        },
                      }"
                      class="screening-time__link"
                    >
                      {{ formatTime(screening.startTime) }}
                    </nuxt-link>
                    <ph-caret-right :size="18" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <spacer axis="vertical" size="8" />
        </div>
      </main>
    </fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import { formatDate, formatTime } from '~/utils/dateTools'

export default {
  data() {
    return {
      selectedDate: new Date(),
      selectedDateShowtimes: [],
    }
  },
  async fetch() {
    await this.$store.dispatch(Actions.getShowtimes)
    this.selectedDate = this.datesAvailable[0]
  },
  computed: {
    ...mapState(['showtimes']),
    datesAvailable() {
      return Object.keys(this.showtimes)
        .sort((a, b) => a.localeCompare(b))
        .map((date) => {
          return { key: date, formatted: formatDate(date) }
        })
    },
  },
  methods: {
    formatTime,
  },
}
</script>

<style scoped>
.showtimes__container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
}

.showtimes__item {
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

@media only screen and (min-width: 768px) {
  .showtimes__container {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8);
  }

  .showtimes__item {
    gap: var(--spacing-8);
  }
}
</style>
