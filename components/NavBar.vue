<template>
  <nav>
    <nuxt-link to="/" class="brand">Turing Cinemas</nuxt-link>
    <div class="links">
      <nuxt-link to="/cinemas" class="link">Cinemas</nuxt-link>
      <nuxt-link to="/showtimes" class="link">Showtimes</nuxt-link>
      <nuxt-link to="/concession" class="link">Concession</nuxt-link>
      <template v-if="isAuthenticated">
        <nuxt-link to="/account" class="link text-prominent">Account</nuxt-link>
      </template>
      <template v-else>
        <spacer size="8" axis="horizontal" />
        <t-button variant="text" @click="$modal.show('login')">Log in</t-button>
        <spacer size="4" axis="horizontal" />
        <t-button variant="text" @click="$modal.show('signup')">
          Sign up
        </t-button>
      </template>
    </div>
    <div class="background" :style="{ opacity: backgroundOpacity }"></div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      backgroundOpacity: 0,
    }
  },
  computed: mapGetters(['isAuthenticated']),
  mounted() {
    window.addEventListener('scroll', this.updateBackgroundOpacity)
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateBackgroundOpacity)
  },
  methods: {
    updateBackgroundOpacity() {
      this.backgroundOpacity = window.scrollY.toFixed() * 0.01
    },
  },
}
</script>

<style scoped>
nav {
  height: 48px;
  display: flex;
  align-items: center;
  padding: var(--spacing-2) 0;
  width: 100%;
  z-index: 2;
  position: relative;
  font-size: 0.9rem;
}

.background {
  background: var(--color-bg);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.brand {
  text-decoration: none;
  color: var(--color-prominent);
  font-weight: 600;
  margin: 0 var(--spacing-side);
}

.links {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 0 var(--spacing-side);
}

.brand,
.links {
  z-index: 3;
}

.link {
  text-decoration: none;
  color: inherit;
  margin-left: var(--spacing-4);
}

.auth__button {
  background-color: transparent;
  color: var(--color-primary);
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
