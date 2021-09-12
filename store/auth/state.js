const state = {
  activeToken: null,
  authorizationToken: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {},
};
export default state;
