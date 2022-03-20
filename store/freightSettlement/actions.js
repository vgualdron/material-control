import { typesCommon } from '@/store/common/typesCommon';
import { typesFreightSettlement as types } from './types';
import FreightSettlementApi from '~/api/freightSettlement/FreightSettlementApi';
const freightSettlementApi = new FreightSettlementApi();
const actions = {
  async [types.actions.GET_FREIGHT_SETTLEMENTS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await freightSettlementApi.get(data).then((res) => {
      commit(types.mutations.SET_FREIGHT_SETTLEMENTS, res);
    }).catch((error) => {
      console.log(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SAVE] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    commit(types.mutations.SET_FREIGHT_SETTLEMENT, null);
    await freightSettlementApi.save(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_FREIGHT_SETTLEMENTS}`);
      commit(types.mutations.SET_FREIGHT_SETTLEMENT, resp.data.data);
      const res = { data: [] };
      commit(types.mutations.SET_FREIGHT_SETTLEMENTS, res);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.PRINT] ({ commit, dispatch }, data) {
    await freightSettlementApi.print(data);
  }
};
export default actions;
