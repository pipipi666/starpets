import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../pages/mainPage.vue"),
    },
    {
      path: "/convert",
      name: "convert",
      component: () => import("../pages/convertPage.vue"),
    },
  ],
});

export default router;
