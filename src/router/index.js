import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Programs from "../views/Programs.vue";
import Tournaments from "../views/Tournaments.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/programs", name: "Programs", component: Programs },
  { path: "/tournaments", name: "Tournaments", component: Tournaments },
  // add more routes here…
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
