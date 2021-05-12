<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">        </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link v-if="token" to="/cars" class="navbar-item">CarsList</router-link>
        <router-link to="/marks" class="navbar-item">Marks</router-link>
        <router-link to="/models" class="navbar-item">Models</router-link>
        <router-link to="/types" class="navbar-item">Types</router-link>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a v-if="!token" class="button is-primary" href="/register">
            <strong>Sign up</strong>
          </a>
          <a v-if="!token" class="button is-light" href="/login">
            Log in
          </a>
          <button v-if="token" class="button is-light" @click="onLogOutClicked">
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import store from '@/store/index'

export default class Header extends Vue {
  routes: string[] = ['Cars'];

  get token () {
    return store.state?.token !== null && store.state.token.length > 1
  }

  async onLogOutClicked () {
    store.commit('logOut')
  }
}
</script>

<style scoped>

</style>
