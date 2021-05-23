<template>
  <h1 class="title">
    {{subject?.title}}
  </h1>
  <span>
    {{subject?.description}}
  </span>
  <h2 class="subtitle is-3">
    Homeworks
  </h2>
  <div v-if="subject" v-for="homework of subject.homeworks" :key="homework.id" class="card columns m-4">
    <div class="column is-one-third">
      {{homework.title}}
    </div>
    <div class="column is-one-third">
      {{homework.description}}
    </div>
    <div class="column is-one-third">
      <ul>
        <li v-for="submission of homework.submissions">
          <router-link :to="'/submissions/' + submission.id">{{submission.id}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {SubjectsService} from "@/services/subjects-service";
import {ISubject} from "@/models/ISubject";

@Options({
  components: {},
  props: {
    id: String
  }
})
export default class SubjectDetails extends Vue {
  service: SubjectsService | null = null
  subject: ISubject | null = null

  mounted() {
    this.service = new SubjectsService()
    this.service.get(this.$route.params.id as string).then(res => {
      if (res.data) {
        this.subject = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
