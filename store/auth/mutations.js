import { typesAuth as types } from './types';
const mutations = {
  [types.mutations.SET_AUTHORIZATION_TOKEN] (state, payload) {
    state.authorizationToken = payload;
  },
  [types.mutations.SET_ACTIVE_TOKEN] (state, payload) {
    state.activeToken = payload;
  }
};
export default mutations;
