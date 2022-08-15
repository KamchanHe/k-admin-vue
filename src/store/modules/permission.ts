import { PermissionStoreType } from '@/types/store/permission';
import { RolesType } from '@/types/store/user';
import { defineStore } from 'pinia';
import { asyncRoutes, constantRoutes } from '@/router/modules/base';
import { RouteRecordRaw } from 'vue-router';

const hasPermission = (roles: RolesType, route: RouteRecordRaw) => {
  const targetRoles = route.meta?.roles as RolesType;
  if (targetRoles) {
    return roles.some((role) => targetRoles.includes(role));
  }
  return true;
};

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: RolesType
) => {
  const res: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
};

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionStoreType => ({
    routes: [],
    addRoutes: [],
    childrenRoutes: []
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    setChildrenRoutes(routes: RouteRecordRaw[]) {
      this.childrenRoutes = routes;
    },
    generateRoutes(roles: RolesType): Promise<RouteRecordRaw[]> {
      return new Promise<RouteRecordRaw[]>((resolve) => {
        let accessedRoutes;
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
});

export default usePermissionStore;
