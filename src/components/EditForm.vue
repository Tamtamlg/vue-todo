<template>
  <form class="edit-form">
    <div class="input-wrap">
      <label for>Название задачи</label>
      <input type="text" v-model="editFormData.title">
    </div>
    <div class="input-wrap">
      <label for>Название проекта</label>
      <input type="text" v-model="editFormData.projectName">
    </div>
    <div class="input-wrap">
      <label for>Приоритет</label>
      <select name id v-model="editFormData.priority">
        <option
          v-for="item in 3"
          :key="item"
          :value="item"
          :selected="editFormData.priority === item"
        >{{item}}</option>
      </select>
    </div>
    <div class="input-wrap">
      <label for>Описание</label>
      <textarea name id cols="30" rows="5" v-model="editFormData.description"></textarea>
    </div>
    <div class="input-wrap">
      <div class="edit-form__buttons">
        <button type="button" @click="saveEdit">Сохранить</button>
        <button type="button" @click="cancelEdit">Отмена</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ["editData"],
  methods: {
    cancelEdit() {
      this.$store.commit("changeEditState", false);
      if (this.isNewTask) {
        this.$store.commit("toggleNewTask", false);
      }
    },
    saveEdit() {
      if (this.isNewTask) {
        this.$store.dispatch("addTask", {
          title: this.editFormData.title,
          projectName: this.editFormData.projectName,
          priority: this.editFormData.priority,
          description: this.editFormData.description
        });
      } else {
        this.$store.dispatch("editTask", {
          id: this.editFormData.id,
          title: this.editFormData.title,
          projectName: this.editFormData.projectName,
          priority: this.editFormData.priority,
          description: this.editFormData.description
        });
      }
    }
  },
  computed: {
    isNewTask() {
      return this.$store.state.isNewTask;
    },
    editFormData() {
      if (this.isNewTask) {
        return {
          title: "",
          projectName: "",
          priority: 1,
          description: ""
        };
      } else {
        return this.editData;
      }
    }
  }
};
</script>

<style>
.edit-form {
  width: 500px;
  padding: 10px;
  border: 2px solid black;
}
.input-wrap:not(:last-child) {
  margin-bottom: 15px;
}
.input-wrap {
  display: flex;
  justify-content: space-between;
}
.input-wrap label {
  width: 150px;
  display: inline-block;
  margin-right: 10px;
  text-align: right;
}
.input-wrap select,
.input-wrap input,
.input-wrap textarea,
.edit-form__buttons {
  width: 300px;
}
.edit-form__buttons {
  margin-left: auto;
}
.edit-form__buttons button {
  margin-right: 20px;
}
</style>
