<template>
  <h1 class="title is-2">Subjects</h1>
  <div class="is-offset-2 is-8-desktop m-4">
    <div v-if="isLecturer" class="columns">
      <div class="column is-one-third">
        <label>
          Title
          <input type="text" class="input" v-model="newSubject.title">
        </label>
      </div>
      <div class="column is-half">
        <label>
          Description
          <input type="text" class="input" v-model="newSubject.description">
        </label>
      </div>
      <div class="column m-2">
        <button class="button is-success m-4" @click="addSubject">Add</button>
      </div>
    </div>
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

import {Options, Vue} from "vue-class-component";
import {ISubject} from "@/models/ISubject";
import {SubjectsService} from "@/services/subjects-service";
import {getParsedJwt} from "@/util/jwt";
import {IJwt} from "@/models/IJwt";

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class SubjectsIndex extends Vue {
  subjects: ISubject[] = []
  service: SubjectsService | null = null
  newSubject: ISubject = {title: '', description: '', semesterId: '', homeworks: [], declarations: []}

  mounted(): void {
    console.log("mounted")
    this.service = new SubjectsService()
    console.log(this.$route.params.id as string)
    this.service?.getAll({semesterId: this.$route.params.id as string}).then(res => {
      console.log(res)
      if (res.data) {
        this.subjects = res.data
      }
    })
  }

  addSubject() {
    this.newSubject.semesterId = this.$route.params.id as string
    this.service?.post(this.newSubject).then(_ => {
      this.service?.getAll({semesterId: this.$route.params.id as string}).then(res => {
        if (res.data) this.subjects = res.data
      })
    })
  }

  get isLecturer() {
    const jwt = getParsedJwt<IJwt>(localStorage.getItem('token') || '')
    return jwt !== null && (jwt!['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Lecturer') ||
        jwt!['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false)
  }
}
</script>

<style scoped>

</style>
