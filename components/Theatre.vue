<template>
  <div class="wrapper">
    <theatre-screen style="opacity: 0.9" />
    <div
      class="grid"
      :style="{ gridTemplateColumns: `repeat(${value.cols}, 1fr)` }"
    >
      <template v-for="(row, i) in value.grid">
        <template v-for="(cell, j) in row">
          <div :key="`${i},${j}`" class="cell">
            <button
              v-if="cell"
              v-tooltip="
                seatIsAvailable(cell)
                  ? `${cell.designation} | ${cell.type.name}`
                  : 'Seat unavailable'
              "
              class="seat"
              :disabled="!seatIsAvailable(cell)"
              :style="{
                borderColor: cell.type.color,
                backgroundColor: seatIsSelected(cell)
                  ? cell.type.color
                  : 'transparent',
              }"
              @click="onSeatClick(cell)"
            ></button>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedSeats: [],
    }
  },
  methods: {
    onSeatClick(seat) {
      if (this.seatIsSelected(seat)) {
        this.selectedSeats = this.selectedSeats.filter(
          (el) => el.id !== seat.id
        )
      } else {
        this.selectedSeats.push(seat)
      }
      this.$emit('change', this.selectedSeats)
    },
    seatIsSelected(seat) {
      return this.selectedSeats.some((el) => el.id === seat.id)
    },
    seatIsAvailable(seat) {
      return !seat.booked && seat.active
    },
  },
}
</script>

<style scoped>
.wrapper {
  border: var(--b-width) solid var(--color-muted);
  padding: var(--spacing-4) var(--spacing-2);
}

.grid {
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 1px;
  border-radius: 4px;
  width: 100%;
  overflow: scroll;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.seat {
  border-radius: 12px;
  min-width: 1.8rem;
  min-height: 1.8rem;
  border-width: 2px;
  border-style: solid;
  background-color: transparent;
  margin: var(--spacing-1);
  cursor: pointer;
}

.seat:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
</style>
