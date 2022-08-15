export interface TokensType {
  [key: string]: {
    token: string;
  };
}

export interface UsersType {
  [keu: string]: {
    roles: (string | number)[];
    avatar: string;
    nickname: string;
  };
}
