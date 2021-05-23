<template>
  <h1 class="title is-2">Semesters</h1>
  <div class="m-4 card columns" v-for="semester of semesters" :key="semester.id" @click="$router.push('/semesters/' + semester.id + '/subjects')">
    <div class="column is-one-third">
      <h3 class="subtitle is-3">
        {{ semester.name }}
      </h3>
    </div>
    <div class="column is-one-third">
      {{ showDateTime(semester.startDate) }}
    </div>
    <div class="column is-one-third">
      {{ showDateTime(semester.endDate) }}
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {SemestersService} from '@/services/semesters-service';
import {ISemester} from "../../models/ISemester";


export default class SemestersIndex extends Vue {
  service: SemestersService | null = null
  semesters: ISemester[] = []

  mounted() {
    this.service = new SemestersService()

    this.service?.getAll().then(res => {
      if (res.data) this.semesters = res.data
    })
  }

  showDateTime(timestamp: Date): string {
    const time = new Date(timestamp)
    const mins = time.getMinutes() > 10 ? time.getMinutes().toString() : `0${time.getMinutes()}`
    const days = time.getDay() > 10 ? time.getDay().toString() : `0${time.getDay()}`
    const months = time.getMonth() > 10 ? time.getMonth().toString() : `0${time.getMonth()}`

    return `${time.getHours()}:${mins} ${months}/${days}/${time.getFullYear()}`
  }
}
</script>

<style scoped>

</style>
