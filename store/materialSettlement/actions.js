import { typesCommon } from '@/store/common/typesCommon';
import { typesMaterialSettlement as types } from './types';
import MaterialSettlementApi from '~/api/materialSettlement/MaterialSettlementApi';
const materialSettlementApi = new MaterialSettlementApi();
const actions = {
  async [types.actions.GET_MATERIAL_SETTLEMENTS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await materialSettlementApi.get(data).then((res) => {
      commit(types.mutations.SET_MATERIAL_SETTLEMENTS, res);
    }).catch((error) => {
      console.log(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SAVE] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    commit(types.mutations.SET_MATERIAL_SETTLEMENT, null);
    await materialSettlementApi.save(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_MATERIAL_SETTLEMENTS}`);
      console.log(resp.data.data);
      commit(types.mutations.SET_MATERIAL_SETTLEMENT, resp.data.data);
      const res = { data: [] };
      commit(types.mutations.SET_MATERIAL_SETTLEMENTS, res);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.PRINT] ({ commit, dispatch }, data) {
    await materialSettlementApi.print(data);
  }
};
export default actions;
