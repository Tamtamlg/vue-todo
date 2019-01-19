<template>
  <div class="about">
    <ul class="todo-list">
      <li class="todo-item" v-for="task in tasks" :key="task.id">
        <task
          :id="task.id"
          :title="task.title"
          :projectName="task.projectName"
          :priority="task.priority"
          :description="task.description"
          @edit="edit"
        ></task>
      </li>
    </ul>
    <edit-form v-if="isEdit" :editData="editData"></edit-form>
    <control-panel v-if="!isEdit"></control-panel>
  </div>
</template>

<script>
import task from "../components/Task.vue";
import editForm from "../components/EditForm.vue";
import controlPanel from "../components/ControlPanel.vue";
export default {
  data() {
    return {
      editData: {
        title: "",
        projectName: "",
        priority: 1,
        description: ""
      }
    };
  },
  components: {
    task,
    editForm,
    controlPanel
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    isEdit() {
      return this.$store.getters.isEdit;
    }
  },
  methods: {
    edit(data) {
      this.editData = data;
    }
  }
};
</script>

<style>
.about {
  text-align: left;
  width: 500px;
  margin: auto;
}
.todo-list {
  list-style: none;
  padding: 10px;
  max-height: 500px;
  overflow-y: auto;
  border: 2px solid black;
}
.todo-item {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid black;
}
</style>
