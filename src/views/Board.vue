<template>
  <div class="board">
    <v-row>
      <v-col v-for="(column, $columnIndex) of board.columns" :key="$columnIndex">
        <v-card
          color="#eee"
          draggable
          @dragover.prevent
          @dragenter.prevent
          @dragstart.self="pickupColumn($event, $columnIndex)"
          @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        >
          <v-card-title class="subtitle-1 font-weight-bold">{{ column.name }}</v-card-title>

          <v-card-text v-if="column.tasks.length > 0">
            <v-card
              v-for="(task, $taskIndex) of column.tasks"
              :key="$taskIndex"
              class="mb-2"
              draggable
              @dragover.prevent
              @dragenter.prevent
              @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
              @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
            >
              <v-card-title class="subtitle-1 font-weight-bold">{{ task.name }}</v-card-title>
            </v-card>
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
      </v-col>
      <v-col>
        <v-card color="#eee">
          <v-card-text>
            <v-text-field
              v-model="newColumnName"
              @keyup.enter="createColumn"
              label="Column name"
              autocomplete="off"
              solo
              flat
              dense
              hide-details
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      newColumnName: ""
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  methods: {
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value
      });

      event.target.value = "";
    },
    createColumn() {
      this.$store.commit("CREATE_COLUMN", { name: this.newColumnName });
      this.newColumnName = "";
    },
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-task-index", taskIndex);
      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "task");
    },
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-column-index", fromColumnIndex);
      event.dataTransfer.setData("type", "column");
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData("type");

      if (type === "task") {
        this.moveTask(
          event,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        );
      } else {
        this.moveColumn(event, toColumnIndex);
      }
    },
    moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const fromTaskIndex = event.dataTransfer.getData("from-task-index");

      this.$store.commit("MOVE_TASK", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      });
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");

      console.log(fromColumnIndex);
      console.log(toColumnIndex);

      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    }
  }
};
</script>