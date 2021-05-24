<template>
  <h1 class="title is-2">Submission</h1>
  <span v-if="submission">Id: {{ submission.id }}</span><br/>
  <span v-if="submission">User id: {{ submission.appUserId }}</span><br/>
  <h3 class="subtitle is-3">Task: {{ homework?.title }}</h3>
  <span v-if="homework">{{ homework?.description }}</span>
  <h3 class="subtitle is-3">Answer</h3>
  <div class="m-4 card is-two-thirds p-4">
    {{ submission?.value }}
  </div>
  <div class="columns">
    <div class="column is-three-quarters">

    </div>
    <div class="column">
      <div v-if="isLecturer && submission?.grade" class="columns">
        <label v-if="isLecturer">
          Grade
          <input type="number" class="input" v-model="submission.grade.value">
        </label>
        <button v-if="isLecturer" class="button is-primary m-5" @click="updateGrade">Update Grade</button>
      </div>
      <div v-if="!isLecturer && submission?.grade" class="columns">
        <span>
          Grade {{ submission.grade.value }}
        </span>
      </div>
      <div v-if="!submission?.grade" class="columns">
        <label v-if="isLecturer">
          Grade
          <input v-if="isLecturer" type="number" class="input" v-model="newGrade.value">
        </label>
        <button v-if="isLecturer" class="button is-success m-5" @click="addGrade">Add Grade</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {SubmissionsService} from '@/services/submissions-service';
import {GradesService} from "@/services/grades-service";
import {ISubmission} from "@/models/ISubmission";
import {HomeworksService} from "@/services/homeworks-service";
import {IHomework} from "@/models/IHomework";
import {GradeType, IGrade} from "@/models/IGrade";
import {getParsedJwt} from "@/util/jwt";
import {IJwt} from "@/models/IJwt";

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class GradeSubmission extends Vue {
  submissionService: SubmissionsService | null = null
  gradeService: GradesService | null = null
  homeworkService: HomeworksService | null = null

  submission: ISubmission | null = null
  homework: IHomework | null = null
  newGrade: IGrade = {value: 0, gradeType: GradeType.SUBMISSION}

  mounted() {
    this.submissionService = new SubmissionsService();
    this.gradeService = new GradesService();
    this.homeworkService = new HomeworksService();

    this.submissionService?.get(this.$route.params.id as string).then(res => {
      if (res.data) this.submission = res.data
      console.log(this.submission)
      this.homeworkService?.get(this.submission!.homeworkId!).then(resp => {
        if (resp.data) this.homework = resp.data
      })
    })
  }

  updateGrade() {
    this.gradeService?.put(this.submission!.grade!).then(_ => {
      this.submissionService?.get(this.$route.params.id as string).then(res => {
        if (res.data) this.submission = res.data
      })
    })
  }

  addGrade() {
    this.gradeService?.post(this.newGrade).then(grade => {
      console.log('grade', grade);
      if (grade.data) {
        this.submission!.gradeId = grade.data!.id!
        this.submissionService?.put(this.submission!).then(_ =>
            this.submissionService?.get(this.$route.params.id as string).then(res => {
              if (res.data) this.submission = res.data
            }))
      }
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
