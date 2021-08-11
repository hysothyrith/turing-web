<template>
  <div>
    <div v-if="status.isLoading()">Loading...</div>
    <div v-if="status.isResolved()">
      <movie-backdrop
        class="backdrop"
        :movie-title="currentMovie.title"
        :src="currentMovie.backdrop"
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
              <p style="margin-bottom: 0">{{ currentMovie.synopsis }}</p>
              <spacer size="1" axis="vertical" />
              <div class="actions">
                <t-button @click="playTrailer"
                  ><ph-play /><spacer size="2" />Play trailer</t-button
                >
                <spacer size="1" axis="horizontal" />
                <t-button @click="showBookingSummary = !showBookingSummary"
                  ><ph-ticket /><spacer size="2" />Get tickets</t-button
                >
              </div>
            </div>
          </div>

          <div
            v-if="currentMovie.screenings.length > 0"
            class="showtimes__wrapper"
          >
            <h2>Showtimes</h2>
            <div class="showtime__selects mb-6">
              <div>
                <label for="cinema-select">Cinema</label>
                <t-select
                  v-model="selectedCinema"
                  label="name"
                  :options="cinemasAvailable"
                  placeholder="Select a cinema"
                  class="cinema__select"
                  :clearable="false"
                />
              </div>
              <div>
                <label for="date-select">Date</label>
                <t-select
                  v-model="selectedDate"
                  label="formatted"
                  :options="datesAvailable"
                  placeholder="Select a date"
                  :disabled="!selectedCinema"
                  :clearable="false"
                />
              </div>
              <div>
                <label for="time-select">Time</label>
                <t-select
                  :value="selectedScreening"
                  label="startTime"
                  :options="timesAvailable"
                  :disabled="!selectedDate"
                  placeholder="Select a time"
                  :clearable="false"
                  @input="onScreeningSelect"
                />
              </div>
            </div>
            <div>
              <div v-if="gridStatus.isLoading()">Loading grid...</div>
              <div v-if="gridStatus.isResolved()">
                <label class="d-block mb-2">Select seat</label>
                <theatre :value="currentTheatre" @change="onSelectionChange" />
              </div>
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
                <div>Seats {{ selectionSummary }}</div>
                <strong>$ {{ selectionPrice }}</strong>
              </div>
              <t-button @click="onBookClick"
                ><ph-ticket /><spacer size="2" />Book
                {{ selectedSeats.length }} tickets</t-button
              >
            </div>
          </div>
        </main>
      </div>
      <trailer-player :src="currentMovie.trailer" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AsyncStatus from '~/utils/AsyncStatus'
import { Actions } from '~/constants'

export default {
  layout: 'full',
  data() {
    return {
      status: new AsyncStatus(),
      gridStatus: new AsyncStatus(),
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
    ...mapState(['currentMovie', 'currentTheatre']),
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
        return { key, formatted: new Date(key).toLocaleDateString() }
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
        return { id: screening.id, startTime: screening.start_time }
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
  mounted() {
    this.status.beginLoading()
    this.$store
      .dispatch(Actions.getMovie, this.$route.params.id)
      .then(() => {
        this.status.resolve()
      })
      .catch((err) => alert(err))
  },
  methods: {
    playTrailer() {
      this.$modal.show('trailer-player')
    },
    onScreeningSelect(screening) {
      this.selectedScreening = screening
      this.gridStatus.beginLoading()
      this.$store
        .dispatch(Actions.getTheatre, screening.id)
        .then(() => {
          this.gridStatus.resolve()
        })
        .catch((err) => {
          this.gridStatus.reject()
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
}

.main {
  max-width: var(--width-max);
  z-index: 1;
  margin: var(--spacing-side);
}

.movie {
  width: 100%;
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
}

.info {
  grid-column: span 2;
}

.showtimes__wrapper {
  border-top: 1px solid var(--color-muted);
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-4);
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
  background-color: rgb(75, 75, 255);
  box-shadow: rgba(88, 88, 255, 0.728) 0 20px 30px -10px;
}

@media only screen and (min-width: 720px) {
  .movie {
    grid-template-columns: 250px auto;
    gap: var(--spacing-8);
  }

  .info {
    grid-column: span 1;
  }

  .showtime__selects {
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-1);
  }
}
</style>
