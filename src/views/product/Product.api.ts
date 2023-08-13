import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  getProductList = '/core/product/productAllList',
  saveOrUpdate = '/core/product/temporarySaveOrUpdate',
  deleteOne = '/core/product/delete',
  uploadImg = '/core/product/temporaryUploadImg',
}

/**
 * 产品列表接口
 * @param params
 */
export const getProductList = (params) => defHttp.get({ url: Api.getProductList, params });

/**
 * 保存或者更新
 * @param data
 */
export const saveOrUpdate = (data) => {
  return defHttp.post({ url: Api.saveOrUpdate, data });
};

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

export const uploadImg = (data) => {
  return defHttp.post({ url: Api.uploadImg, data });
};
