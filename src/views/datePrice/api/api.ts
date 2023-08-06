import { defHttp } from '/@/utils/http/axios';

enum Api {
  DatePrice = '/priceDate/priceDate/queryByProId',
  DeletePrice = '/priceDate/priceDate/delete',
  AddDatePrice = '/priceDate/priceDate/add',
  updatePriceAndDate = '/priceDate/priceDate/updatePriceAndDate',
}

export function getDatePrice(params: { proId: string }) {
  return defHttp.get({ url: Api.DatePrice, params });
}

export function deleteDatePrice(params: { id: string }) {
  return defHttp.delete({ url: Api.DeletePrice, params });
}

export function addDatePrice(params) {
  return defHttp.post({ url: Api.AddDatePrice, params });
}

export function updateDatePrice(params) {
  return defHttp.post({ url: Api.updatePriceAndDate, params });
}
