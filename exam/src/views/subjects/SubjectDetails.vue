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
  <div v-if="subject" v-for="homework of subject.homeworks" :key="homework.id" class="card columns m-4" @click="() => tryDoHomework(homework.id)">
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
  <h2 class="subtitle is-3">
    Declarations
  </h2>
  <!--  <div v-if="isLecturer">-->
  <div>
    <table v-if="isLecturer || subject?.declarations" class="table m-4 is-fullwidth">
      <thead>
      <tr>
        <th>User id</th>
        <th>Status</th>
        <th>Grade</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="subject" v-for="declaration of subject.declarations">
        <td>{{ declaration.appUserId }}</td>
        <td v-if="declaration.declarationStatus !== 3">{{ printStatus(declaration.declarationStatus) }}</td>
        <td v-if="isLecturer && declaration.declarationStatus === 3">
          <select v-model="declaration.declarationStatus" class="select">
            <option value="0">Accepted</option>
            <option value="1">Rejected</option>
          </select>
        </td>
        <td v-if="isStudent && declaration.declarationStatus === 3">
          <select v-model="declaration.declarationStatus" class="select" @change="() => updateDeclaration(declaration)">
            <option value="2">Cancelled</option>
            <option value="3">Pending</option>
          </select>
        </td>
        <td v-if="isLecturer && declaration.declarationStatus === 3">
          <input v-if="declaration.grade" type="number" class="input" v-model="declaration.grade">
          <input v-if="!declaration.grade" type="number" class="input" v-model="newGrade">
        </td>
        <td v-if="isStudent || declaration.declarationStatus !== 3">{{ declaration.grade?.value || '-' }}</td>
<!--        <td>-->
<!--          <button class="button is-primary" @click="() => updateDeclaration(declaration)">Update</button>-->
<!--        </td>-->
      </tr>
      </tbody>
    </table>
    <button v-if="isStudent && subject?.declarations.length === 0" class="button is-primary" @click="declareSubject">Declare subject</button>
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
import {GradeType, IGrade} from "@/models/IGrade";
import {IDeclaration} from "@/models/IDeclaration";
import {GradesService} from "@/services/grades-service";
import {DeclarationsService} from "@/services/declarations-service";

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class SubjectDetails extends Vue {
  service: SubjectsService | null = null
  homeworkService: HomeworksService | null = null
  gradeService: GradesService | null = null
  declarationService: DeclarationsService | null = null
  subject: ISubject | null = null
  newHw: IHomework = {title: '', description: '', subjectId: '', submissions: []}
  isEditing: boolean = false
  newGrade: IGrade = {value: 0, gradeType: GradeType.COURSE}

  mounted() {
    this.service = new SubjectsService()
    this.homeworkService = new HomeworksService()
    this.gradeService = new GradesService()
    this.declarationService = new DeclarationsService()
    this.service.get(this.$route.params.id as string).then(res => {
      if (res.data) {
        this.subject = res.data
        console.log(res.data)
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

  printStatus(n: number): string {
    if (n === 0) return 'Accepted'
    if (n === 1) return 'Rejected'
    if (n === 2) return 'Cancelled'
    return 'Pending'
  }

  updateDeclaration(declaration: IDeclaration) {
    declaration.declarationStatus = +declaration.declarationStatus
    if (this.isLecturer) {
      if (declaration.grade) {
        this.gradeService?.put(declaration.grade).then(_ =>
            this.declarationService?.put(declaration).then(_ =>
                this.service?.get(this.$route.params.id as string).then(res => {
                  if (res.data) {
                    this.subject = res.data
                  }
                })))
      } else {
        this.gradeService?.put(this.newGrade).then(grade => {
          if (grade.data) {
            declaration.gradeId = grade.data!.id!
            this.declarationService?.put(declaration).then(_ =>
                this.service?.get(this.$route.params.id as string).then(res => {
                  if (res.data) {
                    this.subject = res.data
                  }
                }))
          }
        })
      }
    } else if (this.isStudent){
      this.declarationService?.put(declaration).then(_ =>
          this.service?.get(this.$route.params.id as string).then(res => {
            if (res.data) {
              this.subject = res.data
            }
          }))
    }
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
      this.$router.push('/semesters/' + this.subject!.semesterId! + '/subjects')
    })
  }

  declareSubject() {
    const declaration: IDeclaration = {
      appUserId: null,
      subjectId: this.subject!.id!,
      declarationStatus: 3,
      gradeId: null,
      grade: null
    }
    this.declarationService?.post(declaration).then(_ => {
      window.location.reload()
    })
  }

  tryDoHomework(id: string) {
    if (this.isStudent && (this.subject?.declarations?.length || 0) > 0) {
      this.$router.push('/submissions/' + id + '/create')
    }
  }

  get isLecturer() {
    const jwt = getParsedJwt<IJwt>(localStorage.getItem('token') || '')
    return jwt !== null && (jwt!['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Lecturer') ||
        jwt!['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Admin') || false)
  }

  get isStudent() {
    const jwt = getParsedJwt<IJwt>(localStorage.getItem('token') || '')
    return jwt !== null && (jwt!['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('Student') || false)
  }
}
</script>

<style scoped>

</style>
