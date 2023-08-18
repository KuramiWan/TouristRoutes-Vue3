import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  OrdersAllList = '/orders/ordersUnpaid/listAllUnPaidDetails',
  Search = '/orders/ordersUnpaid/searchByUnpaidOrdersId',
}

/**
 * 查询订单所有信息
 * @param params
 */
export const getOrdersAllList = (params) => {
  return defHttp.get({ url: Api.OrdersAllList, params });
};

/**
 * 未付款订单搜索
 * @param params
 */
export const getSearch = (params) => {
  return defHttp.get({ url: Api.Search, params });
};
