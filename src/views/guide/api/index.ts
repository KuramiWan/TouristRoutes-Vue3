import { defHttp } from '/@/utils/http/axios';
// import { message } from 'ant-design-vue';

enum Api {
  guideList = '/guide/touristGuide/listAll',
}

/**
 * 根据id查询产品日程和任务
 * @param params
 */
export const getGuideList = (params) => {
  return defHttp.get({ url: Api.guideList, params });
};

/**
 * 根据日程id编辑产品日程
 * @param data
 */
export const editScheduleById = (data) => {
  return defHttp.post({ url: Api.editSchedule, data });
};

/**
 * 编辑or新增日程和任务
 * @param data
 */
export const andOrEditScheduleAndTask = (data) => {
  return defHttp.post({ url: Api.andOrEdit, data });
};

/**
 * 根据id删除某个任务
 * @param data
 */
export const deleteTask = (data) => {
  return defHttp.delete({ url: Api.deleteTaskById, data });
};

/**
 * 通过日程id删除日程和相关任务
 * @param data
 */
export const deleteScheduleAndTask = (data) => {
  return defHttp.delete({ url: Api.deleteScheduleAndTask, data });
};

/**
 * 通过产品id添加日程
 * @param data
 */
export const addScheduleByProId = (data) => {
  return defHttp.post({ url: Api.addScheduleByProId, data });
};

/**
 * 上传图片返回url
 * @param data
 */
export const uploadTaskImg = (data) => {
  return defHttp.post({ url: Api.uploadTaskImg, data });
};
