import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "board",
    component: () => import("../views/Board.vue"),
    children: [
      {
        path: "/task/:id",
        name: "task",
        component: () => import("../views/Task.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
