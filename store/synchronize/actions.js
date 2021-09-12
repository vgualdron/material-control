import { typesCommon } from '@/store/common/typesCommon';
import SynchronizeApi from '@/api/synchronize/SynchronizeApi';
import { typesSynchronize as types } from './types';
import { getDataFromServer } from '@/helpers/synchronize';
const synchronizeApi = new SynchronizeApi();
const actions = {
  async [types.actions.GET_DATA_FROM_SERVER] ({ commit, dispatch }) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await synchronizeApi.getDataFromServer().then((res) => {
      getDataFromServer(res.data);
    }).catch((error) => {
      alert(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
