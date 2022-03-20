import { typesAdjustment as types } from './types';
const mutations = {
  [types.mutations.SET_ADJUSTMENTS] (state, payload) {
    state.adjustments = payload;
  },
  [types.mutations.SET_ADJUSTMENT] (state, payload) {
    state.adjustment = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
