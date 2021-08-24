<template>
  <form @submit.prevent="onSubmit">
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
      <input id="phone-number" v-model="userInfo.phoneNumber" type="text" />
    </div>
    <t-button class="mt-4" :loading="updateStatus.isLoading()"
      ><ph-checks class="mr-2" />Update</t-button
    >
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import notifyApiError from '~/mixins/notifyApiError'
import AsyncStatus from '~/utils/AsyncStatus'

export default {
  mixins: [notifyApiError],
  data() {
    return {
      updateStatus: new AsyncStatus(),
    }
  },
  computed: {
    ...mapState(['user']),
    userInfo() {
      return { ...this.user }
    },
  },
  methods: {
    onSubmit() {
      this.updateStatus.beginLoading()
      this.$store
        .dispatch(Actions.updateUserInfo, this.userInfo)
        .then(() => {
          this.$toast.success('We’ve updated your information successfully.')
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
