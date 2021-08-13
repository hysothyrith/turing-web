<template>
  <nav role="navigation">
    <ul class="link__list">
      <li class="flex-grow-1">
        <nuxt-link to="/" class="nav__brand">Turing Cinemas</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/showtimes" class="nav__item">Showtimes</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/cinemas" class="nav__item">Cinemas</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/concession" class="nav__item">Concession</nuxt-link>
      </li>
      <li v-if="isAuthenticated" class="p-relative">
        <t-button
          variant="text"
          class="nav__item"
          @click.stop="showDropdown = !showDropdown"
          ><span class="d-inline-flex align-items-center"
            >Account
            <ph-caret-down
              :class="['caret', { flip: showDropdown }]"
              :size="20" /></span
        ></t-button>
        <ul :class="['dropdown', { show: showDropdown }]">
          <li>
            <nuxt-link to="/tickets" class="nav__item">Tickets</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile" class="nav__item">Profile</nuxt-link>
          </li>
          <li>
            <span
              ><t-button
                variant="text"
                color="primary"
                class="nav__item"
                @click="onLogoutClick"
                >Log out</t-button
              ></span
            >
          </li>
        </ul>
      </li>
      <template v-else>
        <li>
          <t-button
            variant="text"
            color="prominent"
            class="nav__item"
            @click="$modal.show('login')"
            >Log in</t-button
          >
        </li>
      </template>
    </ul>
    <div class="background" :style="{ opacity: backgroundOpacity }"></div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { Mutations } from '~/constants'

export default {
  data() {
    return {
      backgroundOpacity: 0,
      showDropdown: false,
    }
  },
  computed: mapGetters(['isAuthenticated']),
  mounted() {
    window.addEventListener('scroll', this.updateBackgroundOpacity)
    document.body.addEventListener('click', this.onClickOutside)
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateBackgroundOpacity)
    document.body.addEventListener('click', this.onClickOutside)
  },
  methods: {
    updateBackgroundOpacity() {
      this.backgroundOpacity = window.scrollY.toFixed() * 0.01
    },
    onClickOutside() {
      if (this.showDropdown) this.showDropdown = false
    },
    onLogoutClick() {
      this.$store.commit(Mutations.CLEAR_AUTH_DATA)
    },
  },
}
</script>

<style scoped>
nav {
  display: flex;
  z-index: 2;
  width: 100%;
  position: relative;
  height: 2.6rem;
}

.nav__brand {
  text-decoration: none;
  color: var(--color-prominent);
  font-weight: 600;
  font-size: 0.9rem;
}

.link__list {
  list-style: none;
  display: flex;
  width: 100%;
  padding: 0;
  margin: var(--spacing-1) var(--spacing-side);
  z-index: 2;
}

.link__list li {
  display: flex;
  align-items: center;
}

.nav__item {
  color: var(--color-primary);
  margin-left: var(--spacing-4);
  font-size: 0.9rem;
}

.nav__item:hover {
  color: var(--color-prominent);
}

.caret {
  color: var(--color-prominent);
  margin-left: var(--spacing-2);
  display: inline-block;
  transition: transform 200ms ease;
}

.caret.flip {
  transform: rotate(180deg);
}

.dropdown {
  list-style: none;
  position: absolute;
  right: 0;
  top: 2.5rem;
  z-index: 20;
  min-width: 100%;
  background-color: var(--color-bg);
  border-radius: var(--b-radius);
  padding: var(--spacing-2) var(--spacing-4) var(--spacing-2) 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: visibility 200ms linear, opacity 200ms linear,
    transform 200ms linear;
}

.dropdown.show {
  visibility: visible;
  opacity: 100;
  transform: translateY(0);
}

.dropdown li {
  margin: var(--spacing-1) 0;
}

.background {
  background: var(--color-bg);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
