import { typesZone as types } from './types';
const mutations = {
  [types.mutations.SET_ZONES] (state, payload) {
    state.zones = payload;
  },
  [types.mutations.SET_ZONE] (state, payload) {
    state.zone = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
