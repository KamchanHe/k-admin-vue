/**
 * path: '/'
 * component: ()=> import('')
 * children: []
 * redirect: noRedirect           if set noRedirect will unRedirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    hidden: true                 if set true, item will not show in the sidebar(default is false)
    alwaysShow: true             if set true, will always show the root menu
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will be unCached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from '@/router/modules/base';
import usePermissionStore from '@/store/modules/permission';

const RouterInstance = () =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: constantRoutes
  });

const router = RouterInstance();

export function resetRouter() {
  const permissionStore = usePermissionStore();
  permissionStore.routes.forEach((route) => {
    const { name } = route;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}

export default router;
