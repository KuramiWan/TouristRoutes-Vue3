import { defHttp } from '/@/utils/http/axios';

enum Api {
  PageList = '/strategy/officialStrategy/queryList',
  deleteOne = '/strategy/officialStrategy/delete',
  AddOne = '/strategy/officialStrategy/add',
  SaveList = '/strategy/officialStrategy/update',
  UploadOfficialImg = '/strategy/officialStrategy/uploadOfficialImg',
}

/**
 * 上传图片返回url
 * @param data
 */
export const uploadOfficialImg = (data) => {
  return defHttp.post({ url: Api.UploadOfficialImg, data });
};

export function getPageList(params) {
  return defHttp.get({ url: Api.PageList, params });
}

export function SavePageList(params) {
  return defHttp.post({ url: Api.SaveList, params });
}

export function DeleOff(params) {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true });
}

export function AddOff(params) {
  return defHttp.post({ url: Api.AddOne, params });
}
