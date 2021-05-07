import axios from 'axios'
import endpoints from '~/api/auth/endpoints'

export default class AuthApi {
  async login() {
    return await axios.get(endpoints.login)
  }
}
