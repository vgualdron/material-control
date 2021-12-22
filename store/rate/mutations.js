import { typesRate as types } from './types';
const mutations = {
  [types.mutations.SET_RATES] (state, payload) {
    state.rates = payload;
  },
  [types.mutations.SET_RATE] (state, payload) {
    state.rate = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
