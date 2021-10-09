export const STORE_TIQUET = 'tiquet';
export const typesTiquet = {
  PATH: `${STORE_TIQUET}`,
  getters: {
  },
  mutations: {
    SET_TIQUETS: '@mutations/setTiquets',
    SET_NOT_SYNCHRONIZED_TIQUETS: '@mutations/setNotSynchronizedTiquets',
    SET_TIQUET: '@mutations/setTiquet',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_TIQUETS: '@actions/getTiquets',
    GET_NOT_SYNCHRONIZED_TIQUETS: '@actions/getNotSynchronizedTiquets',
    SET_TIQUET: '@actions/setTiquet',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
