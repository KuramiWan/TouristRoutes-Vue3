import { defHttp } from '/src/utils/http/axios';

enum Api {
  ById = 'core/journeyPackage/queryByProId',
  Delete = 'core/journeyPackage/delete',
  Add = 'core/journeyPackage/add',
  Update = 'core/journeyPackage/edit',
  List = 'core/journeyPackage/list',
}

export function getJourney(params: { proId: string }) {
  return defHttp.get({ url: Api.ById, params });
}

export function deleteJourney(params: { id: string }) {
  return defHttp.post({ url: Api.Delete, params });
}

export function getJourneyList(params) {
  return defHttp.get({ url: Api.List, params });
}

export function addJourney(params) {
  return defHttp.post({ url: Api.Add, params });
}

export function updateJourney(params) {
  return defHttp.post({ url: Api.Update, params });
}
