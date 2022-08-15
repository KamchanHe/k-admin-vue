import { _RouteRecordBase } from 'vue-router';
import { RolesType } from '@/types/store/user';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface _RouteRecordBase {
    parentPath?: string;
    meta?: {
      roles?: RolesType;
      title?: string;
      icon?: string;
      affix?: boolean;
      hidden?: boolean;
      noCache?: boolean;
    };
  }
}

export default {
  _RouteRecordBase
};
