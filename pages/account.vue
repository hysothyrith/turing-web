<template>
  <div>
    <h1>Account</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { Mutations } from '~/constants'
export default {
  methods: {
    logout() {
      this.$store.commit(Mutations.CLEAR_AUTH_DATA)
      this.$router.push('/')
    },
  },
}
</script>
