<template>
  <div class="board">
    <v-row>
      <v-col v-for="(column, $columnIndex) of board.columns" :key="$columnIndex">
        <board-column :column="column" :column-index="$columnIndex" :board="board" />
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
import BoardColumn from "@/components/BoardColumn";

export default {
  components: {
    BoardColumn
  },
  data() {
    return {
      newColumnName: ""
    };
  },
  computed: mapState(["board"]),
  methods: {
    createColumn() {
      this.$store.commit("CREATE_COLUMN", { name: this.newColumnName });
      this.newColumnName = "";
    }
  }
};
</script>