import { typesAdminFreightSettlement as types } from './types';
const mutations = {
  [types.mutations.SET_ADMIN_FREIGHT_SETTLEMENTS] (state, payload) {
    state.adminFreightSettlements = payload;
  },
  [types.mutations.SET_ADMIN_FREIGHT_SETTLEMENT] (state, payload) {
    state.adminFreightSettlement = payload;
  },
  [types.mutations.SET_SHOW_MODAL_FORM] (state, payload) {
    state.showModalForm = payload;
  },
  [types.mutations.SET_TYPE_ACTION] (state, payload) {
    state.typeAction = payload;
  }
};
export default mutations;
