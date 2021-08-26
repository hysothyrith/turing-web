<template>
  <fade-transition>
    <simple-loading-box v-if="$fetchState.pending" />
    <div v-else>
      <p v-if="paymentMethods.length === 0 && !formIsActive">
        You don’t have any payment methods yet.
      </p>
      <ul v-else class="method__list">
        <li
          v-for="method in paymentMethods"
          :key="method.id"
          class="method__item"
        >
          <div class="ts">{{ method.brand }} ending in {{ method.last4 }}</div>
          <t-confirmation-button
            variant="text"
            color="negative"
            :loading="method.id === deletingId"
            @on-confirm="deletePaymentMethod(method.id)"
            >Delete</t-confirmation-button
          >
        </li>
      </ul>
      <credit-card-form
        v-if="formIsActive"
        @on-complete="formIsActive = false"
      />
      <t-button v-if="!formIsActive" @click="formIsActive = true"
        ><ph-plus class="mr-2" />Add new</t-button
      >
    </div>
  </fade-transition>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'
import notifyApiError from '~/mixins/notifyApiError'

export default {
  mixins: [notifyApiError],
  data() {
    return {
      formIsActive: false,
      deletingId: 0,
    }
  },
  async fetch() {
    await this.$store.dispatch(Actions.getPaymentMethods)
  },
  computed: {
    ...mapState(['paymentMethods']),
  },
  methods: {
    onAddClick() {
      this.formIsActive = true
    },
    deletePaymentMethod(id) {
      this.deletingId = id
      this.$store
        .dispatch(Actions.deletePaymentMethod, id)
        .then(() => {
          this.$toast.success('Payment method deleted successfully.')
        })
        .catch(this.notifyApiError)
        .finally(() => {
          this.deletingId = 0
        })
    },
  },
}
</script>

<style scoped>
.method__list {
  list-style: none;
  padding-left: 0;
  margin-bottom: var(--spacing-6);
}

.method__item {
  border-bottom: 1px solid var(--color-muted);
  padding: var(--spacing-3) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
