export const STORE_USER = 'user';
export const typesUser = {
  PATH: `${STORE_USER}`,
  getters: {
  },
  mutations: {
    SET_USERS: '@mutations/setUsers',
    SET_USER: '@mutations/setUser',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_USERS: '@actions/getUsers',
    SET_USER: '@actions/setUser',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
