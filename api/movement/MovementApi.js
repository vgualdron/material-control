import axios from 'axios';
import endpoints from '@/api/movement/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class MovementApi {
  async get (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primary}/${data.startDate}/${data.finalDate}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async generate (data) {
    return await axios.post(`${envConfig.urlApi}/${endpoints.primary}`, data, { headers: AuthHeader() });
  }
}
