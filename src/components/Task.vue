<template>
  <div>
    <h3 class="task-heading">{{title}}</h3>
    <div class="task-info">
      <p>Project:
        <span>{{projectName}}</span>
      </p>
      <p>Priority: {{priority}}</p>
    </div>
    <p v-if="showDescription">{{description}}</p>
    <div class="task-buttons">
      <button @click="onEdit" :disabled="isEdit">Изменить</button>
      <button :disabled="isEdit" @click="deletTask">Удалить</button>
      <button @click="showDescription = !showDescription" :disabled="isEdit">
        <span v-if="!showDescription">Развернуть</span>
        <span v-else>Свернуть</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "projectName", "priority", "description"],
  data() {
    return {
      showDescription: false
    };
  },
  computed: {
    isEdit() {
      return this.$store.getters.isEdit;
    }
  },
  methods: {
    onEdit() {
      this.$store.commit("changeEditState", true);
      this.$store.commit("toggleNewTask", false);
      this.$emit("edit", {
        id: this.id,
        title: this.title,
        projectName: this.projectName,
        priority: this.priority,
        description: this.description
      });
    },
    deletTask() {
      this.$store.dispatch("delTask", this.id);
    }
  }
};
</script>

<style>
.task-heading {
  margin-top: 0;
}
.task-info,
.task-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
