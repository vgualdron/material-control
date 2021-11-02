import { typesThird as types } from './types';
const mutations = {
  [types.mutations.SET_LOCALE_SUPPLIER_THIRDS] (state, payload) {
    state.localeSupplierThirds = payload;
  },
  [types.mutations.SET_LOCALE_CUSTOMER_THIRDS] (state, payload) {
    state.localeCustomerThirds = payload;
  },
  [types.mutations.SET_LOCALE_CONVEYOR_THIRDS] (state, payload) {
    state.localeConveyorThirds = payload;
  }
};
export default mutations;
