import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '游客真实名称',
    align:"center",
    dataIndex: 'touristName'
   },
   {
    title: '游客昵称',
    align:"center",
    dataIndex: 'touristNickname'
   },
   {
    title: '游客年龄',
    align:"center",
    dataIndex: 'touristAge'
   },
   {
    title: '游客性别',
    align:"center",
    dataIndex: 'touristGender'
   },
   {
    title: '游客手机号',
    align:"center",
    dataIndex: 'touristPhoneNumber'
   },
   {
    title: '游客邮箱',
    align:"center",
    dataIndex: 'touristEmail'
   },
   {
    title: '游客国籍',
    align:"center",
    dataIndex: 'touristNationality'
   },
   {
    title: '游客偏好',
    align:"center",
    dataIndex: 'touristPreference'
   },
   {
    title: '游客健康状态',
    align:"center",
    dataIndex: 'touristHealthCondition'
   },
   {
    title: '游客平台内货币',
    align:"center",
    dataIndex: 'utouristPlatformCurrency'
   },
   {
    title: '游客的紧急联系人的手机号码',
    align:"center",
    dataIndex: 'touristEmergencyContact'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '游客真实名称',
    field: 'touristName',
    component: 'Input',
  },
  {
    label: '游客昵称',
    field: 'touristNickname',
    component: 'Input',
  },
  {
    label: '游客年龄',
    field: 'touristAge',
    component: 'InputNumber',
  },
  {
    label: '游客性别',
    field: 'touristGender',
    component: 'Input',
  },
  {
    label: '游客手机号',
    field: 'touristPhoneNumber',
    component: 'Input',
  },
  {
    label: '游客邮箱',
    field: 'touristEmail',
    component: 'Input',
  },
  {
    label: '游客国籍',
    field: 'touristNationality',
    component: 'Input',
  },
  {
    label: '游客偏好',
    field: 'touristPreference',
    component: 'Input',
  },
  {
    label: '游客健康状态',
    field: 'touristHealthCondition',
    component: 'Input',
  },
  {
    label: '游客平台内货币',
    field: 'utouristPlatformCurrency',
    component: 'InputNumber',
  },
  {
    label: '游客的紧急联系人的手机号码',
    field: 'touristEmergencyContact',
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