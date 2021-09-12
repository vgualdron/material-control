export default function AuthHeader () {
  const user = JSON.parse(localStorage.getItem('token'));
  if (user && user.access_token) {
    return { Authorization: user.token_type + ' ' + user.access_token };
  } else {
    return {};
  }
}
