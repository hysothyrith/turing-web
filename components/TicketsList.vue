<template>
  <ul class="ticket__list">
    <li
      v-for="(screening, screeningId) in screenings"
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
          :seat-names="screening.tickets.map((el) => el.seat).join(', ')"
          :date-string="screening.details.date"
          :time-string="screening.details.startTime"
        />
        <t-button
          v-if="showTickets"
          class="mt-6"
          @click="
            $emit('show-tickets-click', {
              movie: screening.movie,
              tickets: screening.tickets,
            })
          "
          ><ph-ticket class="mr-2" />Show tickets</t-button
        >
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    screenings: {
      type: Object,
      required: true,
    },
    showTickets: {
      type: Boolean,
      default: true,
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
