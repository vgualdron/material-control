import { typesUser as types } from './types';
const mutations = {
  [types.mutations.SET_USERS] (state, payload) {
    state.users = payload;
  },
  [types.mutations.SET_USER] (state, payload) {
    state.user = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
