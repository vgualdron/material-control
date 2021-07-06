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
  }
};
export default mutations;
