export const STORE_YARD = 'yard';
export const typesYard = {
  PATH: `${STORE_YARD}`,
  getters: {
  },
  mutations: {
    SET_YARDS: '@mutations/setYards',
    SET_YARD: '@mutations/setYard',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_YARDS: '@actions/getYards',
    SET_YARD: '@actions/setYard',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
