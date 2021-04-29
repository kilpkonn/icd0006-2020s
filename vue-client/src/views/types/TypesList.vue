<template>
  <div class="columns m-6">
    <router-link v-if="isAdmin" to="/types/create">Create</router-link>
  </div>
  <div class="column is-10-desktop m-6">
    <table class="table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Model</th>
        <th>Created By</th>
        <th>Created At</th>
        <th>Updated By</th>
        <th>Updated At</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Model</th>
        <th>Created By</th>
        <th>Created At</th>
        <th>Updated By</th>
        <th>Updated At</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="type of types" :key="type.id">
        <th><router-link :to="'/types/' + type.id">{{type.id}}</router-link></th>
        <td>{{type.name}}</td>
        <td>{{type.carModel?.name}}</td>
        <td>{{type.createdBy}}</td>
        <td>{{type.createdAt}}</td>
        <td>{{type.updatedBy}}</td>
        <td>{{type.updatedAt}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { ICarType } from '@/models/ICarType'
import { CarTypeService } from '@/services/car-type-service'
import store from '@/store'
import { getParsedJwt } from '@/util/jwt'
import { IJwt } from '@/models/IJwt'

export default class TypesList extends Vue {
  service: CarTypeService | null = null
  types: ICarType[] = []

  async mounted (): Promise<void> {
    this.service = new CarTypeService()
    await this.service.getAll()
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data)
          this.types = res.data!
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
