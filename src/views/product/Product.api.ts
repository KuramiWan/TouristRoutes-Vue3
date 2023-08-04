import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
    getProductList = '/core/product/productList',
    saveOrUpdate = '/core/product/saveOrUpdate',
    deleteOne = '/core/product/delete'
}

/**
 * 产品列表接口
 * @param params
 */
export const getProductList = (params) =>
    defHttp.get({ url: Api.getProductList, params });

/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params) => {
    return defHttp.post({ url: Api.saveOrUpdate, params });
}


/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
    return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
    });
}