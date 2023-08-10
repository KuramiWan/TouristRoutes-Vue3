import { defHttp } from '/@/utils/http/axios';

enum Api {
    getCharge = '/core/costDescription/queryByProId',
    editCharge = '/core/costDescription/update'
  }

  export const getChargePro = (params) => defHttp.get({ url: Api.getCharge, params });

  export const editChargePro = (data) => defHttp.post({ url: Api.editCharge, data });