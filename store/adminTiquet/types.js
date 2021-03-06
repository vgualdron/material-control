export const STORE_ADMIN_TIQUET = 'adminTiquet';
export const typesAdminTiquet = {
  PATH: `${STORE_ADMIN_TIQUET}`,
  getters: {
  },
  mutations: {
    SET_TIQUETS: '@mutations/setTiquets',
    SET_TIQUET: '@mutations/setTiquet',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_TIQUETS: '@actions/getTiquets',
    SET_TIQUET: '@actions/setTiquet',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
