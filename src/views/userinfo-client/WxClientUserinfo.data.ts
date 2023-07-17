import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '微信小程序用户唯一标识',
    align:"center",
    dataIndex: 'openid'
   },
   {
    title: '用户昵称',
    align:"center",
    dataIndex: 'username'
   },
   {
    title: '用户头像url',
    align:"center",
    dataIndex: 'avatar'
   },
   {
    title: '手机号',
    align:"center",
    dataIndex: 'phone'
   },
   {
    title: '会话密钥',
    align:"center",
    dataIndex: 'sessionKey'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '微信小程序用户唯一标识',
    field: 'openid',
    component: 'Input',
  },
  {
    label: '用户昵称',
    field: 'username',
    component: 'Input',
  },
  {
    label: '用户头像url',
    field: 'avatar',
    component: 'Input',
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '会话密钥',
    field: 'sessionKey',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}