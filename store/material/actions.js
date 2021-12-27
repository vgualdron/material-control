import MaterialApi from '@/api/material/MaterialApi';
import { typesCommon } from '@/store/common/typesCommon';
import { typesMaterial as types } from './types';
const materialApi = new MaterialApi();
const actions = {
  async [types.actions.GET_MATERIALS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await materialApi.get(data).then((res) => {
      commit(types.mutations.SET_MATERIALS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderStateClose ?? false), { root: true });
    }).catch((error) => {
      console.log(error);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderStateClose ?? false), { root: true });
    });
  },
  async [types.actions.SET_MATERIAL] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await materialApi.getById(data.id).then((res) => {
      commit(types.mutations.SET_MATERIAL, res.data);
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
    await materialApi.save(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_MATERIALS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.EDIT] ({ commit, dispatch }, data) {
    console.log(data);
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await materialApi.edit(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_MATERIALS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.DELETE] ({ commit, dispatch }, id) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await materialApi.delete(id).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_MATERIALS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_LOCALE_MATERIALS] ({ commit, dispatch }, data) {
    await materialApi.getLocale(data).then((res) => {
      commit(types.mutations.SET_LOCALE_MATERIALS, res);
    }).catch((error) => {
      console.log(error);
    });
  }
};
export default actions;
