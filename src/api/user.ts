import Service from '@/utils/request';

export function login<Q, S>(data: Q) {
  return Service.post<Q, S>('/user/login', data);
}

export function getInfo<Q, S>(params: Q) {
  return Service.get<Q, S>('/user/info', params);
}

export function logout() {
  return Service.post('/user/logout');
}
