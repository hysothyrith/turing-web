<template>
  <div>
    <h1>Cinemas</h1>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <main v-else class="main">
        <div
          v-for="(cinema, i) in cinemas"
          :key="cinema.id"
          :class="['cinema__item ', { large: i % 8 === 0 }]"
        >
          <div>
            <img
              class="cinema__image"
              :src="cinema.photo"
              :alt="`Photo of ${cinema.name}`"
            />
          </div>
          <div>
            <h3 class="h5-size mt-4 mb-1">{{ cinema.name }}</h3>
          </div>
          <div class="mb-6">
            <small>{{ cinema.location }}</small>
          </div>
        </div>
      </main>
    </fade-transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'

export default {
  async fetch() {
    await this.$store.dispatch(Actions.getCinemas)
  },
  computed: {
    ...mapState(['cinemas']),
  },
}
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  gap: var(--spacing-4);
}

.cinema__item {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr auto auto;
}

.cinema__image {
  object-fit: cover;
}

.cinema__item.large {
  grid-column: span 2;
  grid-row: span 2;
}

@media only screen and (min-width: 768px) {
  .main {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
