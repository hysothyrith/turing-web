<template>
  <form @submit.prevent="onSubmit">
    <h3 class="h5-size">Card details</h3>
    <div class="payment__fields-wrapper mb-4">
      <div class="card-number__field">
        <label for="card-number">Card number</label>
        <input
          id="card-number"
          v-model="number"
          v-mask="'#### #### #### ####'"
          type="text"
          placeholder="1234 1234 1234 1234"
        />
      </div>
      <div class="input-group">
        <label for="cvc">CVC</label>
        <input
          id="cvc"
          v-model="cvc"
          v-mask="'###'"
          type="text"
          placeholder="123"
        />
      </div>
      <div class="input-group">
        <label for="expiration">Expiration</label>
        <input
          id="expiration"
          v-model="expiration"
          v-mask="'##/##'"
          type="text"
          placeholder="MM/YY"
        />
      </div>
    </div>
    <div class="d-flex align-items-center">
      <t-button type="submit" :loading="status.isLoading()"
        ><ph-checks class="mr-2" />Confirm</t-button
      >
      <t-button
        variant="text"
        type="submit"
        :loading="status.isLoading()"
        class="mx-4"
        @click="$emit('on-complete')"
        >Cancel</t-button
      >
    </div>
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
      number: '',
      cvc: '',
      expiration: '',
      status: new AsyncStatus(),
    }
  },
  methods: {
    onSubmit() {
      const [expMonth, expYear] = this.expiration.split('/')
      if (!expMonth || !expYear) {
        this.$toast.error('Please enter a valid card expiration date.')
        return
      }
      this.status.beginLoading()
      const { number, cvc } = this
      this.$store
        .dispatch(Actions.addPaymentMethod, {
          number,
          cvc,
          expMonth,
          expYear,
        })
        .then(() => {
          this.status.resolve()
          this.$toast.success('Payment method added successfully.')
          this.$emit('on-complete')
        })
        .catch((err) => {
          this.status.reject()
          this.notifyApiError(err)
        })
    },
  },
}
</script>

<style scoped>
.card-number__field {
  grid-column: span 2;
}
.payment__fields-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}
</style>
