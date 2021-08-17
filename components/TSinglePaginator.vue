<template>
  <div class="wrapper">
    <t-button
      class="control control--prev"
      aria-label="Previous ticket"
      :disabled="currentIndex === 0"
      @click="$emit('change', items[currentIndex - 1])"
    >
      <ph-caret-left :size="22" />
    </t-button>
    <span class="label__wrapper">
      <slot name="label" :item="items[currentIndex]">
        <span>
          {{ items[currentIndex][label] }}
        </span>
      </slot>
    </span>
    <t-button
      class="control control--next"
      aria-label="Next ticket"
      :disabled="currentIndex === items.length - 1"
      @click="$emit('change', items[currentIndex + 1])"
    >
      <ph-caret-right :size="22" />
    </t-button>
  </div>
</template>

<script>
export default {
  model: {
    props: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    trackBy: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentIndex() {
      if (!this.value) return 0
      return this.items.findIndex(
        (el) => el[this.trackBy] === this.value[this.trackBy]
      )
    },
  },
}
</script>

<style scoped>
.wrapper {
  border: 1px solid var(--color-muted);
  border-radius: var(--b-radius);
  display: flex;
  padding: 0;
}

.label__wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
}

.control {
  border-radius: 0;
  padding: var(--spacing-2) var(--spacing-4);
}

.control--next {
  border-top-right-radius: var(--b-radius);
  border-bottom-right-radius: var(--b-radius);
}

.control--prev {
  border-top-left-radius: var(--b-radius);
  border-bottom-left-radius: var(--b-radius);
}
</style>
