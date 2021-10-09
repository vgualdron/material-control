const state = {
  activeToken: null,
  authorizationToken: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {},
  dataSession: localStorage.getItem('dataSession') ? JSON.parse(localStorage.getItem('dataSession')) : {}
};
export default state;
