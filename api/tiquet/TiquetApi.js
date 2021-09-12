// import endpoints from '@/api/tiquet/endpoints';
// import environmentConfig from '@/config/env.config';
// import AuthHeader from '@/helpers/common/AuthHelper';
// const env = process.env.NODE_ENV;
// const envConfig = environmentConfig[env];
import { getTiquets } from '@/helpers/synchronize';

// import AuthHeader from '@/helpers/common/AuthHelper';
export default class TiquetApi {
  async get (data) {
    return await getTiquets(data);
  }

  /* async */ getById (id) {
    return {};
  }

  /* async */ save (data) {
    return {};
  }

  /* async */ delete (id) {
    return {};
  }

  /* async */ edit (data) {
    return {};
  }
}
