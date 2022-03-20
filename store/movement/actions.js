import { typesCommon } from '@/store/common/typesCommon';
import { typesMovement as types } from './types';
import MovementApi from '~/api/movement/MovementApi';
const movementApi = new MovementApi();
const actions = {
  async [types.actions.GET_MOVEMENTS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, (data?.loaderState ?? true), { root: true });
    await movementApi.get(data).then((res) => {
      commit(types.mutations.SET_MOVEMENTS, res);
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    }).catch(() => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  },
  async [types.actions.GENERATE_MOVEMENTS] ({ commit, dispatch }, data) {
    dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, true, { root: true });
    await movementApi.generate(data).then((resp) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, resp, { root: true });
      dispatch(`${types.actions.GET_MOVEMENTS}`);
      const res = { data: [] };
      commit(types.mutations.SET_MOVEMENTS, res);
    }).catch((error) => {
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_TOAST}`, error.response, { root: true });
      dispatch(`${typesCommon.PATH}/${typesCommon.actions.SET_LOADER_STATUS}`, false, { root: true });
    });
  }
};
export default actions;
