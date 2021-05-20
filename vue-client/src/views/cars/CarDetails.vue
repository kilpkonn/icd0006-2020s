<template>
  <div class="container">
    <h1>Car Details</h1>

    <div v-if="car" class="column">
      <hr/>
      <div class="column">
        <div class="columns">
          <div class="column is-4-desktop">
            Id
          </div>
          <div class="column is-8-desktop">
            {{car.id}}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Type
          </div>
          <div v-if="!isEditing" class="column is-8-desktop">
            {{car.carType?.carModel.carMark.name || ''}} - {{car.carType?.carModel.name || ''}} - {{car.carType?.name || ''}}
          </div>
          <select v-if="isEditing" v-model="car.carTypeId" class="column is-8-desktop">
            <option v-for="type of carTypes" :value="type.id" :key="type.id">
              {{type.carModel.carMark.name}} - {{type.carModel.name}} - {{type.name}}
            </option>
          </select>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            User
          </div>
          <div class="column is-8-desktop">
            {{car.appUser?.displayName || ''}}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Created By
          </div>
          <div class="column is-8-desktop">
            {{car.createdBy}}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Created At
          </div>
          <div class="column is-8-desktop">
            {{car.createdAt}}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Updated By
          </div>
          <div class="column is-8-desktop">
            {{car.updatedBy}}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Updated At
          </div>
          <div class="column is-8-desktop">
            {{car.updatedAt}}
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="button m-2 is-primary" v-if="!isEditing && isAdmin" @click="onClickEdit">Edit</button>
      <button class="button m-2 is-success" v-if="isEditing && isAdmin" @click="onClickSave">Save</button>
      <button class="button m-2 is-danger" v-if="isAdmin" @click="onClickDelete">Delete</button>
      <router-link class="button m-2" to="/cars">Back to List</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ICar } from '@/models/ICar'
import { CarsService } from '@/services/cars-service'
import { ICarType } from '@/models/ICarType'
import { CarTypeService } from '@/services/car-type-service'
import store from '@/store'
import { getParsedJwt } from '@/util/jwt'
import { IJwt } from '@/models/IJwt'

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class CarDetails extends Vue {
  car: ICar | null = null
  carTypes: ICarType[] = []
  service: CarsService | null = null
  carTypeService: CarTypeService | null = null
  isEditing = false

  mounted (): void {
    this.service = new CarsService()
    this.carTypeService = new CarTypeService()
    this.fetchCar()
    this.carTypeService.getAll()
      .then(res => {
        if (res.data !== undefined) {
          this.carTypes = res.data
        } else {
          console.log(res.errorMessage)
        }
      })
  }

  private async fetchCar () {
    return this.service?.get(this.$route.params.id as string)
      .then(res => {
        if (res.data !== undefined) {
          this.car = res.data!
        } else {
          console.error(res.errorMessage)
        }
      })
  }

  onClickEdit (): void {
    this.isEditing = true
  }

  get isAdmin () {
    return store.state?.token !== null && getParsedJwt<IJwt>(store.state!.token!)?.
      ['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Admin')
  }

  async onClickSave (): Promise<void> {
    await this.service?.put(this.car!)
    await this.fetchCar()
    this.isEditing = false
  }

  async onClickDelete (): Promise<void> {
    await this.service?.delete(this.car!.id)
    await this.$router.push('/cars')
  }
}
</script>

<style scoped>

</style>
