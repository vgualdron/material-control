import { typesRole as types } from './types';
const mutations = {
  [types.mutations.SET_ROLES] (state, payload) {
    state.roles = payload;
  },
  [types.mutations.SET_ROLE] (state, payload) {
    state.role = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
