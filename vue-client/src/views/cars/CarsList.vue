<template>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {CarsService} from "@/services/cars-service";

export default class CarsList extends Vue {
  service: CarsService | undefined

  mounted() {
    this.service = new CarsService();
  }

}
</script>

<style scoped>

</style>
