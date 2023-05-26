import { get, post } from '@/utils/request';

export function getCaptchaImage(key) {
  return get(`/sys/randomImage/${key}`);
}

export function login(data) {
  return post('/sys/login', data);
}

export function getInfo(params) {
  return get('/sys/permission/getUserPermissionByToken', params);
}

export function logout() {
  return post('/sys/logout');
}
