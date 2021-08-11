<template>
  <div class="cell">
    <theater-seat v-if="val !== -1" :seat="{ val }" />
    <div v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.cell {
  display: grid;
  padding: var(--spacing-1);
}
</style>
