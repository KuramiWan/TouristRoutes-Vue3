import { defHttp } from '/@/utils/http/axios';

enum Api {
    ContactInfo = '/contact/contact/queryById',
    SaveContact = '/contact/contact/edit'
}

export function getContact() {
    return defHttp.get({ url: Api.ContactInfo });
}

export function saveContact(data) {
    return defHttp.post({ url: Api.SaveContact ,data});
}