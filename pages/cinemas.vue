<template>
  <div>
    <h1>Cinemas</h1>
    <fade-transition>
      <loading-box v-if="$fetchState.pending" />
      <main v-else>
        <pre>
        {{ cinemas }}
        </pre>
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
