import { defHttp } from '/@/utils/http/axios';

enum Api {
    GetInsure = '/Insure/insure/queryListByProId',
    DeleteInsure = '/Insure/insure/delete',
    AddInsure = '/Insure/insure/add',
    UpdateInsures = '/Insure/insure/updateInsureList'
  }

  export function GetInsureByProId(params) {
    return defHttp.get({ url: Api.GetInsure, params });
  }

  export function DeleteInsureById(params) {
    return defHttp.delete({ url: Api.DeleteInsure, params }, { joinParamsToUrl: true });
  }

  export function AddInsureOne(params) {
    return defHttp.post({ url: Api.AddInsure, params });
  }

  export function UpdateInsureList(params) {
    return defHttp.post({ url: Api.UpdateInsures, params });
  }