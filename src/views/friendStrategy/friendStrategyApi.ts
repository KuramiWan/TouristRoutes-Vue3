import { defHttp } from '/@/utils/http/axios';

enum Api {
  Strategy = 'strategy/friendStrategy/queryById',
  DeleteStrategy = 'strategy/friendStrategy/delete',
  AddStrategy = 'strategy/friendStrategy/add',
  updateStrategy = 'strategy/friendStrategy/edit',
  List = 'strategy/friendStrategy/list',
}

export function getFriendStrategy(params: { proId: string }) {
  return defHttp.get({ url: Api.Strategy, params });
}

export function deleteFriendStrategy(params: { id: string }) {
  return defHttp.delete({ url: Api.DeleteStrategy, params });
}

export function getFriendStrategyList(params) {
  return defHttp.get({ url: Api.List, params });
}

export function addFriendStrategy(params) {
  return defHttp.post({ url: Api.AddStrategy, params });
}

export function updateFriendStrategy(params) {
  return defHttp.post({ url: Api.updateStrategy, params });
}
