<template>
  <modal name="login" :adaptive="true" height="auto" :width="900">
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="cover__wrapper">
          <img
            class="img--cover cover"
            src="https://source.unsplash.com/23LET4Hxj_U/640x426"
            alt="Picture watching movies inside a theatre"
          />
        </div>
        <div class="content__wrapper">
          <form class="form" @submit.prevent="onSubmit">
            <h1 class="h4-size">Log in to Turing Cinemas</h1>
            <div class="input-group">
              <label class="small-size" for="email">Email</label>
              <input id="email" v-model="email" type="email" required />
            </div>
            <div class="input-group">
              <label class="small-size" for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
              />
            </div>
            <t-button type="submit" class="w-100 mt-4" :loading="loading"
              >Login</t-button
            >
            <div class="mt-2">
              <small>Don’t have a Turing account?</small>
              <t-button variant="text" @click.prevent="onSignUpClick"
                >Sign up</t-button
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
import notifyApiError from '~/mixins/notifyApiError'

export default {
  mixins: [notifyApiError],
  data() {
    return {
      loading: false,
      email: '',
      password: '',
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      await this.$store
        .dispatch(Actions.login, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$toast.success('Login successfull. You can continue exploring.')
          this.$modal.hide('login')
        })
        .catch(this.notifyApiError)
        .finally(() => {
          this.loading = false
        })
    },
    onSignUpClick() {
      this.$modal.hide('login')
      setTimeout(() => {
        this.$modal.show('signup')
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

@media only screen and (min-width: 768px) {
  .wrapper__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .content__wrapper {
    padding: 64px var(--spacing-side);
  }
}
</style>
