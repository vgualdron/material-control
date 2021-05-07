export default function auth ({ store, redirect, route }) {
  // If the user is not authenticated
  if (route.path === '/' && !store.getters.loggedIn) {
    return redirect('/login');
  }
};
