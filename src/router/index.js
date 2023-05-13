import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/students",
    name: "students",
    component: () =>
      import(/* webpackChunkName: "students" */ "../views/Students.vue"),
  },
  {
    path: "/timetable",
    name: "timetable",
    component: () =>
      import(/* webpackChunkName: "timetable" */ "../views/Timetable.vue"),
  },
  {
    path: "/teachers",
    name: "teachers",
    component: () =>
      import(/* webpackChunkName: "teachers" */ "../views/Teachers.vue"),
  },
  {
    path: "/lessons",
    name: "lessons",
    component: () =>
      import(/* webpackChunkName: "lessons" */ "../views/Lessons.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
