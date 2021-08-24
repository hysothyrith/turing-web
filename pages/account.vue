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
          <form @submit.prevent="onProfileFormSubmit">
            <div class="input-group">
              <label for="name">Name</label>
              <input id="name" v-model="userInfo.name" type="text" />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input id="email" v-model="userInfo.email" type="email" />
            </div>
            <div class="input-group">
              <label for="phone-number">Phone number</label>
              <input
                id="phone-number"
                v-model="userInfo.phoneNumber"
                type="text"
              />
            </div>
            <t-button class="mt-4" :loading="updateStatus.isLoading()"
              ><ph-checks class="mr-2" />Update</t-button
            >
          </form>
        </t-tab>
        <t-tab title="Change password"> Under construction </t-tab>
        <t-tab title="Payment methods"> Under construction </t-tab>
      </t-tabs>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions, Mutations } from '~/constants'
import AsyncStatus from '~/utils/AsyncStatus'
import notifyApiError from '~/mixins/notifyApiError'

export default {
  mixins: [notifyApiError],
  data() {
    return {
      userInfo: null,
      updateStatus: new AsyncStatus(),
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.userInfo = { ...this.user }
  },
  methods: {
    onLogoutClick() {
      this.$store.commit(Mutations.CLEAR_AUTH_DATA)
      this.$toast.info('Logged out successfully.')
      this.$router.push('/')
    },
    onProfileFormSubmit() {
      this.updateStatus.beginLoading()
      this.$store
        .dispatch(Actions.updateUserInfo, this.userInfo)
        .then(() => {
          this.$toast.success('We’ve updated your information successfully.')
          this.userInfo = { ...this.user }
          this.updateStatus.resolve()
        })
        .catch((err) => {
          this.updateStatus.reject()
          this.notifyApiError(err)
        })
    },
  },
}
</script>

<style scoped>
.tab {
  max-width: 720px;
}
</style>
