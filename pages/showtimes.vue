<template>
  <div>
    <h1>Showtimes</h1>
    <fade-transition>
      <loading-box v-if="status.isLoading()" />
      <main v-if="status.isResolved()" class="main">
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
        <div class="showtimes__container">
          <div
            v-for="({ details, screenings }, movieId) in showtimes[
              selectedDate.key
            ]"
            :key="movieId"
            class="showtimes__item"
          >
            <movie-poster :src="details.poster" :movie-title="details.title" />
            <div>
              <strong class="h5-size text-prominent"
                >{{ details.title }}
                <spacer size="8" style="display: block" axis="vertical" />
              </strong>

              <div
                v-for="screening in screenings"
                :key="screening.id"
                class="screening-time__item"
              >
                <nuxt-link
                  :to="{
                    name: 'movies-id',
                    params: { id: movieId },
                    query: {
                      cinema: screening.cinemaId,
                      theatre: screening.theatreId,
                      screening: screening.id,
                    },
                  }"
                  class="screening-time__link"
                >
                  {{ formatTime(screening.start_time) }}
                </nuxt-link>
                <ph-caret-right :size="18" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'
import { formatDate, formatTime } from '~/utils/dateTools'

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
    datesAvailable() {
      return Object.keys(this.showtimes).map((date) => {
        return { key: date, formatted: formatDate(date) }
      })
    },
  },
  async created() {
    this.status.beginLoading()

    await this.$store.dispatch(Actions.getShowtimes)
    this.selectedDate = this.datesAvailable[0]
    this.status.resolve()
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
