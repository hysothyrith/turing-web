<template>
  <v-select v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
    <template #open-indicator="{ attributes }">
      <span v-bind="attributes" class="caret"><ph-caret-down /></span>
    </template>
  </v-select>
</template>

<script>
import vSelect from 'vue-select'
import { PhCaretDown } from 'phosphor-vue'

export default {
  components: {
    vSelect,
    PhCaretDown,
  },
}
</script>

<style lang="scss">
// $vs-colors: (
//   lightest: var(--color-prominent),
//   light: var(--color-primary),
//   dark: var(--color-primary),
//   darkest: var(--color-bg)
//     /* dark: var(--color-muted),
//   darkest: var(--color-bg), */,
// );

// //  Global Component Variables
// $vs-component-line-height: 2;
// $vs-component-placeholder-color: var(--color-less-prominent);

// //  Active State
// $vs-state-active-bg: #5897fb;
// $vs-state-active-color: #fff;

// //  Disabled State
// $vs-state-disabled-bg: var(--color-muted);

// /* $vs-state-disabled-bg: var(--color-muted);
// $vs-state-disabled-color: var(--color-muted);
// $vs-state-disabled-controls-color: var(--color-muted); */
// $vs-state-disabled-cursor: not-allowed;

// //  Borders
// $vs-border-width: 1px;
// $vs-border-style: solid;
// $vs-border-radius: var(--b-radius);
// $vs-border-color: var(--color-muted);

// //  Component Controls: Clear, Open Indicator
// $vs-controls-color: map_get($vs-colors, 'light');
// $vs-controls-size: 1;
// $vs-controls-deselect-text-shadow: 0 1px 0 #fff;

// //  Selected
// $vs-selected-bg: #f0f0f0;
// $vs-selected-border-color: $vs-border-color;
// $vs-selected-border-style: $vs-border-style;
// $vs-selected-border-width: $vs-border-width;

// //  Dropdown
// $vs-dropdown-z-index: 1000;
// $vs-dropdown-min-width: 160px;
// $vs-dropdown-max-height: 350px;
// $vs-dropdown-box-shadow: 0 3px 6px 0 map_get($vs-colors, 'darkest');
// $vs-dropdown-bg: #fff;

// @import 'vue-select/src/scss/vue-select.scss';

// .caret {
//   display: flex;
// }

$vs-colors: (
  lightest: var(--color-prominent),
  light: var(--color-primary),
  dark: #333,
  darkest: rgba(0, 0, 0, 0.15),
) !default;

//  Global Component Variables
$vs-component-line-height: 2 !default;
$vs-component-placeholder-color: var(--color-less-prominent) !default;

//  Active State
$vs-state-active-bg: var(--color-highlight) !default;
$vs-state-active-color: var(--color-prominent) !default;

//  Disabled State
$vs-state-disabled-bg: map_get($vs-colors, 'dark') !default;
$vs-state-disabled-color: map_get($vs-colors, 'dark') !default;
$vs-state-disabled-controls-color: map_get($vs-colors, 'dark') !default;
$vs-state-disabled-cursor: not-allowed !default;

//  Borders
$vs-border-width: 1px !default;
$vs-border-style: solid !default;
$vs-border-radius: 4px !default;
$vs-border-color: var(--color-muted) !default;

//  Component Controls: Clear, Open Indicator
$vs-controls-color: map_get($vs-colors, 'light') !default;
$vs-controls-size: 1 !default;
$vs-controls-deselect-text-shadow: 0 1px 0 #fff !default;

//  Selected
$vs-selected-bg: #f0f0f0 !default;
$vs-selected-border-color: $vs-border-color !default;
$vs-selected-border-style: $vs-border-style !default;
$vs-selected-border-width: $vs-border-width !default;

//  Dropdown
$vs-dropdown-z-index: 1000 !default;
$vs-dropdown-min-width: 160px !default;
$vs-dropdown-max-height: 350px !default;
$vs-dropdown-box-shadow: 0 3px 6px 0 map_get($vs-colors, 'darkest') !default;
$vs-dropdown-bg: var(--color-muted) !default;

@import 'vue-select/src/scss/vue-select.scss';

.caret {
  display: flex;
}

.vs__selected {
  color: var(--color-primary);
}

.vs__dropdown-option {
  color: var(--color-primary);
}
</style>
