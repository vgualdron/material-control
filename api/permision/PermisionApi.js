import axios from 'axios';
import endpoints from '@/api/permision/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class PermisionApi {
  async getPermisionsBySesion () {
    return await axios.get(`${envConfig.urlApi}/${endpoints.listBySesion}`, { headers: AuthHeader() });
  }

  async getPermisionsBySesionGroup () {
    return await axios.get(`${envConfig.urlApi}/${endpoints.listBySesionGroup}`, { headers: AuthHeader() });
  }

  async getPermissionsGroup () {
    return await axios.get(`${envConfig.urlApi}/${endpoints.listByGroup}`, { headers: AuthHeader() });
  }
}
