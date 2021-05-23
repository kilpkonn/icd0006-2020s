<template>
  <h1 v-if="!isEditing" class="title m-4">
    {{ subject?.title }}
  </h1>
  <input v-if="isEditing" class="input m-4" v-model="subject.title">

  <span v-if="!isEditing">
    {{ subject?.description }}
  </span>
  <textarea v-if="subject && isEditing" class="textarea m-4" v-model="subject.description"></textarea>
  <div class="m-4">
    <button v-if="!isEditing && isLecturer" class="button is-primary m-2" @click="isEditing = true">Edit</button>
    <button v-if="isEditing" class="button is-success m-2" @click="save">Save</button>
    <button v-if="isLecturer" class="button is-danger m-2" @click="onDelete">Delete</button>
  </div>
  <h2 class="subtitle is-3">
    Homeworks
  </h2>
  <div v-if="isLecturer" class="columns m-4">
    <div class="column is-one-third">
      <span>Title</span>
      <input type="text" class="input" v-model="newHw.title">
    </div>
    <div class="column is-half">
      <span>Description</span>
      <input type="text" class="input" v-model="newHw.description">
    </div>
    <div class="column">
      <br/>
      <button class="button is-success" @click="addHomework">Add</button>
    </div>
  </div>
  <div v-if="subject" v-for="homework of subject.homeworks" :key="homework.id" class="card columns m-4">
    <div class="column is-one-quarter">
      {{ homework.title }}
    </div>
    <div class="column is-one-third">
      {{ homework.description }}
    </div>
    <div class="column is-one-quarter">
      <ul>
        <li v-for="submission of homework.submissions">
          <router-link :to="'/submissions/' + submission.id">{{ submission.id }}</router-link>
        </li>
      </ul>
    </div>
    <div class="column">
      <button v-if="isLecturer" class="button is-danger" @click="deleteHomework(homework.id)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {SubjectsService} from "@/services/subjects-service";
import {ISubject} from "@/models/ISubject";
import {getParsedJwt} from "@/util/jwt";
import {IJwt} from "@/models/IJwt";
import {IHomework} from "@/models/IHomework";
import {HomeworksService} from "@/services/homeworks-service";

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class SubjectDetails extends Vue {
  service: SubjectsService | null = null
  homeworkService: HomeworksService | null = null
  subject: ISubject | null = null
  newHw: IHomework = {title: '', description: '', subjectId: '', submissions: []}
  isEditing: boolean = false

  mounted() {
    this.service = new SubjectsService()
    this.homeworkService = new HomeworksService()
    this.service.get(this.$route.params.id as string).then(res => {
      if (res.data) {
        this.subject = res.data
      }
    })
  }

  save() {
    this.service?.put(this.subject!)
        .then(_ => this.service?.get(this.subject!.id!).then(res => {
          if (res.data) this.subject = res.data
          this.isEditing = false
        }))
  }

  addHomework() {
    this.newHw.subjectId = this.subject!.id!
    this.homeworkService?.post(this.newHw).then(_ => this.service?.get(this.subject!.id!).then(res => {
      if (res.data) this.subject = res.data
    }))
  }

  deleteHomework(id: string) {
    this.homeworkService?.delete(id).then(_ => this.service?.get(this.subject!.id!).then(res => {
      if (res.data) this.subject = res.data
    }))
  }

  onDelete() {
    this.service?.delete(this.subject!.id!).then(_ => {
      this.$router.push('/subjects')
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
