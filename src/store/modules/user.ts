import { UserStoreType } from '@/types/store/user';
import { defineStore } from 'pinia';
import { getInfo, login, logout } from '@/api/user';
import { LoginAxiosType, UserInfoAxiosType } from '@/types/api/user';
import {
  getToken as authGetToken,
  removeToken as authRemoveToken,
  setToken as authSetToken
} from '@/utils/auth';
import { resetRouter } from '@/router';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserStoreType => ({
    token: authGetToken(),
    nickname: '',
    avatar: '',
    roles: []
  }),
  actions: {
    resetState() {
      this.$reset();
    },
    /**
     * 登录
     */
    login(loginData: { username: string; password: string }) {
      const { username, password } = loginData;
      return new Promise((resolve, reject) => {
        login<LoginAxiosType['Q'], LoginAxiosType['S']>({
          username: username.trim(),
          password
        })
          .then((res) => {
            const { token } = res.data;
            authSetToken(token);
            this.token = token;
            return resolve(token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getInfo<UserInfoAxiosType['Q'], UserInfoAxiosType['S']>({
          token: this.token
        })
          .then((res) => {
            const { data } = res;
            if (!data) {
              reject(new Error('Verification failed, please Login again.'));
            }

            const { roles, nickname, avatar } = data;

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              return reject(
                new Error('getInfo: roles must be a non-null array!')
              );
            }
            this.nickname = nickname;
            this.avatar = avatar;
            this.roles = roles;
            return resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            authRemoveToken();
            this.resetState();
            resetRouter();
            return resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        authRemoveToken();
        this.resetState();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
