export const STORE_SYNCHRONIZE = 'synchronize';
export const typesSynchronize = {
  PATH: `${STORE_SYNCHRONIZE}`,
  getters: {
  },
  mutations: {
  },
  actions: {
    GET_DATA_FROM_SERVER: '@actions/getDataFromServer',
    SET_DATA_TO_SERVER: '@actions/setDataToServer'
  }
};

export default {};
