import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '旅行社名称',
    align:"center",
    dataIndex: 'agencyName'
   },
   {
    title: '旅行社联系人',
    align:"center",
    dataIndex: 'agencyContactName'
   },
   {
    title: '联系人电话',
    align:"center",
    dataIndex: 'contactPhone'
   },
   {
    title: '旅行社邮箱',
    align:"center",
    dataIndex: 'agencyEmail'
   },
   {
    title: '旅行社地址',
    align:"center",
    dataIndex: 'agencyAddress'
   },
   {
    title: '营业执照号码',
    align:"center",
    dataIndex: 'businessLicenseNumber'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '旅行社名称',
    field: 'agencyName',
    component: 'Input',
  },
  {
    label: '旅行社联系人',
    field: 'agencyContactName',
    component: 'Input',
  },
  {
    label: '联系人电话',
    field: 'contactPhone',
    component: 'Input',
  },
  {
    label: '旅行社邮箱',
    field: 'agencyEmail',
    component: 'Input',
  },
  {
    label: '旅行社地址',
    field: 'agencyAddress',
    component: 'Input',
  },
  {
    label: '营业执照号码',
    field: 'businessLicenseNumber',
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