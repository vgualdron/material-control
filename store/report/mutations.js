import { typesReport as types } from './types';
const mutations = {
  [types.mutations.SET_REPORTS] (state, payload) {
    state.dataReports = payload;
  }
};
export default mutations;
