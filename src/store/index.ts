import useUserStore from './modules/user';
import usePermissionStore from './modules/permission';

export { useUserStore, usePermissionStore };

const useStore = () => ({
  userStore: useUserStore,
  permissionStore: usePermissionStore
});

export default useStore;
