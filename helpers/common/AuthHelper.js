export default function AuthHeader () {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access_token) {
    return { Authorization: user.token_type + ' ' + user.access_token };
  } else {
    return {};
  }
}
