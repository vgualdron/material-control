import YardApi from '@/api/yard/YardApi';
import { typesCommon } from '@/store/common/typesCommon';
import { typesYard as types } from './types';
const yardApi = new YardApi();
const actions = {
  async [types.actions.GET_YARDS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await yardApi.get(data).then((res) => {
      commit(types.mutations.SET_YARDS, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      console.log(error);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.SET_YARD] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await yardApi.getById(data.id).then((res) => {
      commit(types.mutations.SET_YARD, res.data);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch((error) => {
      console.log(error);
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
    await yardApi.save(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_YARDS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.EDIT] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await yardApi.edit(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_YARDS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.DELETE] ({ commit, dispatch }, id) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await yardApi.delete(id).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_YARDS}`);
      commit(types.mutations.SET_SHOW_MODAL_FORM, false);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
    }).finally((e) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GET_LOCALE_ORIGIN_YARDS] ({ commit, dispatch }, data) {
    await yardApi.getLocale(data).then((res) => {
      commit(types.mutations.SET_LOCALE_ORIGIN_YARDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_LOCALE_DESTINY_YARDS] ({ commit, dispatch }, data) {
    await yardApi.getLocale(data).then((res) => {
      commit(types.mutations.SET_LOCALE_DESTINY_YARDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_ORIGIN_YARDS] ({ commit }, data) {
    await yardApi.get(data).then((res) => {
      console.log(res);
      commit(types.mutations.SET_LOCALE_ORIGIN_YARDS, res.data);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_DESTINY_YARDS] ({ commit }, data) {
    await yardApi.get(data).then((res) => {
      commit(types.mutations.SET_LOCALE_DESTINY_YARDS, res.data);
    }).catch((error) => {
      console.log(error);
    });
  }
};
export default actions;
