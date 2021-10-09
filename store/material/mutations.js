import { typesMaterial as types } from './types';
const mutations = {
  [types.mutations.SET_MATERIALS] (state, payload) {
    state.materials = payload;
  },
  [types.mutations.SET_LOCALE_MATERIALS] (state, payload) {
    state.localeMaterials = payload;
  },
  [types.mutations.SET_MATERIAL] (state, payload) {
    state.material = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
