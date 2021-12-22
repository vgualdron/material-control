import { typesCommon } from '@/store/common/typesCommon';
import SynchronizeApi from '@/api/synchronize/SynchronizeApi';
import { getDataFromServer } from '@/helpers/synchronize';
import { typesSynchronize as types } from './types';
const synchronizeApi = new SynchronizeApi();
const actions = {
  async [types.actions.GET_DATA_FROM_SERVER] ({ commit, dispatch }) {
    console.log('action getdatatoserver1');
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await synchronizeApi.getDataFromServer().then((res) => {
      console.log('action getdatatoserver2');
      getDataFromServer(res.data);
    }).catch((error) => {
      console.log('action getdatatoserver3');
      alert(error);
    }).finally((e) => {
      console.log('action getdatatoserver4');
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SET_DATA_TO_SERVER] ({ commit, dispatch }, data) {
    console.log('action setdatatoserver1');
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await synchronizeApi.setDataToServer(data).then((res) => {
      console.log('action setdatatoserver2');
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, res, { root: true });
    }).catch((error) => {
      console.log('action setdatatoserver3');
      alert(error);
    }).finally((e) => {
      console.log('action setdatatoserver4');
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
