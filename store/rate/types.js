export const STORE_RATE = 'rate';
export const typesRate = {
  PATH: `${STORE_RATE}`,
  getters: {
  },
  mutations: {
    SET_RATES: '@mutations/setRates',
    SET_RATE: '@mutations/setRate',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_RATES: '@actions/getRates',
    SET_RATE: '@actions/SetRate',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
