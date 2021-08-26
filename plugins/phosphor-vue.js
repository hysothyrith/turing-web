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
  PhPlus,
  PhTrashSimple,
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
    PhPlus,
    PhTrashSimple,
  }
)

Object.entries(icons).forEach(([iconName, icon]) => {
  Vue.component(iconName, icon)
})
