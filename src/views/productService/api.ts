import { defHttp } from '/@/utils/http/axios';

enum Api {
    getPhone = '/productService/productService/queryByProId',
    editPhone = '/productService/productService/update'
  }

  export const getPhonePro = (params) => defHttp.get({ url: Api.getPhone, params });

  export const editPhonePro = (data) => defHttp.post({ url: Api.editPhone, data });