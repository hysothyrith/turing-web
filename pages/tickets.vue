<template>
  <div>
    <h1>Tickets</h1>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <div v-else>
        <div v-if="!objIsEmpty(summary.newScreenings)">
          <h2>Upcoming screenings</h2>
          <tickets-list
            :screenings="summary.newScreenings"
            @show-tickets-click="onShowTicketsClick"
          />
        </div>
        <div v-if="!objIsEmpty(summary.pastScreenings)">
          <h2>Past tickets</h2>
          <tickets-list
            :screenings="summary.pastScreenings"
            :show-tickets="false"
          />
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
