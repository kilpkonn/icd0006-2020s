<template>
  <div class="container">
    <h1>Create Car</h1>

    <div class="column">
      <hr/>
      <div class="column">
        <div class="columns">
          <div class="column is-4-desktop">
            Type
          </div>
          <select v-model="car.carTypeId" class="column is-8-desktop">
            <option v-for="type of carTypes" :value="type.id" :key="type.id">
              {{type.carModel.carMark.name}} - {{type.carModel.name}} - {{type.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <button class="button m-2 is-primary" @click="onClickCreate">Create</button>
      <router-link class="button m-2" to="/cars">Back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { ICar, INewCar } from '@/models/ICar'
import { ICarType } from '@/models/ICarType'
import { CarsService } from '@/services/cars-service'
import { CarTypeService } from '@/services/car-type-service'

export default class CarCreate extends Vue {
  car: INewCar = {
    carTypeId: ''
  }

  carTypes: ICarType[] = []
  service: CarsService | null = null
  carTypeService: CarTypeService | null = null

  mounted (): void {
    this.service = new CarsService()
    this.carTypeService = new CarTypeService()
    this.carTypeService.getAll()
      .then(res => {
        if (res.data !== undefined) {
          this.carTypes = res.data
        } else {
          console.log(res.errorMessage)
        }
      })
  }

  async onClickCreate (): Promise<void> {
    const res = await this.service?.post(this.car as ICar)
    console.info(res)
    await this.$router.push('/cars')
  }
}
</script>

<style scoped>

</style>
