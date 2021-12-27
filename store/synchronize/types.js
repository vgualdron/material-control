export const STORE_SYNCHRONIZE = 'synchronize';
export const typesSynchronize = {
  PATH: `${STORE_SYNCHRONIZE}`,
  getters: {
  },
  mutations: {
    SET_DATA_FROM_SERVER: '@actions/setDataFromServer',
    SET_STATUS: '@actions/setStatus'
  },
  actions: {
    GET_DATA_FROM_SERVER: '@actions/getDataFromServer',
    SET_DATA_TO_SERVER: '@actions/setDataToServer',
    SET_DATA_TO_LOCALE: '@actions/setDataToLocale'
  }
};

export default {};
