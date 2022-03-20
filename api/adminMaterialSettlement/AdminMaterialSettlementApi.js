import axios from 'axios';
import endpoints from '@/api/adminMaterialSettlement/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
import { printMaterialSettlement } from '@/helpers/reports';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class AdminMaterialSettlementApi {
  async get (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primary}/${data?.perPage ?? 10}/${data?.page ?? 1}/${encodeURIComponent(data?.text ? data.text : ' ')}/${encodeURIComponent(data?.zone ? data.zone : 0)}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getById (id) {
    return await axios.get(`${envConfig.urlApi}/${endpoints.primary}/${id}`, { headers: AuthHeader() });
  }

  async edit (data) {
    console.log(data);
    return await axios.put(`${envConfig.urlApi}/${endpoints.primary}/${data.id}`, data, { headers: AuthHeader() });
  }

  async print (data) {
    await printMaterialSettlement(data);
  }
}
