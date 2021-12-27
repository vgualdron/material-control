import { typesSynchronize as types } from './types';
const mutations = {
  [types.mutations.SET_DATA_FROM_SERVER] (state, payload) {
    state.dataFromServer = payload;
  },
  [types.mutations.SET_STATUS] (state, payload) {
    state.statusSynchronize = payload;
  }
};
export default mutations;
