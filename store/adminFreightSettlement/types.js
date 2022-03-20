export const STORE_ADMIN_FREIGHT_SETTLEMENT = 'adminFreightSettlement';
export const typesAdminFreightSettlement = {
  PATH: `${STORE_ADMIN_FREIGHT_SETTLEMENT}`,
  getters: {
  },
  mutations: {
    SET_ADMIN_FREIGHT_SETTLEMENTS: '@mutations/setAdminFreightSettlements',
    SET_ADMIN_FREIGHT_SETTLEMENT: '@mutations/setAdminFreighSettlement',
    SET_SHOW_MODAL_FORM: '@mutations/setShowModalForm',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_ADMIN_FREIGHT_SETTLEMENTS: '@actions/getAdminFreightSettlements',
    SET_ADMIN_FREIGHT_SETTLEMENT: '@actions/setAdminFreightSettlement',
    SET_SHOW_MODAL_FORM: '@actions/setShowModalForm',
    SET_TYPE_ACTION: '@actions/setTypeAction',
    PRINT: '@actions/print',
    EDIT: '@actions/edit'
  }
};

export default {};
