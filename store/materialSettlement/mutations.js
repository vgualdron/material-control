import { typesMaterialSettlement as types } from './types';
const mutations = {
  [types.mutations.SET_MATERIAL_SETTLEMENTS] (state, payload) {
    state.materialSettlements = payload;
  },
  [types.mutations.SET_MATERIAL_SETTLEMENT] (state, payload) {
    state.materialSettlement = payload;
  }
};
export default mutations;
