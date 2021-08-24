<template>
  <form @submit.prevent="onSubmit">
    <div class="input-group">
      <label for="old-password">Old password</label>
      <input id="old-password" v-model="oldPassword" type="password" required />
    </div>
    <div class="input-group">
      <label for="new-password">New password</label>
      <input id="new-password" v-model="newPassword" type="password" required />
    </div>
    <div class="input-group">
      <label for="confirm-new-password">Confirm new password</label>
      <input
        id="confirm-new-password"
        v-model="newPasswordConfirmation"
        type="password"
        required
      />
    </div>
    <t-button class="mt-4" :loading="updateStatus.isLoading()"
      ><ph-checks class="mr-2" />Change</t-button
    >
  </form>
</template>

<script>
import { Actions } from '~/constants'
import notifyApiError from '~/mixins/notifyApiError'
import AsyncStatus from '~/utils/AsyncStatus'

export default {
  mixins: [notifyApiError],
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      updateStatus: new AsyncStatus(),
    }
  },
  methods: {
    onSubmit() {
      if (this.newPassword !== this.newPasswordConfirmation) {
        this.$toast.error('Your new password and confirmation don’t match.')
        return
      }

      this.updateStatus.beginLoading()
      const { oldPassword, newPassword } = this
      this.$store
        .dispatch(Actions.updatePassword, { oldPassword, newPassword })
        .then(() => {
          this.$toast.success('We’ve updated your password successfully.')
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
