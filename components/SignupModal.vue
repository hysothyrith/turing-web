<template>
  <modal name="signup" :adaptive="true" height="auto" :width="900">
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="cover__wrapper">
          <img
            class="img--cover cover"
            src="https://images.unsplash.com/photo-1614014783958-369b9429da66?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          />
        </div>
        <div class="content__wrapper">
          <form class="form" @submit.prevent="onSubmit">
            <h1 class="h4-size">Sign up for a Turing account</h1>
            <div class="input-group">
              <label for="name">Name</label>
              <input id="name" v-model="name" type="text" required />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input id="email" v-model="email" type="email" required />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
              />
            </div>
            <t-button type="submit" class="w-100 mt-4" :loading="loading"
              >Sign up</t-button
            >
            <div class="mt-2">
              <small>Already have an account?</small>
              <t-button variant="text" @click.prevent="onLoginClick"
                >Log in</t-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { Actions } from '~/constants'
export default {
  data() {
    return {
      loading: false,
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch(Actions.signup, {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$modal.hide('signup')
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          alert(err)
        })
    },
    onLoginClick() {
      this.$modal.hide('signup')
      setTimeout(() => {
        this.$modal.show('login')
      }, 300)
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
}

.wrapper__inner {
  display: grid;
  grid-template-columns: 0 1fr;
}

.content__wrapper {
  padding: 64px var(--spacing-side);
  display: flex;
  align-items: center;
}

.cover__wrapper {
  max-height: 550px;
}

.form {
  flex-grow: 1;
}

@media only screen and (min-width: 720px) {
  .wrapper__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .content__wrapper {
    padding: 64px var(--spacing-side);
  }
}
</style>
