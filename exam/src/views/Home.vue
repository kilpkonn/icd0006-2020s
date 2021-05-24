<template>
  <h1 class="title is-2">Stats</h1>
  <div class="columns">
  <table class="table is-fullwidth m-6">
      <thead>
      <tr>
        <th>Semester</th>
      </tr>
      </thead>
    <tbody>
    <tr v-for="semester in semesters" :key="semester.name">
      <td>{{semester.name}}</td>
      <td><ul>
        <li>Subjects: {{semester.subjects}}</li>
        <li>Students: {{semester.students}}</li>
        <li>Homeworks: {{semester.homeworks}}</li>
      </ul></td>
      <td><ul>
        <li>Average grade: {{semester.averageGrade}}</li>
        <li>Graded students: {{semester.gradedStudents}}</li>
        <li>Failed students: {{semester.failedStudents}}</li>
      </ul></td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import {StatsService} from "@/services/stats-service";
import {IStats} from "@/models/IStats"; // @ is an alias to /src

@Options({
  components: {
  },
})
export default class Home extends Vue {
  service: StatsService | null = null
  semesters: IStats[] = []

  mounted() {
    this.service = new StatsService();
    this.service.getAll().then(res => {
      if (res.data) this.semesters = res.data
    })
  }
}
</script>
