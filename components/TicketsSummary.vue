<template>
  <div class="summary">
    <h2 class="mb-2 h3-size">{{ movie.title }}</h2>
    <div>
      <movie-genres :genres="movie.genres" class="mr-2" />
      <movie-rating class="mr-2">{{ movie.rating }}</movie-rating>
      <small v-if="movie.runtime">{{ movie.runtime }} mins</small>
    </div>
    <div class="summary__grid mt-4">
      <div>
        <strong class="d-block text-prominent">Cinema</strong>
        {{ cinemaName }}
      </div>
      <div>
        <strong class="d-block text-prominent">Theatre</strong>
        {{ theatreName }}
      </div>
      <div>
        <strong class="d-block text-prominent">Seat</strong>
        {{ seatNames }}
      </div>
      <div>
        <strong class="d-block text-prominent">Date</strong>
        <span class="nowrap">{{ formattedDate }}</span> at
        <span class="nowrap">{{ formattedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate, formatTime } from '~/utils/dateTools'

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
    cinemaName: {
      type: String,
      required: true,
    },
    theatreName: {
      type: String,
      required: true,
    },
    seatNames: {
      type: String,
      required: true,
    },
    dateString: {
      type: String,
      required: true,
    },
    timeString: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return formatDate(this.dateString)
    },
    formattedTime() {
      return formatTime(this.timeString)
    },
  },
}
</script>

<style scoped>
.summary__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2);
}

@media only screen and (min-width: 768px) {
  .summary__grid {
    grid-template-columns: 1fr 2fr;
    gap: var(--spacing-4);
  }
}
</style>
