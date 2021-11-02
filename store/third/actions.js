import ThirdApi from '@/api/third/ThirdApi';
import { typesThird as types } from './types';
const thirdApi = new ThirdApi();
const actions = {
  async [types.actions.GET_LOCALE_SUPPLIER_THIRDS] ({ commit, dispatch }, data) {
    await thirdApi.getLocale(data).then((res) => {
      commit(types.mutations.SET_LOCALE_SUPPLIER_THIRDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_LOCALE_CUSTOMER_THIRDS] ({ commit, dispatch }, data) {
    await thirdApi.getLocale(data).then((res) => {
      commit(types.mutations.SET_LOCALE_CUSTOMER_THIRDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_LOCALE_CONVEYOR_THIRDS] ({ commit, dispatch }, data) {
    await thirdApi.getLocale(data).then((res) => {
      commit(types.mutations.SET_LOCALE_CONVEYOR_THIRDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_SUPPLIER_THIRDS] ({ commit }, data) {
    await thirdApi.getByType(data).then((res) => {
      commit(types.mutations.SET_LOCALE_SUPPLIER_THIRDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_CUSTOMER_THIRDS] ({ commit }, data) {
    await thirdApi.getByType(data).then((res) => {
      commit(types.mutations.SET_LOCALE_CUSTOMER_THIRDS, res);
    }).catch((error) => {
      console.log(error);
    });
  },
  async [types.actions.GET_CONVEYOR_THIRDS] ({ commit }, data) {
    await thirdApi.getByType(data).then((res) => {
      commit(types.mutations.SET_LOCALE_CONVEYOR_THIRDS, res);
    }).catch((error) => {
      console.log(error);
    });
  }
};
export default actions;
