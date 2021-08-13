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
        <tickets-summary
          :movie="currentMovie"
          :cinema-name="currentScreening.cinemaName"
          :theatre-name="currentScreening.theatre.name"
          :seat-names="selectedSeats.map((el) => el.designation).join(', ')"
          :date-string="currentScreeningInfo.date"
          :time-string="currentScreeningInfo.startTime"
        />
      </div>
      <div class="payment__form-wrapper">
        <div>
          <h2>Payment details</h2>
          <form class="payment__form" @submit.prevent="onSubmit">
            <div class="payment__fields-wrapper mb-4">
              <div class="input-group">
                <label for="cardholder-name">Cardholder name</label>
                <input id="cardholder-name" type="text" />
              </div>
              <div class="input-group">
                <label for="card-number">Card number</label>
                <input id="card-number" type="text" />
              </div>
              <div class="input-group">
                <label for="cvv">CVV</label>
                <input id="cvv" type="text" placeholder="123" />
              </div>
              <div class="input-group">
                <label for="expiration">Expiration</label>
                <input id="expiration" type="text" />
              </div>
            </div>
            <div class="mb-4">
              <h2>Purchase summary</h2>
              <ul class="seats__list">
                <li
                  v-for="(seats, type) in groupedSelectedSeats"
                  :key="type"
                  class="mb-3"
                >
                  <div class="d-flex justify-content-between">
                    <strong class="text-prominent">{{ type }}</strong>
                    ${{
                      seats.reduce((acc, el) => acc + el.price, 0).toFixed(2)
                    }}
                  </div>
                  <div>
                    {{ seats.length > 1 ? 'Seats' : 'Seat' }}
                    {{ seats.map((el) => el.designation).join(', ') }}
                  </div>
                </li>
              </ul>
              <div class="d-flex justify-content-end">
                <div>
                  <strong class="d-block text-prominent text-right"
                    >Total</strong
                  >
                  <span class="h5-size text-right"
                    >${{
                      selectedSeats
                        .reduce((acc, el) => acc + el.price, 0)
                        .toFixed(2)
                    }}</span
                  >
                </div>
              </div>
            </div>
            <t-button type="submit" :loading="purchaseStatus.isLoading()"
              ><ph-check class="mr-2" />Confirm</t-button
            >
          </form>
        </div>
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
      purchaseStatus: new AsyncStatus(),
      currentScreeningInfo: null,
    }
  },
  computed: {
    ...mapState(['currentMovie', 'currentScreening']),
    selectedSeats() {
      const { grid } = this.currentScreening.theatre
      const seatIds = this.$route.query.seats.map((id) => parseInt(id))
      const seats = []
      grid.forEach((row) => {
        row.forEach((cell) => {
          if (cell && seatIds.includes(cell.id)) {
            seats.push(cell)
            if (seats.length === seatIds.length) {
              return seats
            }
          }
        })
      })
      return seats
    },
    groupedSelectedSeats() {
      return this.selectedSeats.reduce((acc, seat) => {
        if (!acc[seat.type.name]) {
          acc[seat.type.name] = []
        }
        const { id, designation, price } = seat
        acc[seat.type.name].push({ id, designation, price })
        return acc
      }, {})
    },
  },
  async mounted() {
    this.status.beginLoading()
    this.seats = this.$route.query.seats
    try {
      await this.$store.dispatch(Actions.getMovie, this.$route.query.movie)
      this.setCurrentScreeningInfo()
      await this.$store.dispatch(
        Actions.getScreening,
        this.$route.query.screening
      )
      this.status.resolve()
    } catch (err) {
      alert(err)
      this.status.reject()
    }
  },
  methods: {
    setCurrentScreeningInfo() {
      this.currentMovie.screenings.forEach((el) => {
        for (const date in el.dates) {
          const screenings = el.dates[date]
          const screening = screenings.find(
            (el2) => el2.id === parseInt(this.$route.query.screening)
          )
          if (screening) {
            this.currentScreeningInfo = {
              id: screening.id,
              date,
              startTime: screening.start_time,
            }
          }
        }
      })
    },
    onSubmit() {
      this.purchaseStatus.beginLoading()

      this.$store
        .dispatch(Actions.purchaseTickets, {
          screeningId: this.currentScreeningInfo.id,
          cinemaName: this.currentScreening.cinemaName,
          theatreName: this.currentScreening.theatre.name,
          movieName: this.currentMovie.title,
          seats: this.selectedSeats.map((el) => el.id),
        })
        .then(() => {
          this.purchaseStatus.resolve()
          this.$router.push('/tickets')
        })
        .catch((err) => alert(err))
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

.payment__form-wrapper {
  border-top: 1px solid var(--color-muted);
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-4);
}

.payment__fields-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}

.seats__list {
  list-style: none;
  padding: 0;
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
