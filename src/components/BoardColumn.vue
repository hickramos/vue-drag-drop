<template>
  <v-card
    color="#eee"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
  >
    <v-card-title class="subtitle-1 font-weight-bold">{{ column.name }}</v-card-title>

    <v-card-text v-if="column.tasks.length > 0">
      <column-task
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :task-index="$taskIndex"
        :column="column"
        :column-index="columnIndex"
        :board="board"
      />
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <v-text-field
        label="Task name"
        @keyup.enter="createTask($event, column.tasks)"
        autocomplete="off"
        solo
        flat
        dense
        hide-details
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import ColumnTask from "@/components/ColumnTask";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

export default {
  components: {
    ColumnTask
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value
      });

      event.target.value = "";
    },
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "column");
    }
  }
};
</script>
