<template>
  <div class="tabs HIDE-DEBUG">
    <ul class="tabs__header DEBUG-R">
      <li v-for="(tab, i) in tabs" :key="tab.title">
        <button
          :class="['tab__header DEBUG-G', { selected: i === selectedIndex }]"
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
  /* border: none; */
  /* outline: none; */
  padding-left: 0;
  margin-right: var(--spacing-6);
}

.tab__header.selected {
  color: var(--color-prominent);
}
</style>
