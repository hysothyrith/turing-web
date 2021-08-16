<template>
  <div>
    <h1>Account</h1>
    <div>
      <t-button @click="onLogoutClick">Log out</t-button>
    </div>
  </div>
</template>

<script>
import { Mutations } from '~/constants'

export default {
  methods: {
    onLogoutClick() {
      this.$store.commit(Mutations.CLEAR_AUTH_DATA)
      this.$toast.info('Logged out successfully.')
      this.$router.push('/')
    },
  },
}
</script>
