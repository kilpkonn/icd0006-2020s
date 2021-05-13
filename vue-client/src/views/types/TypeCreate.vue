<template>
  <div class="container">
    <h1>Create Car Type</h1>

    <div class="column">
      <hr/>
      <div class="column">
        <div class="columns">
          <div class="column is-4-desktop">
            Name
          </div>
          <input v-model="type.name" class="column is-8-desktop">
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Model
          </div>
          <select v-model="type.carModelId" class="column is-8-desktop">
            <option v-for="model of carModels" :value="model.id" :key="model.id">
              {{model.carMark?.name}} - {{model.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <button class="button m-2 is-primary" @click="onClickCreate">Create</button>
      <router-link class="button m-2" to="/types">Back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { ICarType, INewCarType } from '@/models/ICarType'
import { CarTypeService } from '@/services/car-type-service'
import { ICarModel } from '@/models/ICarModel'
import { CarModelService } from '@/services/car-model-service'

export default class TypeCreate extends Vue {
  type: INewCarType = {
    name: '',
    carModelId: ''
  }

  carModels: ICarModel[] = []
  service: CarTypeService | null = null
  carModelService: CarModelService | null = null

  mounted (): void {
    this.service = new CarTypeService()
    this.carModelService = new CarModelService()
    this.carModelService.getAll()
      .then(res => {
        if (res.data !== undefined) {
          this.carModels = res.data
        } else {
          console.log(res.errorMessage)
        }
      })
  }

  async onClickCreate (): Promise<void> {
    const res = await this.service?.post(this.type as ICarType)
    console.info(res)
    await this.$router.push('/types')
  }
}
</script>

<style scoped>

</style>
