import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  listAllUnpaid = '/orders/ordersUnpaid/listAllUnpaid',
  guideListByName = '/guide/touristGuide/listByName',
  uploadGuideImg = '/guide/touristGuide/uploadGuideImg',
  addGuide = '/guide/touristGuide/addOrEdit',
  deleteGuideById = '/guide/touristGuide/delete',
  getGuideListByProId = '/productguide/productGuide/queryByProId',
  editProductGuide = '/productguide/productGuide/addOrEdit',
}

/**
 * 查询未付款订单所有信息
 * @param params
 */
export const listAllUnpaid = (params) => {
  return defHttp.get({ url: Api.listAllUnpaid, params });
};

/**
 * 通过产品id查询导游信息
 * @param params
 */
export const getGuideListByProId = (params) => {
  return defHttp.get({ url: Api.getGuideListByProId, params });
};

/**
 * 根据name查询导游信息
 * @param params
 */
export const guideListByName = (params) => {
  return defHttp.get({ url: Api.guideListByName, params });
};

/**
 * 新增/编辑导游
 * @param data
 */
export const addGuide = (data) => {
  return defHttp.post({ url: Api.addGuide, data });
};

/**
 * 根据id删除某个导游
 * @param data
 */
export const deleteGuideById = (data) => {
  return defHttp.delete({ url: Api.deleteGuideById, data }, { joinParamsToUrl: true });
};

/**
 * 上传图片返回url
 * @param data
 */
export const uploadGuideImg = (data) => {
  return defHttp.post({ url: Api.uploadGuideImg, data });
};

/**
 * 添加/编辑产品和导游的关系
 * @param data
 */
export const editProductGuide = (data) => {
  return defHttp.post({ url: Api.editProductGuide, data });
};
