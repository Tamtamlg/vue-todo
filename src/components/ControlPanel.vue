<template>
  <div class="control-panel">
    <button @click="showNewTaskForm">Новая задача</button>
  </div>
</template>

<script>
export default {
  methods: {
    addTask() {
      this.$store.dispatch("addTask");
      this.$store.commit("toggleNewTask", true);
    },
    showNewTaskForm() {
      this.$store.commit("toggleNewTask", true);
      this.$store.commit("changeEditState", true);
    }
  }
};
</script>

<style>
.control-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
