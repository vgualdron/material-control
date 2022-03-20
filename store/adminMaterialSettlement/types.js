export const STORE_ADMIN_MATERIAL_SETTLEMENT = 'adminMaterialSettlement';
export const typesAdminMaterialSettlement = {
  PATH: `${STORE_ADMIN_MATERIAL_SETTLEMENT}`,
  getters: {
  },
  mutations: {
    SET_ADMIN_MATERIAL_SETTLEMENTS: '@mutations/setAdminMaterialSettlements',
    SET_ADMIN_MATERIAL_SETTLEMENT: '@mutations/setAdminMaterialSettlement',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_ADMIN_MATERIAL_SETTLEMENTS: '@actions/getAdminMaterialSettlements',
    SET_ADMIN_MATERIAL_SETTLEMENT: '@actions/setAdminMaterialSettlement',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    PRINT: '@actions/print',
    EDIT: '@actions/edit'
  }
};

export default {};
