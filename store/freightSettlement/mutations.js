import { typesFreightSettlement as types } from './types';
const mutations = {
  [types.mutations.SET_FREIGHT_SETTLEMENTS] (state, payload) {
    state.freightSettlements = payload;
  },
  [types.mutations.SET_FREIGHT_SETTLEMENT] (state, payload) {
    state.freightSettlement = payload;
  }
};
export default mutations;
