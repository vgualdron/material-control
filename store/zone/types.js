export const STORE_ZONE = 'zone';
export const typesZone = {
  PATH: `${STORE_ZONE}`,
  getters: {
  },
  mutations: {
    SET_ZONES: '@mutations/setZones',
    SET_ZONE: '@mutations/setZone',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_ZONES: '@actions/getZones',
    SET_ZONE: '@actions/setZone',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
