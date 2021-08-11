<template>
  <small :style="{ color: 'var(--color-less-prominent)' }">{{
    genres.join(', ')
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
}
</script>
