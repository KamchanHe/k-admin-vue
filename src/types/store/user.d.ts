export type RolesType = (string | number)[];

export interface UserStoreType {
  token: string;
  nickname: string;
  avatar: string;
  roles: RolesState;
}
