import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  OrdersAllList = '/orders/ordersUnpaid/listAllPaidDetails',
  toConfirmOrders = '/orders/ordersUnpaid/toConfirmOrders',
  toCancelConfirmed = '/orders/ordersUnpaid/toCancelConfirmed',
  Search = '/orders/ordersUnpaid/searchByPaidOrdersId',
}

/**
 * 查询订单所有信息
 * @param params
 */
export const getOrdersAllList = (params) => {
  return defHttp.get({ url: Api.OrdersAllList, params });
};

/**
 * 审核待确认订单
 * @param params
 */
export const confirmOrders = (params) => {
  return defHttp.get({ url: Api.toConfirmOrders, params });
};

/**
 * 取消审核订单
 * @param params
 */
export const cancelConfirmed = (params) => {
  return defHttp.get({ url: Api.toCancelConfirmed, params });
};

/**
 * 已付款订单搜索
 * @param params
 */
export const getSearch = (params) => {
  return defHttp.get({ url: Api.Search, params });
};
