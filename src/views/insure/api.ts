import { defHttp } from '/@/utils/http/axios';

enum Api {
    GetInsure = '/Insure/insure/queryListByProId',
  }

  export function GetInsureByProId(params) {
    return defHttp.get({ url: Api.GetInsure, params });
  }