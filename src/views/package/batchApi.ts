import { defHttp } from '/src/utils/http/axios';

enum Api {
  ById = 'core/batchPackage/queryByProId',
  Delete = 'core/batchPackage/delete',
  Add = 'core/batchPackage/add',
  Update = 'core/batchPackage/edit',
  List = 'core/batchPackage/list',
}

export function getBatch(params: { proId: string }) {
  return defHttp.get({ url: Api.ById, params });
}

export function deleteBatch(params: { id: string }) {
  return defHttp.post({ url: Api.Delete, params });
}

export function getBatchList(params) {
  return defHttp.get({ url: Api.List, params });
}

export function addBatch(params) {
  return defHttp.post({ url: Api.Add, params });
}

export function updateBatch(params) {
  return defHttp.post({ url: Api.Update, params });
}
