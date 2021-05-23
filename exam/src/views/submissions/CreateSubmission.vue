<template>
  <h1 class="title is-2">{{homework?.title}}</h1>
  <span>{{homework?.description}}</span>
  <h2 class="subtitle is-3">Answer</h2>
  <input type="text" class="textarea m-6" v-model="submission.value">
  <button class="button is-primary" @click="submit">Submit</button>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {HomeworksService} from "@/services/homeworks-service";
import {SubmissionsService} from "@/services/submissions-service";
import {IHomework} from "@/models/IHomework";
import {ISubmission} from "@/models/ISubmission";

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class CreateSubmission extends Vue {
  homeworkService: HomeworksService | null = null
  submissionService: SubmissionsService | null = null
  homework: IHomework | null = null
  submission: ISubmission = { homeworkId: '', value:'', appUserId: null, gradeId: null, grade: null}

  mounted() {
    this.homeworkService = new HomeworksService()
    this.submissionService = new SubmissionsService()

    this.homeworkService.get(this.$route.params.id as string).then(res => {
      if (res.data) this.homework = res.data
    })
  }

  submit() {
    this.submission.homeworkId = this.homework!.id!
    this.submissionService?.post(this.submission).then(res => {
      if (res.data) {
        this.$router.push('/subjects/' + this.homework?.subjectId)
      }
    })
  }
}
</script>

<style scoped>

</style>
