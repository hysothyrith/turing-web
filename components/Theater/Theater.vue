<template>
  <div class="theater">
    Theater component
    {{ theater.id }}
    <div class="screen__wrapper">
      <div class="screen" />
      <div class="screen__shine" />
    </div>
    <div
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${theater.cols + 1}, 1fr)`,
      }"
    >
      <template v-for="(row, i) in theater.grid">
        {{ getLetter(i) }}
        <!-- <theater-cell
          v-for="(cell, j) in row"
          :key="`${i},${j}`"
          :row="getRow"
          :col="getCol"
          :val="cell"
        /> -->
        <div v-for="(cell, j) in row" :key="`${i},${j}`" class="cell">
          <theater-seat
            v-if="cell !== -1"
            :seat="{
              val: cell,
              row: i,
              col: j,
              designation: getDesignation(i, j),
            }"
            @on-select="select"
            @on-deselect="deselect"
          />
        </div>
      </template>
    </div>
    <div>Selected: {{ selected }}</div>
  </div>
</template>

<script>
export default {
  props: {
    theater: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
      colSkips: null,
    }
  },
  created() {
    this.colSkips = [...Array(this.theater.rows)].map(() =>
      Array(this.theater.cols).fill(0)
    )
    const { grid } = this.theater
    grid.forEach((row, i) => {
      for (let j = 0; j < row.length - 1; j++) {
        const val = row[j]
        if (val === -1) {
          this.colSkips[i][j] += 1
        }
        this.colSkips[i][j + 1] = this.colSkips[i][j]
      }
    })
  },
  methods: {
    getRow() {
      this.colIndex = 0
      return this.rowIndex++ % this.theater.rows
    },
    getCol() {
      return this.colIndex++ % this.theater.cols
    },
    getLetter(i) {
      return String.fromCharCode(i + 65)
    },
    select(seat) {
      this.selected.push(seat)
    },
    deselect(seat) {
      this.selected = this.selected.filter(
        ({ designation }) => designation !== seat.designation
      )
    },
    getDesignation(row, col) {
      return `${this.getLetter(row)}${col - this.colSkips[row][col]}`
    },
  },
}
</script>

<style scoped>
.theater {
  padding: var(--spacing-8) var(--spacing-4);
  border: 1px solid red;
  overflow-x: scroll;
  max-width: 100%;
}

.screen__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);
}

.screen {
  height: 8px;
  width: 70%;
  background-color: var(--color-prominent);
}

.screen__shine {
  width: 70%;
  height: 40px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.5690651260504201) 20%,
    rgba(255, 255, 255, 0.20211834733893552) 60%,
    rgba(255, 255, 255, 0) 100%
  );
}

.grid {
  display: grid;
  justify-items: center;
  align-items: center;
}

.cell {
  display: grid;
  padding: var(--spacing-1);
}
</style>
