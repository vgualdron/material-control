import { typesAdminTiquet as types } from './types';
const mutations = {
  [types.mutations.SET_TIQUETS] (state, payload) {
    state.adminTiquets = payload;
  },
  [types.mutations.SET_TIQUET] (state, payload) {
    state.adminTiquet = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
