export const STORE_MATERIAL = 'material';
export const typesMaterial = {
  PATH: `${STORE_MATERIAL}`,
  getters: {
  },
  mutations: {
    SET_MATERIALS: '@mutations/setMaterials',
    SET_MATERIAL: '@mutations/setMaterial',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_MATERIALS: '@actions/getMaterials',
    SET_MATERIAL: '@actions/setMaterial',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    SAVE: '@actions/save',
    DELETE: '@actions/delete',
    EDIT: '@actions/edit'
  }
};

export default {};
