import { getThirds } from '@/helpers/synchronize';
export default class ThirdApi {
  async getLocale (data) {
    return await getThirds(data);
  }
}
