import axios from 'axios';
import endpoints from '@/api/freightSettlement/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
import { printFreightSettlement } from '@/helpers/reports';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class FreightSettlementApi {
  async get (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primary}/${data.startDate}/${data.finalDate}/${data.conveyorCompany}`,
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
    await printFreightSettlement(data);
  }
}
