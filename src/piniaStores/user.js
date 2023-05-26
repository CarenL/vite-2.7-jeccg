import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '@utils/auth';

export const userStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  }),
  getter,
});
