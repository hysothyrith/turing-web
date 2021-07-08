<template>
  <small class="rating">{{ rating }}</small>
</template>

<script>
export default {
  props: {
    rating: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.rating {
  color: var(--color-less-prominent);
  border: 1px solid var(--color-less-prominent);
  padding: 2px var(--spacing-2);
}
</style>
