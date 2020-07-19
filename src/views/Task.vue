<template>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-card-title>{{ task.name }}</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  data() {
    return {
      dialog: true
    };
  },
  destroyed() {
    this.dialog = true;
  }
};
</script>