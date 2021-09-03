export const STORE_ROLE = 'role';
export const typesRole = {
  PATH: `${STORE_ROLE}`,
  getters: {
  },
  mutations: {
    SET_ROLES: '@mutations/setRoles',
    SET_ROLE: '@mutations/setRole',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_ROLES: '@actions/getRoles',
    SET_ROLE: '@actions/setRole',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
