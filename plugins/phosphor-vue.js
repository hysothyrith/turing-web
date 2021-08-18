import Vue from 'vue'

import {
  PhPlay,
  PhTicket,
  PhCaretRight,
  PhCaretLeft,
  PhCaretDown,
  PhChecks,
  PhQrCode,
  PhSignIn,
  PhSignOut,
} from 'phosphor-vue'

const icons = Object.assign(
  {},
  {
    PhPlay,
    PhTicket,
    PhCaretRight,
    PhCaretLeft,
    PhCaretDown,
    PhChecks,
    PhQrCode,
    PhSignIn,
    PhSignOut,
  }
)

Object.entries(icons).forEach(([iconName, icon]) => {
  Vue.component(iconName, icon)
})
