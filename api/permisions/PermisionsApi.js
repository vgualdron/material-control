import axios from 'axios';
import endpoints from '@/api/permisions/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class PermisionsApi {
  async getPermisionsBySesion () {
    return await axios.post(envConfig.urlApi + endpoints.listBySesion, null, { headers: AuthHeader() });
  }
}
