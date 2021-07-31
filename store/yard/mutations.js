import { typesYard as types } from './types';
const mutations = {
  [types.mutations.SET_YARDS] (state, payload) {
    state.yards = payload;
  },
  [types.mutations.SET_YARD] (state, payload) {
    state.yard = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
