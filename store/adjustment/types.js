export const STORE_ADJUSTMENT = 'adjustment';
export const typesAdjustment = {
  PATH: `${STORE_ADJUSTMENT}`,
  getters: {
  },
  mutations: {
    SET_ADJUSTMENTS: '@mutations/setAdjustments',
    SET_ADJUSTMENT: '@mutations/setAdjustment',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_ADJUSTMENTS: '@actions/getAdjustments',
    SET_ADJUSTMENT: '@actions/setAdjustment',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
