import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Junior from "../views/Junior.vue";
import Adult from "../views/Adult.vue";
import PrivateLessons from "../views/PrivateLessons.vue";
import Tournaments from "../views/Tournaments.vue";
import Staff from "../views/Staff.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/junior", name: "Junior", component: Junior },
  { path: "/adult", name: "Adult", component: Adult },
  { path: "/privatelessons", name: "PrivateLessons", component: PrivateLessons },
  { path: "/tournaments", name: "Tournaments", component: Tournaments },
  { path: "/staff", name: "Staff", component: Staff },
  { path: "/contact", name: "Contact", component: Contact },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    return { top: 0 };
  },
});

export default router;
