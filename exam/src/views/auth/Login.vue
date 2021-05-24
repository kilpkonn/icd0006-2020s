<template>
  <div class="columns right has-text-centered mt-6 is-centered">
    <div class="column is-4-desktop mt-6 is-centered">
      <h1 class="title is-4">Login</h1>
      <p class="description">Log in to already existing account</p>
      <form>
        <div class="field">
          <div class="control">
            <input v-model="email" class="input is-medium" type="email" placeholder="Email">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input v-model="password" class="input is-medium" type="password" placeholder="Password">
          </div>
        </div>
        <button @click="onLoginClicked($event)" type="button" class="button is-block is-primary is-fullwidth is-medium">
          Submit
        </button>
        <br/>
        <small><em>Or you can register <a href="/vue/register">here</a></em></small>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '@/store/index'

@Options({
  components: {},
  props: {}
})
export default class Login extends Vue {
  email = '';
  password = '';

  async onLoginClicked (event: Event): Promise<void> {
    console.log(this.email, this.password, event)

    store
      .dispatch('logIn', { email: this.email, password: this.password })
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>

<style scoped>

</style>
