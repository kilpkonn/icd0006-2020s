<template>
  <div class="container">
    <h1>Car Model Details</h1>

    <div v-if="model" class="column">
      <hr/>
      <div class="column">
        <div class="columns">
          <div class="column is-4-desktop">
            Id
          </div>
          <div class="column is-8-desktop">
            {{ model.id }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Name
          </div>
          <div v-if="!isEditing" class="column is-8-desktop">
            {{ model.name }}
          </div>
          <input v-if="isEditing" v-model="model.name" class="column is-8-desktop">
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Mark
          </div>
          <div v-if="!isEditing" class="column is-8-desktop">
            {{ model.carMark?.name || '' }}
          </div>
          <select v-if="isEditing" v-model="model.carMarkId" class="column is-8-desktop">
            <option v-for="mark of carMarks" :value="mark.id" :key="mark.id">
              {{mark.name}}
            </option>
          </select>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Created By
          </div>
          <div class="column is-8-desktop">
            {{ model.createdBy }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Created At
          </div>
          <div class="column is-8-desktop">
            {{ model.createdAt }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Updated By
          </div>
          <div class="column is-8-desktop">
            {{ model.updatedBy }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            Updated At
          </div>
          <div class="column is-8-desktop">
            {{ model.updatedAt }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="button m-2 is-primary" v-if="!isEditing && isAdmin" @click="onClickEdit">Edit</button>
      <button class="button m-2 is-success" v-if="isEditing && isAdmin" @click="onClickSave">Save</button>
      <button class="button m-2 is-danger" v-if="isAdmin" @click="onClickDelete">Delete</button>
      <router-link class="button m-2" to="/vue/models">Back to List</router-link>
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
import { ICarMark } from '@/models/ICarMark'
import { CarMarkService } from '@/services/car-mark-service'
import store from '@/store'
import { getParsedJwt } from '@/util/jwt'
import { IJwt } from '@/models/IJwt'

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class ModelDetails extends Vue {
  model: ICarModel | null = null
  carMarks: ICarMark[] = []
  service: CarModelService | null = null
  carMarkService: CarMarkService | null = null
  isEditing = false

  mounted (): void {
    this.service = new CarModelService()
    this.carMarkService = new CarMarkService()
    this.fetchModel()
    this.carMarkService.getAll()
      .then(res => {
        if (res.data !== undefined) {
          this.carMarks = res.data
        } else {
          console.log(res.errorMessage)
        }
      })
  }

  private async fetchModel () {
    return this.service?.get(this.$route.params.id as string)
      .then(res => {
        if (res.data !== undefined) {
          console.log(res.data)
          this.model = res.data!
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
    await this.service?.put(this.model!)
    await this.fetchModel()
    this.isEditing = false
  }

  async onClickDelete (): Promise<void> {
    await this.service?.delete(this.model!.id)
    await this.$router.push('/models')
  }
}
</script>

<style scoped>

</style>
