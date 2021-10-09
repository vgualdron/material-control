import { typesTiquet as types } from './types';
const mutations = {
  [types.mutations.SET_TIQUETS] (state, payload) {
    state.tiquets = payload;
  },
  [types.mutations.SET_NOT_SYNCHRONIZED_TIQUETS] (state, payload) {
    state.tiquets = payload;
  },
  [types.mutations.SET_TIQUET] (state, payload) {
    state.tiquet = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
