<template>
  <button
    class="seat"
    :disabled="seat.val === 0"
    :class="{ selected: isSelected }"
    @click="onClick"
  >
    <!-- {{ seat.row }}, {{ seat.col }} -->
    {{ seat.designation }}
  </button>
</template>

<script>
export default {
  props: {
    seat: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSelected: false,
    }
  },
  methods: {
    onClick() {
      if (!this.isSelected) {
        this.$emit('on-select', this.seat)
      } else {
        this.$emit('on-deselect', this.seat)
      }
      this.isSelected = !this.isSelected
    },
  },
}
</script>

<style scoped>
.seat {
  padding: var(--spacing-3);
  border-radius: 8px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.seat:hover {
  border-color: var(--color-prominent);
}

.seat:disabled {
  cursor: not-allowed;
  border-color: var(--color-muted);
}

.selected {
  border-color: red;
}
</style>
