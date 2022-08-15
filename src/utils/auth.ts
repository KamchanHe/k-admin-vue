import storage from '@/utils/storage';

const TokenKey = 'K-Admin-Token';
export function getToken(): string {
  return storage.localGet(TokenKey) || '';
}

export function setToken(token: string) {
  return storage.localSet(TokenKey, token);
}

export function removeToken() {
  return storage.localRemove(TokenKey);
}

export default {};
