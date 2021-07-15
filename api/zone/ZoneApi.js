import axios from 'axios';
import endpoints from '@/api/zone/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class ZoneApi {
  async get () {
    return await axios.get(`${envConfig.urlApi}/${endpoints.primary}`, { headers: AuthHeader() });
  }

  async getById (id) {
    return await axios.get(`${envConfig.urlApi}/${endpoints.primary}/${id}`, { headers: AuthHeader() });
  }

  async save (data) {
    return await axios.post(`${envConfig.urlApi}/${endpoints.primary}`, data, { headers: AuthHeader() });
  }

  async delete (id) {
    return await axios.delete(`${envConfig.urlApi}/${endpoints.primary}/${id}`, { headers: AuthHeader() });
  }

  async edit (data) {
    return await axios.put(`${envConfig.urlApi}/${endpoints.primary}/${data.id}`, data, { headers: AuthHeader() });
  }
}
