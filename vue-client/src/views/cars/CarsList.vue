<template>
  <div class="columns m-6">
    <router-link v-if="isAdmin" to="/vue/cars/create">Create</router-link>
  </div>
  <div class="column is-10-desktop m-6">
    <table class="table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Type</th>
        <th>User</th>
        <th>Created By</th>
        <th>Created At</th>
        <th>Updated By</th>
        <th>Updated At</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>Id</th>
        <th>Type</th>
        <th>User</th>
        <th>Created By</th>
        <th>Created At</th>
        <th>Updated By</th>
        <th>Updated At</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="car of cars" :key="car.id">
        <th><router-link :to="'/cars/' + car.id">{{car.id}}</router-link></th>
        <td>{{car.carType.name}}</td>
        <td>{{car.appUser.displayName}}</td>
        <td>{{car.createdBy}}</td>
        <td>{{car.createdAt}}</td>
        <td>{{car.updatedBy}}</td>
        <td>{{car.updatedAt}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { CarsService } from '@/services/cars-service'
import { ICar } from '@/models/ICar'
import { getParsedJwt } from '@/util/jwt'
import { IJwt } from '@/models/IJwt'
import store from '@/store'

export default class CarsList extends Vue {
  service: CarsService | null = null
  cars: ICar[] = []

  async mounted (): Promise<void> {
    this.service = new CarsService()
    await this.service.getAll()
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data)
          this.cars = res.data!
        } else {
          console.error(res.errorMessage)
        }
      })
  }

  get isAdmin () {
    return store.state?.token !== null && (getParsedJwt<IJwt>(store.state!.token!)?.
      ['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false)
  }
}
</script>

<style scoped>

</style>
