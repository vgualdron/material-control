export const STORE_FREIGHT_SETTLEMENT = 'freightSettlement';
export const typesFreightSettlement = {
  PATH: `${STORE_FREIGHT_SETTLEMENT}`,
  getters: {
  },
  mutations: {
    SET_FREIGHT_SETTLEMENTS: '@mutations/setFreightSettlements',
    SET_FREIGHT_SETTLEMENT: '@mutations/setFreightSettlement',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_FREIGHT_SETTLEMENTS: '@actions/getFreightSettlement',
    SET_FREIGHT_SETTLEMENTS: '@actions/setFreightSettlements',
    PRINT: '@actions/print',
    SAVE: '@actions/save'
  }
};

export default {};
