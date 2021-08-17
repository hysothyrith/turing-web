import Vue from 'vue'
// import PhosphorVue from 'phosphor-vue'

// Vue.use(PhosphorVue)

import {
  PhPlay,
  PhTicket,
  PhCaretRight,
  PhCaretLeft,
  PhCaretDown,
  PhCheck,
} from 'phosphor-vue'

const icons = Object.assign(
  {},
  {
    PhPlay,
    PhTicket,
    PhCaretRight,
    PhCaretLeft,
    PhCaretDown,
    PhCheck,
  }
)

Object.entries(icons).forEach(([iconName, icon]) => {
  Vue.component(iconName, icon)
})
