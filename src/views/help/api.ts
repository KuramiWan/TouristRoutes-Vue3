import { defHttp } from '/@/utils/http/axios';

enum Api {
    PageList = '/help/help/listPage',
    SaveList = '/help/help/updateHelps',
    DeleHelp = '/help/help/delete',
    AddHelp = '/help/help/add'
}

export function getPageList(params) {
    return defHttp.get({ url: Api.PageList ,params});
}

export function SavePageList(params) {
    return defHttp.post({ url: Api.SaveList,params });
}

export function DeleHelpById(params) {
    return defHttp.delete({ url: Api.DeleHelp,params},{ joinParamsToUrl: true });
}

export function AddHelpOne(params) {
    return defHttp.post({ url: Api.AddHelp,params});
}