<template>
  <div>
    <div class="d-flex align-items-center mb-8">
      <h1 class="d-flex flex-grow-1 mb-0">Account</h1>
      <t-button variant="text" @click="onLogoutClick"
        ><ph-sign-out class="mr-2" />Log out</t-button
      >
    </div>
    <main>
      <t-tabs>
        <t-tab title="Profile" selected class="tab">
          <profile-update-form />
        </t-tab>
        <t-tab title="Change password" class="tab">
          <password-update-form />
        </t-tab>
        <t-tab title="Payment methods" class="tab"> Under construction </t-tab>
      </t-tabs>
    </main>
  </div>
</template>

<script>
import { Mutations } from '~/constants'

export default {
  data() {
    return {
      userInfo: null,
    }
  },
  methods: {
    onLogoutClick() {
      this.$store.commit(Mutations.CLEAR_AUTH_DATA)
      this.$toast.info('Logged out successfully.')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.tab {
  max-width: 720px;
}
</style>
