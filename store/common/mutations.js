import { typesCommon as types } from './typesCommon';
const mutations = {
  [types.mutations.SET_ROUTER_ACTIVE] (state, payload) {
    state.routerActive = payload;
  },
  [types.mutations.SET_LOADER_STATUS] (state, payload) {
    state.loaderStatus = payload;
  },
  [types.mutations.SET_USER_PERMISIONS] (state, payload) {
    state.userPermisions = payload;
  },
  [types.mutations.SET_USER_PERMISIONS_GROUP] (state, payload) {
    state.userPermisionsGroup = payload;
  },
  [types.mutations.SET_TOAST] (state, payload) {
    state.toast = payload;
  }
};
export default mutations;
