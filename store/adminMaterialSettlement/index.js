import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { STORE_ADMIN_MATERIAL_SETTLEMENT } from './types';

Vue.use(Vuex);

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export const name = STORE_ADMIN_MATERIAL_SETTLEMENT;
