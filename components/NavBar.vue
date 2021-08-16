<template>
  <nav role="navigation" class="nav">
    <ul class="nav__inner">
      <li class="flex-grow-1">
        <nuxt-link to="/" class="nav__brand">Turing&nbsp;Cinemas</nuxt-link>
      </li>
      <li class="nav__items-main-container">
        <ul class="nav__items-main-list">
          <li class="nav__item">
            <nuxt-link to="/showtimes">Showtimes</nuxt-link>
          </li>
          <li class="nav__item">
            <nuxt-link to="/cinemas">Cinemas</nuxt-link>
          </li>
          <li class="nav__item">
            <nuxt-link to="/concession">Concession</nuxt-link>
          </li>
          <template v-if="isAuthenticated">
            <li class="nav__item">
              <nuxt-link to="/tickets">Tickets</nuxt-link>
            </li>
            <li class="nav__item">
              <nuxt-link to="/account">Account</nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav__item">
              <t-button
                variant="text"
                color="prominent"
                @click="$modal.show('login')"
                >Log&nbsp;in</t-button
              >
            </li>
          </template>
        </ul>
      </li>
    </ul>
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
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
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
.nav {
  position: relative;
  display: flex;
  z-index: 2;
  width: 100%;
  padding: 0 var(--spacing-side);
}

.nav__brand {
  text-decoration: none;
  color: var(--color-prominent);
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: var(--spacing-4);
}

.nav__inner {
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  z-index: 2;
  margin: 0;
  align-items: center;
  min-height: 2.6rem;
}

.nav__items-main-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 var(--spacing-4);

  /* Enables horizontal scrolling */
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 20px,
    black 90%,
    transparent
  );
}

.nav__items-main-list {
  display: flex;
  list-style: none;
  padding: 0;
  position: relative;
}

.nav__item * {
  color: var(--color-primary);
  margin-left: var(--spacing-4);
  flex: 0 0 auto;
  font-size: 0.9rem;
}

@media only screen and (min-width: 768px) {
  .nav__items-main-container {
    padding: 0;
    mask-image: none;
    -webkit-mask-image: none;
  }
}

.background {
  background: var(--color-bg);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
</style>
