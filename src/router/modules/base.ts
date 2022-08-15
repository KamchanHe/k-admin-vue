import { RouteRecordRaw } from 'vue-router';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  }
];

export const asyncRoutes: RouteRecordRaw[] = [];
