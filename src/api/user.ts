import Service from '@/utils/request';

const service = new Service();

export function login<Q, S>(data: Q) {
  return service.post<Q, S>('/user/login', data);
}

export function getInfo<Q, S>(params: Q) {
  return service.get<Q, S>('/user/info', params);
}

export function logout() {
  return service.post('/user/logout');
}
