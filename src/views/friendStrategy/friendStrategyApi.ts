import { defHttp } from '/@/utils/http/axios';

enum Api {
  DatePrice = 'strategy/friendStrategy/queryById',
  DeletePrice = 'strategy/friendStrategy/delete',
  AddDatePrice = 'strategy/friendStrategy/add',
  updatePriceAndDate = 'strategy/friendStrategy/edit',
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
