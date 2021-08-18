<template>
  <div>
    <h1>Tickets</h1>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <div v-else>
        <div v-if="!objIsEmpty(summary.newScreenings)">
          <h2>Upcoming screenings</h2>
          <ul class="ticket__list">
            <li
              v-for="(screening, screeningId) in summary.newScreenings"
              :key="screeningId"
              class="ticket__item"
            >
              <div>
                <picture class="movie__picture">
                  <source
                    :srcset="`${$config.BASE_URL}/uploads/images/w500/${screening.movie.poster}`"
                    media="(min-width: 768px)"
                  />
                  <img
                    :src="`${$config.BASE_URL}/uploads/images/w500/${screening.movie.backdrop}`"
                    :alt="`${screening.movie.title} media image`"
                  />
                </picture>
              </div>
              <div>
                <tickets-summary
                  :movie="screening.movie"
                  :cinema-name="screening.cinema.name"
                  :theatre-name="screening.details.theatre"
                  :seat-names="
                    screening.tickets.map((el) => el.seat).join(', ')
                  "
                  :date-string="screening.details.date"
                  :time-string="screening.details.startTime"
                />
                <t-button
                  class="mt-6"
                  @click="
                    onShowTicketsClick({
                      movie: screening.movie,
                      tickets: screening.tickets,
                    })
                  "
                  ><ph-ticket class="mr-2" />Show tickets</t-button
                >
              </div>
            </li>
          </ul>
        </div>
        <div v-if="!objIsEmpty(summary.pastScreenings)">
          <h2>Past tickets</h2>
          <ul class="ticket__list">
            <li
              v-for="(screening, screeningId) in summary.pastScreenings"
              :key="screeningId"
              class="ticket__item"
            >
              <div>
                <picture class="movie__picture">
                  <source
                    :srcset="`${$config.BASE_URL}/uploads/images/w500/${screening.movie.poster}`"
                    media="(min-width: 768px)"
                  />
                  <img
                    :src="`${$config.BASE_URL}/uploads/images/w500/${screening.movie.backdrop}`"
                    :alt="`${screening.movie.title} media image`"
                  />
                </picture>
              </div>
              <div>
                <tickets-summary
                  :movie="screening.movie"
                  :cinema-name="screening.cinema.name"
                  :theatre-name="screening.details.theatre"
                  :seat-names="
                    screening.tickets.map((el) => el.seat).join(', ')
                  "
                  :date-string="screening.details.date"
                  :time-string="screening.details.startTime"
                />
              </div>
            </li>
          </ul>
        </div>
        <div v-if="noTickets">You don’t have any tickets yet.</div>
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import TicketsModal from '~/components/TicketsModal'
import notifyApiError from '~/mixins/notifyApiError'
import preloadImages from '~/utils/preloadImages'

function groupScreenings(screenings) {
  return screenings.reduce((acc, el) => {
    const stringId = el.screening.id.toString()
    if (!acc[stringId]) {
      acc[stringId] = {
        details: el.screening,
        cinema: el.cinema,
        movie: el.movie,
        tickets: [],
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { screening, cinema, movie, ...rest } = el
    acc[stringId].tickets.push(rest)

    return acc
  }, {})
}

export default {
  mixins: [notifyApiError],
  meta: {
    auth: {
      protected: true,
    },
  },
  data() {
    return {
      qrs: null /* Hold references to the qr images to prevent browser from clearing cache */,
    }
  },
  async fetch() {
    await this.$store.dispatch(Actions.getTickets).catch(this.notifyApiError)
    preloadImages(
      this.tickets
        .filter((el) => !el.checkedIn)
        .map((el) => this.getQrUrl(el.id))
    ).then((imgs) => {
      this.qrs = imgs
    })
  },
  computed: {
    ...mapState(['tickets']),
    summary() {
      const summary = this.tickets.reduce(
        (acc, ticket) => {
          if (ticket.checkedIn) {
            acc.pastScreenings.push(ticket)
          } else {
            acc.newScreenings.push(ticket)
          }
          return acc
        },
        { newScreenings: [], pastScreenings: [] }
      )

      summary.newScreenings = groupScreenings(summary.newScreenings)
      summary.pastScreenings = groupScreenings(summary.pastScreenings)

      return summary
    },
    noTickets() {
      return (
        this.objIsEmpty(this.summary.newScreenings) &&
        this.objIsEmpty(this.summary.pastScreenings)
      )
    },
  },
  methods: {
    objIsEmpty(obj) {
      return Object.keys(obj).length === 0
    },
    onShowTicketsClick({ movie, tickets }) {
      this.$modal.show(
        TicketsModal,
        { movie, tickets },
        { adaptive: true, height: 'auto' }
      )
    },
    getQrUrl(payload) {
      return `https://api.qrserver.com/v1/create-qr-code/?data=${payload}!&size=500x500`
    },
  },
}
</script>

<style scoped>
.ticket__list {
  list-style: none;
  padding: 0;
}

.ticket__item {
  display: grid;
  grid-template-rows: 120px;
  grid-auto-rows: min-content;
  gap: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  margin-bottom: var(--spacing-8);
  border-bottom: var(--b-width) solid var(--color-muted);
}

.movie__picture img {
  object-fit: cover;
  object-position: top;
}

@media only screen and (min-width: 768px) {
  .ticket__item {
    grid-template-columns: 200px auto;
    grid-template-rows: min-content;
    gap: var(--spacing-8);
  }

  .ticket__item .poster {
    display: block;
  }

  .ticket__item .backdrop {
    display: none;
  }
}
</style>
