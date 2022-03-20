import AdjustmentApi from '@/api/adjustment/AdjustmentApi';
import { typesCommon } from '@/store/common/typesCommon';
import { typesAdjustment as types } from './types';
const adjustmentApi = new AdjustmentApi();
const actions = {
  async [types.actions.GET_ADJUSTMENTS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await adjustmentApi.get(data).then((res) => {
      commit(types.mutations.SET_ADJUSTMENTS, res.data);
    }).catch((error) => {
      console.log(error);
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SET_ADJUSTMENT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await adjustmentApi.getById(data.id).then((res) => {
      commit(types.mutations.SET_ADJUSTMENT, res.data);
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
  async [types.actions.SAVE] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await adjustmentApi.save(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_ADJUSTMENTS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.EDIT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await adjustmentApi.edit(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_ADJUSTMENTS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.DELETE] ({ commit, dispatch }, id) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await adjustmentApi.delete(id).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_ADJUSTMENTS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
