import axios from 'axios';
import endpoints from '@/api/material/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
import { getMaterials } from '@/helpers/synchronize';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class MaterialApi {
  async get (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primary}/${data?.perPage ?? 10}/${data?.page ?? 1}/${encodeURIComponent(data?.text ? data.text : ' ')}`,
      {
        headers: AuthHeader()
      }
    );
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

  async getLocale (data) {
    return await getMaterials(data);
  }
}
