import PermisionApi from '@/api/permision/PermisionApi';
import { createToast } from '@/helpers/common/toast';
import { typesCommon as types } from './typesCommon';
const permisionApi = new PermisionApi();
const actions = {
  [types.actions.SET_ROUTER_ACTIVE] ({ commit }, data) {
    commit(types.mutations.SET_ROUTER_ACTIVE, data);
    this.$router.push({ path: data });
  },
  [types.actions.SET_LOADER_STATUS] ({ commit }, data) {
    commit(types.mutations.SET_LOADER_STATUS, data);
  },
  [types.actions.SET_USER] ({ commit }, data) {
    localStorage.setItem('user', JSON.stringify(data));
  },
  [types.actions.GET_USER] () {
    return JSON.stringify(localStorage.getItem('user'));
  },
  [types.actions.SET_USER_PERMISIONS] ({ commit }, data) {
    commit(types.mutations.SET_USER_PERMISIONS, data);
  },
  [types.actions.GET_USER_PERMISIONS] ({ commit, dispatch }) {
    commit(types.mutations.SET_LOADER_STATUS, true);
    permisionApi.getPermisionsBySesion().then((res) => {
      dispatch(types.actions.SET_USER_PERMISIONS, res.data);
    }).catch((error) => {
      alert(error);
    }).finally((e) => {
      commit(types.mutations.SET_LOADER_STATUS, false);
    });
  },
  [types.actions.SET_USER_PERMISIONS_GROUP] ({ commit }, data) {
    commit(types.mutations.SET_USER_PERMISIONS_GROUP, data);
  },
  [types.actions.GET_USER_PERMISIONS_GROUP] ({ commit, dispatch }) {
    commit(types.mutations.SET_LOADER_STATUS, true);
    permisionApi.getPermisionsBySesionGroup().then((res) => {
      dispatch(types.actions.SET_USER_PERMISIONS_GROUP, res.data);
    }).catch((error) => {
      alert(error);
    }).finally((e) => {
      commit(types.mutations.SET_LOADER_STATUS, false);
    });
  },
  [types.actions.SET_PERMISSIONS_GROUP] ({ commit }, data) {
    commit(types.mutations.SET_PERMISSIONS_GROUP, data);
  },
  [types.actions.GET_PERMISSIONS_GROUP] ({ commit, dispatch }) {
    commit(types.mutations.SET_LOADER_STATUS, false);
    permisionApi.getPermissionsGroup().then((res) => {
      dispatch(types.actions.SET_PERMISSIONS_GROUP, res.data);
    }).catch((error) => {
      alert(error);
    });
  },
  [types.actions.SET_TOAST] ({ commit }, data) {
    const toast = createToast(data);
    commit(types.mutations.SET_TOAST, toast);
  }
};
export default actions;
