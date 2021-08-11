<template>
  <div>
    <div v-if="status.isLoading()">Loading...</div>
    <main v-if="status.isResolved()">
      <div class="header">
        <div>
          <movie-poster
            :src="currentMovie.poster"
            :movie-title="currentMovie.title"
          />
        </div>
        <div class="summary">
          <h2 class="mb-2">{{ currentMovie.title }}</h2>
          <div>
            <movie-genres :genres="currentMovie.genres" class="mr-2" />
            <movie-rating v-if="currentMovie.rating" class="mr-2">{{
              currentMovie.rating
            }}</movie-rating>
            <small>{{ currentMovie.runtime }} mins</small>
          </div>
          <div class="booking-summary mt-4">
            <div>
              <strong class="d-block text-prominent">Cinema</strong>
              Lakeside cinema
            </div>
            <div>
              <strong class="d-block text-prominent">Theatre</strong>
              Theatre 7
            </div>
            <div>
              <strong class="d-block text-prominent">Seats</strong>
              {{ seats.join(', ') }}
            </div>
            <div>
              <strong class="d-block text-prominent">Date</strong>
              {{ screeningDate }}
            </div>
          </div>
        </div>
      </div>
      <div class="booking__form">
        <h2>Payment details</h2>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'

export default {
  data() {
    return {
      status: new AsyncStatus(),
      currentScreening: null,
      seats: [],
    }
  },
  computed: {
    ...mapState(['currentMovie']),
    screeningDate() {
      if (!this.currentScreening) return ''
      const date = new Date(
        this.currentScreening.date + ' ' + this.currentScreening.startTime
      )
      return (
        date.toLocaleDateString([], {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }) +
        ' at ' +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      )
    },
  },
  async mounted() {
    this.status.beginLoading()
    this.seats = this.$route.query.seats
    try {
      await this.$store.dispatch(Actions.getMovie, this.$route.query.movie)
      this.setCurrentScreening()
      this.status.resolve()
    } catch (err) {
      alert(err)
      this.status.reject()
    }
  },
  methods: {
    setCurrentScreening() {
      this.currentMovie.screenings.forEach((el) => {
        for (const date in el.dates) {
          const screenings = el.dates[date]
          const screening = screenings.find(
            (el2) => el2.id === parseInt(this.$route.query.screening)
          )
          if (screening) {
            this.currentScreening = {
              id: screening.id,
              date,
              startTime: screening.start_time,
            }
          }
        }
      })
    },
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
}

.booking-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}

.booking__form {
  border-top: 1px solid var(--color-muted);
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-4);
}

@media only screen and (min-width: 720px) {
  .header {
    grid-template-columns: 250px auto;
    gap: var(--spacing-8);
  }

  .summary {
    display: grid;
  }
}
</style>
