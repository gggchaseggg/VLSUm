import { createRouter, createWebHistory } from "vue-router";
import Layout from "../ui/Layout.vue";
import Main from "../pages/Main.vue";
import Cart from "../pages/Cart.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: Main,
      },
      {
        path: "cart",
        component: Cart,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
