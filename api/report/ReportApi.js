import axios from 'axios';
import endpoints from '@/api/report/endpoints';
import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
const env = process.env.NODE_ENV;
const envConfig = environmentConfig[env];
export default class ZoneApi {
  async getMovementsReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryMR}/${encodeURIComponent(data?.movement ? data.movement : ' ')}/${data.start_date}/${data.final_date}/${data?.origin_yard_supplier ?? 0}/${data?.destiny_yard_customer ?? 0}/${data?.material ?? 0}`,
      {
        headers: AuthHeader()
      }
    );
  };

  async getYardStcokReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryYSR}/${data.date}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getCompleteTransfersReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryCTR}/${data.start_date}/${data.final_date}/${data?.origin_yard ?? 0}/${data?.destiny_yard ?? 0}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getUncompleteTransfersReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryUTR}/${data.start_date}/${data.final_date}/${data?.origin_yard ?? 0}/${data?.destiny_yard ?? 0}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getUnbilledPurchasesReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryUPR}/${data.start_date}/${data.final_date}/${data?.supplier ?? 0}/${data?.material ?? 0}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getUnbilledSalesReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryUSR}/${data.start_date}/${data.final_date}/${data?.customer ?? 0}/${data?.material ?? 0}`,
      {
        headers: AuthHeader()
      }
    );
  }

  async getUnbilledFreightReport (data) {
    return await axios.get(
      `${envConfig.urlApi}/${endpoints.primaryUFR}/${data.start_date}/${data.final_date}/${data?.conveyor_company ?? 0}/${data?.material ?? 0}`,
      {
        headers: AuthHeader()
      }
    );
  }
}
