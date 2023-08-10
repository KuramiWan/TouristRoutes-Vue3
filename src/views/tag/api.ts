import { defHttp } from '/@/utils/http/axios';

enum Api {
    TagPro = '/core/tag/queryByProId',
    editTag = '/core/tag/update',
  }

  export function getTag(params) {
    return defHttp.get({ url: Api.TagPro, params });
  }

  export function editTagPro(data) {
    return defHttp.post({ url: Api.editTag, data });
  }