import { request } from '/@/views/product/request';

enum Api {
  list = '/product/product/list',
  getById = '/product/product/queryById',
  save = '/product/product/add',
  edit = '/product/product/edit',
  deleteOne = '/product/product/delete',
  deleteBatch = '/product/product/deleteBatch',
  importExcel = '/product/product/importExcel',
  exportXls = '/product/product/exportXls',
}
export function getProductListApi(data: any) {
  return request({
    url: Api.list,
    method: 'GET',
    data,
  });
}

export function getProductByIdApi(data: any) {
  return request({
    url: Api.getById,
    method: 'GET',
    data,
  });
}
