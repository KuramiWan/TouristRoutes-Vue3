import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
    getProductList = '/core/product/productList'
}

/**
 * 产品列表接口
 * @param params
 */
export const list = (params) =>
    defHttp.get({ url: Api.getProductList, params });