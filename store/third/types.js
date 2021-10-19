export const STORE_THIRD = 'third';
export const typesThird = {
  PATH: `${STORE_THIRD}`,
  getters: {
  },
  mutations: {
    SET_LOCALE_SUPPLIER_THIRDS: '@actions/setLocaleSupplierThirds',
    SET_LOCALE_CUSTOMER_THIRDS: '@actions/setLocaleCustomerThirds',
    SET_LOCALE_CONVEYOR_THIRDS: '@actions/setLocaleConveyorThirds'
  },
  actions: {
    GET_LOCALE_SUPPLIER_THIRDS: '@actions/getLocaleSupplierThirds',
    GET_LOCALE_CUSTOMER_THIRDS: '@actions/getLocaleCustomerThirds',
    GET_LOCALE_CONVEYOR_THIRDS: '@actions/getLocaleConveyorThirds',
    GET_SUPPLIER_THIRDS: '@actions/getSupplierThirds',
    GET_CUSTOMER_THIRDS: '@actions/getCustomerThirds',
    GET_CONVEYOR_THIRDS: '@actions/getConveyorThirds'
  }
};

export default {};
