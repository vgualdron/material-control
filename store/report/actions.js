import { typesReport as types } from './types';
import { typesCommon } from '@/store/common/typesCommon';
import ReportApi from '@/api/report/ReportApi';
const reportApi = new ReportApi();
const actions = {
  async [types.actions.GET_MOVEMENTS_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getMovementsReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_YARD_STOCK_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getYardStcokReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_COMPLETE_TRANSFER_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getCompleteTransfersReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_UNCOMPLETE_TRANSFERS_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getUncompleteTransfersReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_UNBILLED_PURCHASES_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getUnbilledPurchasesReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_UNBILLED_SALES_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getUnbilledSalesReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_UNBILLED_FREIGHT_REPORT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await reportApi.getUnbilledFreightReport(data).then((res) => {
      commit(types.mutations.SET_REPORTS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
