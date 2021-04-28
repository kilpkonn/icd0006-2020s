<template>
  <div class="container">
    <h1>Car Details</h1>

    <div v-if="car" class="column">
      <h4>Car</h4>
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
            Type Id
          </div>
          <div class="column is-8-desktop">
            {{car.carTypeId}}
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop">
            User Id
          </div>
          <div class="column is-8-desktop">
            {{car.appUserId}}
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
<!--      <button class="mt-4" click.delegate="edit()">Edit</button>-->
<!--      <button class="mt-4" click.delegate="delete()">Delete</button>-->
<!--      <button class="mt-4" click.delegate="back()">Back to List</button>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ICar } from '@/models/ICar'
import { CarsService } from '@/services/cars-service'

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class CarDetails extends Vue {
  car: ICar | null = null
  service: CarsService | null = null

  mounted (): void {
    this.service = new CarsService()
    this.service.get(this.$route.params.id as string)
      .then(res => {
        if (res.data !== undefined) {
          this.car = res.data!
        } else {
          console.error(res.errorMessage)
        }
      })
  }
}
</script>

<style scoped>

</style>
