export const STORE_MATERIAL_SETTLEMENT = 'materialSettlement';
export const typesMaterialSettlement = {
  PATH: `${STORE_MATERIAL_SETTLEMENT}`,
  getters: {
  },
  mutations: {
    SET_MATERIAL_SETTLEMENTS: '@mutations/setMaterialSettlements',
    SET_MATERIAL_SETTLEMENT: '@mutations/setMaterialSettlement',
    SET_TYPE_ACTION: '@mutations/setTypeAction'
  },
  actions: {
    GET_MATERIAL_SETTLEMENTS: '@actions/getMaterialSettlement',
    SET_MATERIAL_SETTLEMENTS: '@acstions/setMaterialSettlements',
    PRINT: '@actions/print',
    SAVE: '@actions/save'
  }
};

export default {};
