import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "main",
      path: '/',
        //@ts-ignore
      component: () => import('@/pages/index.vue'),
    },
    {
      name: "city",
      path: "/city",
        //@ts-ignore
      component: () => import('@/pages/city.vue')
    }
  ]
});

export default router;
