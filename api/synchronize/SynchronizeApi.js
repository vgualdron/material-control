import axios from 'axios';
/* import endpoints from '@/api/synchronize/endpoints'; */
// import environmentConfig from '@/config/env.config';
import AuthHeader from '@/helpers/common/AuthHelper';
// const env = process.env.NODE_ENV;
// const envConfig = environmentConfig[env];
export default class SynchronizeApi {
  async getDataFromServer (data) {
    return await axios.get(
      /* `${envConfig.urlApi}/${endpoints.fromServer}`, */
      'http://localhost:8080/synchronize/fromServer',
      {
        headers: AuthHeader()
      }
    );
  }

  async getYards (text){
    return await 111;
  }
}
