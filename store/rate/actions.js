import RateApi from '@/api/rate/RateApi';
import { typesCommon } from '@/store/common/typesCommon';
import { typesRate as types } from './types';
const rateApi = new RateApi();
const actions = {
  async [types.actions.GET_RATES] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await rateApi.get(data).then((res) => {
      commit(types.mutations.SET_RATES, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
      console.log(error);
    });
  },
  async [types.actions.SET_RATE] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await rateApi.getById(data.id).then((res) => {
      commit(types.mutations.SET_RATE, res.data);
    }).catch((error) => {
      console.log(error);
    });
  },
  [types.actions.SET_SHOW_MODAL_FORM] ({ commit, dispatch }, data) {
    commit(types.mutations.SET_SHOW_MODAL_FORM, data);
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
  },
  [types.actions.SET_TYPE_ACTION] ({ commit }, data) {
    commit(types.mutations.SET_TYPE_ACTION, data);
  },
  async [types.actions.SAVE] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await rateApi.save(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_RATES}`);
      commit(types.mutations.SET_TYPE_ACTION, '');
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.EDIT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await rateApi.edit(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_RATES}`);
      commit(types.mutations.SET_TYPE_ACTION, '');
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.DELETE] ({ commit, dispatch }, id) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await rateApi.delete(id).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_RATES}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
