import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '伴游人真实名称',
    align:"center",
    dataIndex: 'escortName'
   },
   {
    title: '伴游人昵称',
    align:"center",
    dataIndex: 'escortNickname'
   },
   {
    title: '伴游人年龄',
    align:"center",
    dataIndex: 'escortAge'
   },
   {
    title: '伴游人性别',
    align:"center",
    dataIndex: 'escortGender_dictText'
   },
   {
    title: '伴游人手机号',
    align:"center",
    dataIndex: 'escortPhoneNumber'
   },
   {
    title: '伴游人邮箱',
    align:"center",
    dataIndex: 'escortEmail'
   },
   {
    title: '伴游人国籍',
    align:"center",
    dataIndex: 'escortNationality'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '伴游人真实名称',
    field: 'escortName',
    component: 'Input',
  },
  {
    label: '伴游人昵称',
    field: 'escortNickname',
    component: 'Input',
  },
  {
    label: '伴游人年龄',
    field: 'escortAge',
    component: 'InputNumber',
  },
  {
    label: '伴游人性别',
    field: 'escortGender',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"gender"
     },
  },
  {
    label: '伴游人手机号',
    field: 'escortPhoneNumber',
    component: 'Input',
  },
  {
    label: '伴游人邮箱',
    field: 'escortEmail',
    component: 'Input',
  },
  {
    label: '伴游人国籍',
    field: 'escortNationality',
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