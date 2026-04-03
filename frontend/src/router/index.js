import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Junior from "../views/Junior.vue";
import Adult from "../views/Adult.vue";
import PrivateLessons from "../views/PrivateLessons.vue";
import Tournaments from "../views/Tournaments.vue";
import Staff from "../views/Staff.vue";
import Contact from "../views/Contact.vue";
import Register from "../views/Register.vue";
import BookLesson from "../views/BookLesson.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import AdminStaff from "../views/AdminStaff.vue";
import AdminRegistrations from "../views/AdminRegistrations.vue";
import StaffPortal from "../views/StaffPortal.vue";
import { nextTick } from "vue";
import { requireAuth } from "../middleware/auth";

const routes = [
  // Public pages
  { path: "/", name: "Home", component: Home },
  { path: "/junior", name: "Junior", component: Junior },
  { path: "/adult", name: "Adult", component: Adult },
  { path: "/privatelessons", name: "PrivateLessons", component: PrivateLessons },
  { path: "/tournaments", name: "Tournaments", component: Tournaments },
  { path: "/staff", name: "Staff", component: Staff },
  { path: "/contact", name: "Contact", component: Contact },

  // Registration & booking (public)
  { path: "/register", name: "Register", component: Register },
  { path: "/book-lesson", name: "BookLesson", component: BookLesson },

  // Auth
  { path: "/login", name: "Login", component: Login },

  // Staff portal (requires auth)
  {
    path: "/staff-portal",
    name: "StaffPortal",
    component: StaffPortal,
    // StaffPortal handles its own auth gate inline
  },

  // Admin (requires auth)
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: requireAuth,
  },
  {
    path: "/admin/staff",
    name: "AdminStaff",
    component: AdminStaff,
    beforeEnter: requireAuth,
  },
  {
    path: "/admin/registrations",
    name: "AdminRegistrations",
    component: AdminRegistrations,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    if (to.hash) {
      return nextTick().then(() => ({ el: to.hash, behavior: "smooth" }));
    }

    return { top: 0, behavior: "smooth" };
  },
});

export default router;
