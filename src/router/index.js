import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Clinics from "../views/Clinics.vue";
import PrivateLessons from "../views/PrivateLessons.vue";
import Tournaments from "../views/Tournaments.vue";
import Staff from "../views/Staff.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/clinics", name: "Clinics", component: Clinics },
  { path: "/privatelessons", name: "PrivateLessons", component: PrivateLessons },
  { path: "/tournaments", name: "Tournaments", component: Tournaments },
  { path: "/staff", name: "Staff", component: Staff },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
