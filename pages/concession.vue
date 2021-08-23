<template>
  <div>
    <h1>Concession</h1>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <main v-else>
        <div v-for="({ products }, category) in concession" :key="category">
          <h2>{{ category }}</h2>
          <ul class="product__list">
            <li
              v-for="product in products"
              :key="product.id"
              class="product__item"
            >
              <div>
                <img
                  :src="product.photo"
                  :alt="`Photo of ${product.name}`"
                  class="img img--cover"
                />
              </div>
              <h3 class="h5-size mt-4">{{ product.name }}</h3>
            </li>
          </ul>
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
    await this.$store.dispatch(Actions.getConcession)
  },
  computed: {
    ...mapState(['concession']),
  },
}
</script>

<style scoped>
.product__list {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--spacing-4);
}

.product__item {
  display: grid;
  grid-template-rows: 150px auto;
  border-bottom: 1px solid var(--color-muted);
}

.product__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media only screen and (min-width: 576px) {
  .product__list {
    gap: var(--spacing-8);
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .product__item {
    border-bottom: none;
    grid-template-rows: 240px auto;
  }
}
</style>
