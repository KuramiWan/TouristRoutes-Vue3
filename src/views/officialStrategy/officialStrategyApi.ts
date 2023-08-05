import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  Add = '/strategy/officialStrategy/add',
  Delete = '/strategy/officialStrategy/delete',
  Edit = '/strategy/officialStrategy/edit',
  List = '/strategy/officialStrategy/list',
  Detail = '/strategy/officialStrategy/getDetail',
  ById = '/strategy/officialStrategy/queryById',
}

/**
 * 根据id查询产品日程和任务
 * @param params
 */
export const getProductList = (params) => {
  return defHttp.get({ url: Api.Add, params });
};
