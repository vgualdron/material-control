export const STORE_AUTH = 'auth';
export const typesAuth = {
  PATH: `${STORE_AUTH}`,
  getters: {
    GET_ACTIVE_TOKEN: '@getters/getActiveToken',
    GET_AUTHORIZATION_TOKEN: '@getters/getAuthorizationToken',
    IS_LOGGED_IN: '@getters/isLoggedIn'
  },
  mutations: {
    SET_AUTHORIZATION_TOKEN: '@mutations/setAuthorizationToken',
    SET_ACTIVE_TOKEN: '@mutations/setActiveToken',
    SET_DATA_SESSION: '@mutations/setDataSession'
  },
  actions: {
    GET_ACTIVE_TOKEN: '@actions/getActiveToken',
    LOGIN: '@actions/login',
    LOGOUT: '@actions/logout',
    SET_AUTHORIZATION_TOKEN: '@actions/setAuthorizationToken',
    GET_DATA_SESSION: '@getters/getDataSession'
  }
};

export default {};
