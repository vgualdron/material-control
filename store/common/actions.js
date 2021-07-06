import PermisionsApi from '@/api/permisions/PermisionsApi';
import { typesCommon as types } from './typesCommon';
const permisionsApi = new PermisionsApi();
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
    permisionsApi.getPermisionsBySesion().then((res) => {
      dispatch(types.actions.SET_USER_PERMISIONS, res.data);
    }).catch((error) => {
      alert(error);
    }).finally((e) => {
      commit(types.mutations.SET_LOADER_STATUS, false);
    });
  }

};
export default actions;
