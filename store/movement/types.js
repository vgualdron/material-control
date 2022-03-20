export const STORE_MOVEMENT = 'movement';
export const typesMovement = {
  PATH: `${STORE_MOVEMENT}`,
  getters: {
  },
  mutations: {
    SET_MOVEMENTS: '@mutations/setMovements'
  },
  actions: {
    GET_MOVEMENTS: '@actions/getMovement',
    SET_MOVEMENTS: '@acstions/setMovements',
    GENERATE_MOVEMENTS: '@actions/generateMovements'
  }
};

export default {};
