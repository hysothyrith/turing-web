<template>
  <div>
    <h1>Account</h1>
    <div v-if="status.isResolved()">
      <div v-if="!objIsEmpty(summary.newScreenings)">
        <h2>Upcoming screenings</h2>
        <ul class="ticket__list">
          <li
            v-for="(screening, screeningId) in summary.newScreenings"
            :key="screeningId"
            class="ticket__item"
          >
            <movie-poster
              :src="screening.movie.poster"
              :movie-title="screening.movie.title"
            />
            <div>
              <tickets-summary
                :movie="screening.movie"
                :cinema-name="screening.cinema.name"
                :theatre-name="screening.details.theatre"
                :seat-names="screening.tickets.map((el) => el.seat).join(', ')"
                :date-string="screening.details.date"
                :time-string="screening.details.startTime"
              />
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!objIsEmpty(summary.pastScreenings)">
        <h2>Past tickets</h2>
        <ul class="ticket__list"></ul>
      </div>
      <div
        v-if="
          objIsEmpty(summary.newScreenings) &&
          objIsEmpty(summary.pastScreenings)
        "
      >
        You don’t have any tickets yet.
      </div>
      <!-- <pre>
      {{ tickets }}
      </pre> -->
    </div>
    <t-button @click="logout"><ph-sign-out class="mr-2" />Logout</t-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions, Mutations } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'

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
  data() {
    return {
      status: new AsyncStatus(),
    }
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
  },
  mounted() {
    this.status.beginLoading()
    this.$store.dispatch(Actions.getTickets).then(() => {
      this.status.resolve()
    })
  },
  methods: {
    logout() {
      this.$store.commit(Mutations.CLEAR_AUTH_DATA)
      this.$router.push('/')
    },
    objIsEmpty(obj) {
      return Object.keys(obj).length === 0
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
  grid-template-columns: 200px auto;
  gap: var(--spacing-8);
}
</style>
