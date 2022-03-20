import { typesAdminMaterialSettlement as types } from './types';
const mutations = {
  [types.mutations.SET_ADMIN_MATERIAL_SETTLEMENTS] (state, payload) {
    state.adminMaterialSettlements = payload;
  },
  [types.mutations.SET_ADMIN_MATERIAL_SETTLEMENT] (state, payload) {
    state.adminMaterialSettlement = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
