import { defHttp } from '/@/utils/http/axios';

enum Api {
    PageList = '/strategy/officialStrategy/queryList',
    deleteOne = '/strategy/officialStrategy/delete',
    AddOne = '/strategy/officialStrategy/add',
    SaveList = 'strategy/officialStrategy/update'
}

export function getPageList(params) {
    return defHttp.get({ url: Api.PageList ,params});
}

export function SavePageList(params) {
    return defHttp.post({ url: Api.SaveList,params });
}

export function DeleOff(params) {
    return defHttp.delete({ url: Api.deleteOne,params},{ joinParamsToUrl: true });
}

export function AddOff(params) {
    return defHttp.post({ url: Api.AddOne,params});
}
