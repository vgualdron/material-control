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
    SET_ACTIVE_TOKEN: '@mutations/setActiveToken'
  },
  actions: {
    GET_ACTIVE_TOKEN: '@actions/getActiveToken',
    LOGIN: '@actions/login',
    SET_AUTHORIZATION_TOKEN: '@actions/setAuthorizationToken'
  }
};

export default {};
