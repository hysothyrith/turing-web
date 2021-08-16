<template>
  <div class="wrapper">
    <theatre-screen />
    <div class="grid">
      <template v-for="i in 10">
        <div
          v-for="j in 15"
          :key="`${i},${j}`"
          class="d-flex justify-content-center"
        >
          <div class="seat" />
        </div>
      </template>
      <div class="overlay">
        <spinner v-if="loading" :size="24" />
        <span v-else> Select a cinema, date, and time to continue </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
  border: var(--b-width) solid var(--color-muted);
  padding: var(--spacing-4) var(--spacing-2);
  border-radius: 4px;
}

.grid {
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(15, 1fr);
  width: 100%;
  gap: 1px;
  overflow: scroll;
}

.seat {
  border-radius: 12px;
  min-width: 1.8rem;
  min-height: 1.8rem;
  border: 2px solid var(--color-muted);
  background-color: transparent;
  margin: var(--spacing-1);
  cursor: pointer;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-less-prominent);
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
