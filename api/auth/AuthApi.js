import axios from 'axios';
import endpoints from '@/api/auth/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class AuthApi {
  async getActiveToken () {
    return await axios.get(`${envConfig.urlApi}/${endpoints.getTokenActive}`);
  }

  async login (data) {
    const body = {
      grant_type: 'password',
      client_id: 2,
      client_secret: data.activeToken,
      password: data.password,
      username: data.username
    };
    return await axios.post(`${envConfig.urlApi}/${endpoints.login}`, body);
  }

  async get () {
    return await axios.get(`${envConfig.urlApi}/${endpoints.primary}`, { headers: AuthHeader() });
  }
}
