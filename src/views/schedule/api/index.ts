import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  productList = '/core/product/queryById?',
  schedulesList = '/core/schedule/queryListByProId',
  tasksList = '/core/task/queryAllByProId',
}

/**
 * 根据id查询产品日程和任务
 * @param params
 */
export const getProductList = (params) => {
  return defHttp.get({ url: Api.productList, params });
};
