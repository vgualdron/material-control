import { typesCommon } from '@/store/common/typesCommon';
import SynchronizeApi from '@/api/synchronize/SynchronizeApi';
import { typesSynchronize as types } from './types';
const synchronizeApi = new SynchronizeApi();
const actions = {
  async [types.actions.GET_DATA_FROM_SERVER] ({ commit, dispatch }) {
    console.log('action getdatatoserver1');
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await synchronizeApi.getDataFromServer().then((res) => {
      console.log('action getdatatoserver2');
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_DATA_FROM_SERVER, res.data.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      commit(types.mutations.SET_STATUS, false);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      console.log('action getdatatoserver3');
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SET_DATA_TO_SERVER] ({ commit, dispatch }, data) {
    console.log('action setdatatoserver1');
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await synchronizeApi.setDataToServer(data).then((res) => {
      console.log('action setdatatoserver2');
      commit(types.mutations.SET_STATUS, true);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      console.log('action setdatatoserver3');
      commit(types.mutations.SET_STATUS, false);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SET_DATA_TO_LOCALE] ({ commit, dispatch }, data) {
    console.log('action setdatatolocaleaction1');
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await synchronizeApi.setDataToLocale(data).then((res) => {
      console.log('action setdatatolocaleaction2');
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, res, { root: true });
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error, { root: true });
      console.log('action setdatatolocaleaction3');
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
