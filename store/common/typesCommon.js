export const STORE_COMMON = 'common';
export const typesCommon = {
  PATH: `${STORE_COMMON}`,
  getters: {
    GET_ROUTER_ACTIVE: '@getters/getRouterActive'
  },
  mutations: {
    SET_ROUTER_ACTIVE: '@mutations/setRouterActive',
    SET_LOADER_STATUS: '@mutations/setLoaderStatus',
    SET_USER_PERMISIONS: '@mutations/setUserPermisions',
    SET_USER_PERMISIONS_GROUP: '@mutations/setUserPermisionsGroup',
    SET_PERMISSIONS_GROUP: '@mutations/setPermissionsGroup',
    SET_TOAST: '@mutations/setToast'
  },
  actions: {
    SET_ROUTER_ACTIVE: '@actions/setRouterActive',
    SET_LOADER_STATUS: '@actions/setLoaderStatus',
    SET_USER: '@actions/setUser',
    GET_USER: '@actions/getUser',
    GET_USER_PERMISIONS: '@actions/getUserPermisions',
    SET_USER_PERMISIONS: '@actions/setUserPermisions',
    GET_USER_PERMISIONS_GROUP: '@actions/getUserPermisionsGroup',
    SET_USER_PERMISIONS_GROUP: '@actions/setUserPermisionsGroup',
    GET_PERMISSIONS_GROUP: '@actions/getPermissionsGroup',
    SET_PERMISSIONS_GROUP: '@actions/setPermissionsGroup',
    SET_TOAST: '@actions/setToast'
  }
};

export default {};
