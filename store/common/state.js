const state = {
  routerActive: '/',
  loaderStatus: false,
  showProfile: false,
  userPermisions: localStorage.getItem('userPermisions') ? JSON.parse(localStorage.getItem('userPermisions')) : [],
  userPermisionsGroup: localStorage.getItem('userPermisionsGroup') ? JSON.parse(localStorage.getItem('userPermisionsGroup')) : [],
  permissionsGroup: [],
  toast: {
    title: 'Title',
    content: 'Content',
    variant: 'default',
    solid: true,
    status: false
  }
};
export default state;
