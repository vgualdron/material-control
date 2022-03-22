import { typesAuth as types } from '@/store/auth/types';
export default function auth ({ store, redirect, route }) {
  console.log(route.path);
  if (route.path !== '/login' && route.path !== '/login/' && !store.getters[types.PATH + '/' + types.getters.IS_LOGGED_IN]) {
    return redirect('/login');
  }
};
