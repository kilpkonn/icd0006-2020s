<template>
  <div class="is-offset-2 is-8-desktop m-4">
    <div v-for="subject of subjects" :key="subject.id" class="card columns m-4"
         @click="$router.push('/subjects/' + subject.id)">
      <div class="column is-one-third">
        <h3 class="subtitle is-4">{{ subject.title }}</h3>
      </div>
      <div class="column">
        <i>{{ subject.description }}</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Vue} from "vue-class-component";
import {ISubject} from "@/models/ISubject";
import {SubjectsService} from "@/services/subjects-service";

export default class SubjectsIndex extends Vue {
  subjects: ISubject[] = []
  service: SubjectsService | null = null

  mounted(): void {
    console.log("mounted")
    this.service = new SubjectsService()
    this.service?.getAll().then(res => {
      console.log(res)
      if (res.data) {
        this.subjects = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
