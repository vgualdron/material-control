import { typesAuth as types } from './types';
const getters = {
  [types.getters.GET_ACTIVE_TOKEN] (state) {
    return state.activeToken;
  },
  [types.getters.GET_AUTHORIZATION_TOKEN] (state) {
    return state.authorizationToken;
  },
  [types.getters.IS_LOGGED_IN] (state) {
    return state.authorizationToken !== null && state.authorizationToken !== undefined && state.authorizationToken.access_token;
  }
};
export default getters;
