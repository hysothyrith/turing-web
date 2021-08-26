<template>
  <div>
    <div v-show="!formIsActive">
      <h2 class="mb-4">Payment method</h2>
      <fade-transition>
        <simple-loading-box v-if="$fetchState.pending" />
        <div v-else>
          <div v-if="paymentMethods.length === 0">
            You don’t have any payment methods yet.
          </div>
          <ul class="method__list">
            <li
              v-for="method in paymentMethods"
              :key="method.id"
              :class="['method__item', { selected: method.id === value }]"
            >
              <div class="ts">
                {{ method.brand }} ending in {{ method.last4 }}
              </div>
              <t-button
                variant="text"
                class="select__button"
                :disabled="value === method.id"
                @click="$emit('change', method.id)"
              >
                {{ value !== method.id ? 'Select' : 'Selected' }}
              </t-button>
            </li>
          </ul>

          <t-button
            variant="text"
            @click.prevent="
              $emit('form-show')
              formIsActive = true
            "
            ><ph-plus class="mr-2" />Add new</t-button
          >
        </div>
      </fade-transition>
    </div>
    <credit-card-form
      v-show="formIsActive"
      @on-complete="
        $emit('form-hide')
        formIsActive = false
      "
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Actions } from '~/constants'

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      formIsActive: false,
    }
  },
  async fetch() {
    await this.$store.dispatch(Actions.getPaymentMethods)
  },
  computed: mapState(['paymentMethods']),
}
</script>

<style scoped>
.method__list {
  list-style: none;
  padding-left: 0;
  margin-bottom: var(--spacing-2);
}

.method__item {
  border-bottom: 1px solid var(--color-muted);
  padding: var(--spacing-3) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.method__item.selected {
  color: var(--color-prominent);
  font-weight: bold;
}
</style>
