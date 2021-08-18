<template>
  <div>
    <fade-transition>
      <loading-box v-if="status.isLoading()" />
      <div v-if="status.isResolved()">
        <movie-backdrop
          class="backdrop"
          :movie-title="currentMovie.title"
          :src="currentMovie.backdrop"
          overlay
        />
        <div class="main__wrapper">
          <main class="main">
            <div class="movie">
              <div>
                <movie-poster
                  :src="currentMovie.poster"
                  :movie-title="currentMovie.title"
                />
              </div>
              <div class="info">
                <h1 class="mb-1">{{ currentMovie.title }}</h1>
                <movie-genres :genres="currentMovie.genres" />
                <spacer size="2" axis="horizontal" />
                <movie-rating v-if="currentMovie.rating">{{
                  currentMovie.rating
                }}</movie-rating>
                <p class="mb-4">{{ currentMovie.synopsis }}</p>
                <div class="movie__cast-crew">
                  <div>
                    <strong class="d-block text-prominent">{{
                      pluralizeIfNeeded(
                        currentMovie.directors.length,
                        'Director'
                      )
                    }}</strong>
                    {{ currentMovie.directors.join(', ') }}
                  </div>
                  <div>
                    <strong class="d-block text-prominent">Cast</strong>
                    {{ currentMovie.cast.join(', ') }}
                  </div>
                </div>
                <div class="actions">
                  <t-button @click="playTrailer"
                    ><ph-play /><spacer size="2" />Play trailer</t-button
                  >
                  <spacer size="1" axis="horizontal" />
                  <t-button
                    v-if="hasScreenings"
                    @click="
                      $refs.showtimes.scrollIntoView({ behavior: 'smooth' })
                    "
                    ><ph-ticket /><spacer size="2" />Get tickets</t-button
                  >
                </div>
              </div>
            </div>
            <div
              v-show="hasScreenings"
              ref="showtimes"
              class="showtimes__wrapper"
            >
              <h2>Showtimes</h2>
              <div class="showtime__selects mb-6">
                <div>
                  <label for="cinema-select">Cinema</label>
                  <t-select
                    :value="selectedCinema"
                    label="name"
                    :options="cinemasAvailable"
                    :placeholder="
                      screeningStatus.isLoading()
                        ? 'Loading'
                        : 'Select a cinema'
                    "
                    :disabled="screeningStatus.isLoading()"
                    :clearable="false"
                    :searchable="false"
                    @input="onCinemaSelect"
                  />
                </div>
                <div>
                  <label for="date-select">Date</label>
                  <t-select
                    :value="selectedDate"
                    label="formatted"
                    :options="datesAvailable"
                    :placeholder="
                      screeningStatus.isLoading()
                        ? 'Loading'
                        : !selectedCinema
                        ? 'Please select a cinema first'
                        : 'Select a date'
                    "
                    :disabled="!selectedCinema"
                    :clearable="false"
                    :searchable="false"
                    @input="onDateSelect"
                  />
                </div>
                <div>
                  <label for="time-select">Time</label>
                  <t-select
                    :value="selectedScreening"
                    label="startTime"
                    :options="timesAvailable"
                    :disabled="!selectedDate"
                    :placeholder="
                      screeningStatus.isLoading()
                        ? 'Loading'
                        : !selectedCinema
                        ? 'Please select a cinema first'
                        : !selectedDate
                        ? 'Please select a date first'
                        : 'Select a time'
                    "
                    :clearable="false"
                    :searchable="false"
                    @input="onTimeSelect"
                  />
                </div>
              </div>

              <div>
                <label class="d-block mb-2">Select seats</label>
                <theatre
                  v-if="selectedScreening && theatreStatus.isResolved()"
                  :value="currentScreening.theatre"
                  @change="onSelectionChange"
                />
                <theatre-placeholder
                  v-else
                  :loading="theatreStatus.isLoading()"
                />
              </div>
            </div>
            <div
              :class="[
                'booking-summary__wrapper',
                { show: selectedSeats.length > 0 },
              ]"
            >
              <div class="booking-summary__inner">
                <div class="booking-summary">
                  <strong>Booking summary</strong>
                  <div>
                    {{ pluralizeIfNeeded(selectedSeats.length, 'Seat') }}
                    {{ selectionSummary }}
                  </div>
                  <strong>$ {{ selectionPrice }}</strong>
                </div>
                <t-button @click="onBookClick"
                  ><ph-ticket /><spacer size="2" />Book
                  {{ selectedSeats.length }}
                  {{
                    pluralizeIfNeeded(selectedSeats.length, 'ticket')
                  }}</t-button
                >
              </div>
            </div>
          </main>
        </div>
        <trailer-player :src="currentMovie.trailer" />
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AsyncStatus from '~/utils/AsyncStatus'
import { Actions } from '~/constants'
import { formatDate, formatTime } from '~/utils/dateTools'
import pluralizeIfNeeded from '~/mixins/pluralizeIfNeeded'

export default {
  mixins: [pluralizeIfNeeded],
  layout: 'full',
  data() {
    return {
      status: new AsyncStatus(),
      theatreStatus: new AsyncStatus(),
      screeningStatus: new AsyncStatus(),
      movie: null,
      theatre: null,
      showBookingSummary: false,
      selectedCinema: null,
      selectedDate: null,
      selectedScreening: null,
      selectedSeats: [],
    }
  },
  computed: {
    ...mapState(['currentMovie', 'currentScreening']),
    hasScreenings() {
      return this.currentMovie && this.currentMovie.screenings.length > 0
    },
    cinemasAvailable() {
      return this.currentMovie.screenings.map((screening) => screening.cinema)
    },
    datesAvailable() {
      if (!this.selectedCinema) return []
      const screening = this.currentMovie.screenings.find(
        (screening) => screening.cinema.id === this.selectedCinema.id
      )
      if (!screening) return []
      return Object.keys(screening.dates).map((key) => {
        return { key, formatted: formatDate(key) }
      })
    },
    timesAvailable() {
      if (!this.selectedDate) return []
      const screenings = this.currentMovie.screenings.find(
        (screening) => screening.cinema.id === this.selectedCinema.id
      )
      if (!screenings) return []

      const screeningDates = screenings.dates[this.selectedDate.key]
      if (!screeningDates) return []

      return screeningDates.map((screening) => {
        return { id: screening.id, startTime: formatTime(screening.start_time) }
      })
    },
    selectionSummary() {
      return this.selectedSeats.map((seat) => seat.designation).join(', ')
    },
    selectionPrice() {
      return this.selectedSeats
        .reduce((acc, seat) => acc + seat.price, 0)
        .toFixed(2)
    },
  },
  async created() {
    this.status.beginLoading()
    await this.$store
      .dispatch(Actions.getMovie, this.$route.params.id)
      .catch((err) => alert(err))
    this.status.resolve()

    /* process query param */
    const { screening } = this.$route.query
    if (screening) {
      const interval = setInterval(() => {
        if (this.$refs.showtimes) {
          this.$refs.showtimes.scrollIntoView({ behavior: 'smooth' })
          clearInterval(interval)
        }
      }, 200)
      this.screeningStatus.beginLoading(0)
      this.theatreStatus.beginLoading(0)
      const screeningId = parseInt(screening)
      await this.$store.dispatch(Actions.getScreening, screeningId)
      this.selectedCinema = this.cinemasAvailable.find(
        (el) => el.name === this.currentScreening.cinemaName
      )
      this.selectedDate = this.datesAvailable.find(
        (el) => el.key === this.currentScreening.date
      )
      this.selectedScreening = this.timesAvailable.find(
        (el) => el.id === screeningId
      )
      this.screeningStatus.resolve()
      this.theatreStatus.resolve()
    }
  },
  methods: {
    playTrailer() {
      this.$modal.show('trailer-player')
    },
    onCinemaSelect(cinema) {
      this.selectedCinema = cinema
      this.selectedDate = null
      this.selectedScreening = null
      this.selectedSeats = []
    },
    onDateSelect(date) {
      this.selectedDate = date
      this.selectedScreening = null
      this.selectedSeats = []
    },
    onTimeSelect(screening) {
      this.theatreStatus.reset()
      this.selectedSeats = []
      this.selectedScreening = screening
      this.theatreStatus.beginLoading()
      this.$store
        .dispatch(Actions.getScreening, screening.id)
        .then(() => {
          this.theatreStatus.resolve()
        })
        .catch((err) => {
          this.theatreStatus.reject()
          alert(err)
        })
    },
    onSelectionChange(selection) {
      this.selectedSeats = selection
    },
    onBookClick() {
      this.$router.push({
        path: '/book',
        query: {
          movie: this.$route.params.id,
          screening: this.selectedScreening.id,
          seats: this.selectedSeats.map((seat) => seat.id),
        },
      })
    },
  },
}
</script>

<style scoped>
label {
  display: block;
}

.backdrop {
  height: 60vw;
  max-height: 80vh;
}

.main__wrapper {
  display: flex;
  justify-content: center;
  margin-top: -120px;
  margin-bottom: 200px;
  flex-grow: 1;
  flex-basis: auto;
}

.main {
  min-width: 0;
  max-width: var(--width-max);
  z-index: 1;
  margin: var(--spacing-side);
}

.movie {
  width: 100%;
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: 1fr 1.5fr;
}

.movie__cast-crew {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: var(--spacing-8);
}

.info {
  grid-column: span 2;
}

.showtimes__wrapper {
  border-top: 1px solid var(--color-muted);
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-4);
  min-height: 50rem;
}

.showtime__selects {
  display: grid;
  gap: var(--spacing-2);
}

.showtimes__on {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
}

.showtime_buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.booking-summary__wrapper {
  position: fixed;
  right: 0;
  left: 0;
  bottom: var(--spacing-4);
  transform: translateY(120%);
  display: flex;
  justify-content: center;
  z-index: 5;
  transition: transform 500ms ease-in-out;
}

.booking-summary__wrapper.show {
  transform: translateY(0);
}

.booking-summary__inner {
  max-width: var(--width-max);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 var(--spacing-side);
  padding: var(--spacing-4);
  border-radius: var(--b-radius);
  background-color: var(--color-highlight);
  box-shadow: rgba(88, 88, 255, 0.728) 0 20px 30px -10px;
}

@media only screen and (min-width: 768px) {
  .movie {
    grid-template-columns: 250px auto;
    gap: var(--spacing-8);
  }

  .info {
    grid-column: span 1;
  }

  .showtime__selects {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
