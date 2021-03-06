import authApi from '~/api/auth/AuthApi';
import { typesCommon } from '@/store/common/typesCommon';
import { typesAuth as types } from './types';
const actions = {
  async [types.actions.GET_ACTIVE_TOKEN] ({ commit, dispatch }) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await authApi.getActiveToken().then((res) => {
      commit(types.mutations.SET_ACTIVE_TOKEN, res.data.token);
    }).catch((error) => {
      alert(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.LOGIN] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await authApi.login(data).then((res) => {
      commit(types.mutations.SET_AUTHORIZATION_TOKEN, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_ROUTER_ACTIVE}`, '/', { root: true });
    }).catch((error) => {
      console.error(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  [types.actions.SET_AUTHORIZATION_TOKEN] ({ commit, dispatch }, data) {
    commit(types.mutations.SET_AUTHORIZATION_TOKEN, data);
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_USER}`, data, { root: true });
  },
  [types.actions.SET_USER_PERMISIONS] ({ commit }, data) {
    commit(types.mutations.SET_USER_PERMISIONS, data);
  },
  [types.actions.LOGOUT] ({ commit }, data) {
    commit(types.mutations.SET_AUTHORIZATION_TOKEN, data);
  },
  async [types.actions.GET_DATA_SESSION] ({ commit, dispatch }) {
    await authApi.get().then((res) => {
      commit(types.mutations.SET_DATA_SESSION, res.data);
    }).catch((error) => {
      console.error(error);
    });
  }
};
export default actions;
