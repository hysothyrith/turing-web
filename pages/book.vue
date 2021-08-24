<template>
  <div>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <main v-else>
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
            class="ticket-summary"
          />
        </div>
        <div class="payment__form-wrapper">
          <div>
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

            <form
              v-if="isAuthenticated"
              class="payment__form"
              @submit.prevent="onSubmit"
            >
              <h2>Payment details</h2>
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
              <t-button type="submit" :loading="purchaseStatus.isLoading()"
                ><ph-checks class="mr-2" />Confirm</t-button
              >
            </form>
            <div v-else class="d-flex align-items-center">
              <t-button @click.prevent="$modal.show('login')"
                ><ph-sign-in class="mr-2" />Log&nbsp;in</t-button
              >
              <span class="ml-3">or</span>
              <t-button
                variant="text"
                class="mx-2"
                @click.prevent="$modal.show('signup')"
                >Sign&nbsp;up</t-button
              >
              to continue
            </div>
          </div>
        </div>
      </main>
    </fade-transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Actions } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'
import notifyApiError from '~/mixins/notifyApiError'

export default {
  mixins: [notifyApiError],
  data() {
    return {
      purchaseStatus: new AsyncStatus(),
    }
  },
  async fetch() {
    this.seats = this.$route.query.seats
    await Promise.all([
      this.$store.dispatch(Actions.getMovie, this.$route.query.movie),
      this.$store.dispatch(Actions.getScreening, this.$route.query.screening),
    ]).catch(this.notifyApiError)
  },
  computed: {
    ...mapState(['currentMovie', 'currentScreening']),
    ...mapGetters(['isAuthenticated']),
    currentScreeningInfo() {
      if (!this.currentMovie) return null
      const res = this.currentMovie.screenings.find((el) => {
        return Object.entries(el.dates).find(([_, screenings]) => {
          return screenings.find(
            (screening) =>
              screening.id === parseInt(this.$route.query.screening)
          )
        })
      })
      const [date, screenings] = Object.entries(res.dates)[0]
      return { id: screenings[0].id, date, startTime: screenings[0].start_time }
    },
    selectedSeats() {
      const { grid } = this.currentScreening.theatre
      const seatsQuery = this.$route.query.seats
      const seatIds = (
        Array.isArray(seatsQuery) ? seatsQuery : [seatsQuery]
      ).map((id) => parseInt(id))
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
  methods: {
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
          this.$toast.success('Ticket purchased successfully.')
          this.$router.push('/tickets')
        })
        .catch(this.notifyApiError)
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

.ticket-summary {
  grid-column: span 2;
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

@media only screen and (min-width: 768px) {
  .header {
    grid-template-columns: 250px auto;
    gap: var(--spacing-8);
  }

  .ticket-summary {
    grid-column: span 1;
  }

  .summary {
    display: grid;
  }
}
</style>
