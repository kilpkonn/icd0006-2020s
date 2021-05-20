<template>
  <div class="container">
    <h1>Create Car Model</h1>

    <div class="column">
      <hr/>
      <div class="column">
        <div class="columns">
          <div class="column is-4-desktop">
            Name
          </div>
          <input v-model="model.name" class="column is-8-desktop">
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Mark
          </div>
          <select v-model="model.carMarkId" class="column is-8-desktop">
            <option v-for="mark of carMarks" :value="mark.id" :key="mark.id">
              {{mark.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <button class="button m-2 is-primary" @click="onClickCreate">Create</button>
      <router-link class="button m-2" to="/vue/models">Back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { ICarType, INewCarType } from '@/models/ICarType'
import { CarTypeService } from '@/services/car-type-service'
import { ICarModel, INewCarModel } from '@/models/ICarModel'
import { CarModelService } from '@/services/car-model-service'
import { ICarMark } from '@/models/ICarMark'
import { CarMarkService } from '@/services/car-mark-service'

export default class ModelCreate extends Vue {
  model: INewCarModel = {
    name: '',
    carMarkId: ''
  }

  carMarks: ICarMark[] = []
  service: CarModelService | null = null
  carMarkService: CarMarkService | null = null

  mounted (): void {
    this.service = new CarModelService()
    this.carMarkService = new CarMarkService()
    this.carMarkService.getAll()
      .then(res => {
        if (res.data !== undefined) {
          this.carMarks = res.data
        } else {
          console.log(res.errorMessage)
        }
      })
  }

  async onClickCreate (): Promise<void> {
    const res = await this.service?.post(this.model as ICarModel)
    console.info(res)
    await this.$router.push('/models')
  }
}
</script>

<style scoped>

</style>
