<template>
  <div class="container">
    <h1>Car Type Details</h1>

    <div v-if="type" class="column">
      <hr/>
      <div class="column">
        <div class="columns">
          <div class="column is-4-desktop">
            Id
          </div>
          <div class="column is-8-desktop">
            {{ type.id }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Name
          </div>
          <div v-if="!isEditing" class="column is-8-desktop">
            {{ type.name }}
          </div>
          <input v-if="isEditing" v-model="type.name" class="column is-8-desktop">
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Model
          </div>
          <div v-if="!isEditing" class="column is-8-desktop">
            {{ type.carModel?.carMark.name || '' }} - {{ type.carModel?.name || '' }}
          </div>
          <select v-if="isEditing" v-model="type.carModelId" class="column is-8-desktop">
            <option v-for="model of carModels" :value="model.id" :key="model.id">
              {{model.carMark.name}} - {{model.name}}
            </option>
          </select>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Created By
          </div>
          <div class="column is-8-desktop">
            {{ type.createdBy }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Created At
          </div>
          <div class="column is-8-desktop">
            {{ type.createdAt }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Updated By
          </div>
          <div class="column is-8-desktop">
            {{ type.updatedBy }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Updated At
          </div>
          <div class="column is-8-desktop">
            {{ type.updatedAt }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="button m-2 is-primary" v-if="!isEditing && isAdmin" @click="onClickEdit">Edit</button>
      <button class="button m-2 is-success" v-if="isEditing && isAdmin" @click="onClickSave">Save</button>
      <button class="button m-2 is-danger" v-if="isAdmin" @click="onClickDelete">Delete</button>
      <router-link class="button m-2" to="/types">Back to List</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ICar } from '@/models/ICar'
import { CarsService } from '@/services/cars-service'
import { ICarType } from '@/models/ICarType'
import { CarTypeService } from '@/services/car-type-service'
import { ICarModel } from '@/models/ICarModel'
import { CarModelService } from '@/services/car-model-service'
import store from '@/store'
import { getParsedJwt } from '@/util/jwt'
import { IJwt } from '@/models/IJwt'

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class TypeDetails extends Vue {
  type: ICarType | null = null
  carModels: ICarModel[] = []
  service: CarTypeService | null = null
  carModelService: CarModelService | null = null
  isEditing = false

  mounted (): void {
    this.service = new CarTypeService()
    this.carModelService = new CarModelService()
    this.fetchType()
    this.carModelService.getAll()
      .then(res => {
        if (res.data !== undefined) {
          this.carModels = res.data
        } else {
          console.log(res.errorMessage)
        }
      })
  }

  private async fetchType () {
    return this.service?.get(this.$route.params.id as string)
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data)
          this.type = res.data!
        } else {
          console.error(res.errorMessage)
        }
      })
  }

  onClickEdit (): void {
    this.isEditing = true
  }

  get isAdmin () {
    return store.state?.token !== null && (getParsedJwt<IJwt>(store.state!.token!)?.
      ['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false)
  }

  async onClickSave (): Promise<void> {
    await this.service?.put(this.type!)
    await this.fetchType()
    this.isEditing = false
  }

  async onClickDelete (): Promise<void> {
    await this.service?.delete(this.type!.id)
    await this.$router.push('/cars')
  }
}
</script>

<style scoped>

</style>
