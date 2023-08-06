import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  guideList = '/guide/touristGuide/listAll',
  guideListByName = '/guide/touristGuide/listByName',
  uploadGuideImg = '/guide/touristGuide/uploadGuideImg',
  addGuide = '/guide/touristGuide/addOrEdit',
  deleteGuideById = '/guide/touristGuide/delete',
}

/**
 * 查询导游信息
 * @param params
 */
export const getGuideList = (params) => {
  return defHttp.get({ url: Api.guideList, params });
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
