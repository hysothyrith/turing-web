<template>
  <fade-transition>
    <loading-box v-if="$fetchState.isPending" />
    <div v-else>
      <pre>
        {{ paymentMethods }}
      </pre>
      <credit-card-form
        v-if="formIsActive"
        @on-complete="formIsActive = false"
      />
      <t-button v-if="!formIsActive" class="mt-4" @click="formIsActive = true"
        ><ph-plus class="mr-2" />Add new</t-button
      >
    </div>
  </fade-transition>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'

export default {
  data() {
    return {
      formIsActive: false,
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
  },
}
</script>
