import { typesCommon as types } from './typesCommon';
const getters = {
  [types.getters.GET_ROUTER_ACTIVE] (state) {
    return state.routerActive;
  }
};
export default getters;
