import AdminFreightSettlementApi from '@/api/adminFreightSettlement/AdminFreightSettlementApi';
import { typesCommon } from '@/store/common/typesCommon';
import { typesAdminFreightSettlement as types } from './types';
const adminFreightSettlementApi = new AdminFreightSettlementApi();
const actions = {
  async [types.actions.GET_ADMIN_FREIGHT_SETTLEMENTS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await adminFreightSettlementApi.get(data).then((res) => {
      commit(types.mutations.SET_ADMIN_FREIGHT_SETTLEMENTS, res.data);
    }).catch((error) => {
      console.log(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SET_ADMIN_FREIGHT_SETTLEMENT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await adminFreightSettlementApi.getById(data.id).then((res) => {
      commit(types.mutations.SET_ADMIN_FREIGHT_SETTLEMENT, res.data);
    }).catch((error) => {
      console.log(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  [types.actions.SET_SHOW_MODAL_FORM] ({ commit }, data) {
    commit(types.mutations.SET_SHOW_MODAL_FORM, data);
  },
  [types.actions.SET_TYPE_ACTION] ({ commit }, data) {
    commit(types.mutations.SET_TYPE_ACTION, data);
  },
  async [types.actions.EDIT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await adminFreightSettlementApi.edit(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_ADMIN_FREIGHT_SETTLEMENTS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.PRINT] ({ commit, dispatch }, data) {
    await adminFreightSettlementApi.print(data);
  }
};
export default actions;
