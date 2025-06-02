import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    // Login
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/study/:id",
      name: "study-details",
      component: () => import("../views/StudyDetail.vue"),
    },
  ],
});

// Helper to check if JWT is expired
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // exp is in seconds, Date.now() in ms
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || isTokenExpired(accessToken)) {
      return next({ name: "login" });
    }
  }
  next();
});

export default router;
