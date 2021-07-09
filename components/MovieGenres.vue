<template>
  <small :style="{ color: 'var(--color-less-prominent)' }">{{
    allGenres
  }}</small>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array,
      required: true,
    },
  },
  computed: {
    allGenres() {
      return this.genres.join(', ')
    },
  },
}
</script>
