<template>
  <div class="columns m-6">
    <router-link v-if="isAdmin" to="/models/create">Create</router-link>
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
        <th>Mark</th>
        <th>Created By</th>
        <th>Created At</th>
        <th>Updated By</th>
        <th>Updated At</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="model of models" :key="model.id">
        <th><router-link :to="'/models/' + model.id">{{model.id}}</router-link></th>
        <td>{{model.name}}</td>
        <td>{{model.carMark?.name}}</td>
        <td>{{model.createdBy}}</td>
        <td>{{model.createdAt}}</td>
        <td>{{model.updatedBy}}</td>
        <td>{{model.updatedAt}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { ICarType } from '@/models/ICarType'
import { CarTypeService } from '@/services/car-type-service'
import { CarModelService } from '@/services/car-model-service'
import { ICarModel } from '@/models/ICarModel'
import store from '@/store'
import { getParsedJwt } from '@/util/jwt'
import { IJwt } from '@/models/IJwt'

export default class AccessTypesList extends Vue {
  service: CarModelService | null = null
  models: ICarModel[] = []

  async mounted (): Promise<void> {
    this.service = new CarModelService()
    await this.service.getAll()
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data)
          this.models = res.data!
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
