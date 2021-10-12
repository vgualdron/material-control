// import endpoints from '@/api/tiquet/endpoints';
// import environmentConfig from '@/config/env.config';
// import AuthHeader from '@/helpers/common/AuthHelper';
// const env = process.env.NODE_ENV;
// const envConfig = environmentConfig[env];
import { getTiquet, getTiquets, insertTiquet, getNotSynchronizedTiquets, deleteTiquet, updateTiquet } from '@/helpers/synchronize';

// import AuthHeader from '@/helpers/common/AuthHelper';
export default class TiquetApi {
  async get (data) {
    return await getTiquets(data);
  }

  async getNotSynchronized () {
    return await getNotSynchronizedTiquets();
  }

  async getById (id) {
    return await getTiquet(id);
  }

  async save (data) {
    return await insertTiquet(data);
  }

  async delete (id) {
    return await deleteTiquet(id);
  }

  async edit (data) {
    return await updateTiquet(data);
  }
}
