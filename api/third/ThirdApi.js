import axios from 'axios';
import endpoints from '@/api/third/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
import { getThirds } from '@/helpers/synchronize';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class ThirdApi {
  async getByType (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primary}/${data.type}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getLocale (data) {
    return await getThirds(data);
  }
}
