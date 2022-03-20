import axios from 'axios';
import endpoints from '@/api/materialSettlement/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
import { printMaterialSettlement } from '@/helpers/reports';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class MaterialSettlementApi {
  async get (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primary}/${data.type}/${data.startDate}/${data.finalDate}/${data.third}/${data?.material ? data.material : 0}/${data?.material_type ? data.material_type : 'T'}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async save (data) {
    return await axios.post(`${envConfig.urlApi}/${endpoints.primary}`, data, { headers: AuthHeader() });
  }

  async getById (id) {
    return await axios.get(`${envConfig.urlApi}/${endpoints.primary}/${id}`, { headers: AuthHeader() });
  }

  async print (data) {
    await printMaterialSettlement(data);
  }
}
