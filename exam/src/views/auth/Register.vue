<template>
  <div class="columns right has-text-centered mt-6 is-centered">
    <div class="column is-4-desktop mt-6 is-centered">
      <h1 class="title is-4">Register</h1>
      <p class="description">Register an account</p>
      <form>
        <div class="field">
          <div class="control">
            <input v-model="email" class="input is-medium" type="email" placeholder="Email">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input v-model="displayName" class="input is-medium" type="text" placeholder="Display Name">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input v-model="password" class="input is-medium" type="password" placeholder="Password">
          </div>
        </div>
        <button @click="onRegisterClicked($event)" type="button"
                class="button is-block is-primary is-fullwidth is-medium">Submit
        </button>
        <br/>
        <small><em>Or you can login <a href="/vue/login">here</a></em></small>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import store from '@/store'

@Options({
  components: {},
  props: {}
})
export default class Register extends Vue {
  email = '';
  password = '';
  displayName = '';

  async onRegisterClicked (event: Event): Promise<void> {
    console.log(event)
    store
      .dispatch('register', {
        email: this.email,
        password: this.password,
        displayName: this.displayName
      })
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>

<style scoped>

</style>
