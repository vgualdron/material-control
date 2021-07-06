export const STORE_COMMON = 'common';
export const typesCommon = {
  PATH: `${STORE_COMMON}`,
  getters: {
    GET_ROUTER_ACTIVE: '@getters/getRouterActive'
  },
  mutations: {
    SET_ROUTER_ACTIVE: '@mutations/setRouterActive',
    SET_LOADER_STATUS: '@mutations/setLoaderStatus',
    SET_USER_PERMISIONS: '@mutations/setUserPermisions'
  },
  actions: {
    SET_ROUTER_ACTIVE: '@actions/setRouterActive',
    SET_LOADER_STATUS: '@actions/setLoaderStatus',
    SET_USER: '@actions/setUser',
    GET_USER: '@actions/getUser',
    GET_USER_PERMISIONS: '@actions/getUserPermisions',
    SET_USER_PERMISIONS: '@actions/setUserPermisions'
  }
};

export default {};
