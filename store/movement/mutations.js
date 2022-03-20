import { typesMovement as types } from './types';
const mutations = {
  [types.mutations.SET_MOVEMENTS] (state, payload) {
    state.movements = payload;
  }
};
export default mutations;
