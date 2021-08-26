<template>
  <div class="tabs">
    <ul class="tabs__header" role="tablist" aria-label="Tabs">
      <li v-for="(tab, i) in tabs" :key="tab.title">
        <button
          role="tab"
          :aria-selected="i === selectedIndex"
          :class="['tab__header', { selected: i === selectedIndex }]"
          @click="selectTab(i)"
        >
          {{ tab.title }}
        </button>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.selectedIndex = this.$children.findIndex((el) => el.selected)
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i
      this.tabs.forEach((tab, tabIndex) => {
        tab.isActive = tabIndex === i
      })
    },
  },
}
</script>

<style scoped>
.tabs__header {
  list-style: none;
  display: flex;
  padding-left: 0;
  border-bottom: 1px solid var(--color-muted);
  padding-bottom: var(--spacing-2);
}

.tab__header {
  font-size: var(--size-h5);
  color: var(--color-primary);
  background-color: transparent;
  padding-left: 0;
  margin-right: var(--spacing-4);
  border: none;
}

.tab__header.selected {
  color: var(--color-prominent);
}
</style>
