import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '旅行社名称',
    align:"center",
    dataIndex: 'organization'
   },
   {
    title: '负责人',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '负责人电话',
    align:"center",
    dataIndex: 'phone'
   },
   {
    title: '旅行社地址',
    align:"center",
    dataIndex: 'address'
   },
   {
    title: '客服电话',
    align:"center",
    dataIndex: 'mobile'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '旅行社名称',
    field: 'organization',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入旅行社名称!'},
          ];
     },
  },
  {
    label: '负责人',
    field: 'name',
    component: 'Input',
  },
  {
    label: '负责人电话',
    field: 'phone',
    component: 'InputNumber',
  },
  {
    label: '旅行社地址',
    field: 'address',
    component: 'Input',
  },
  {
    label: '客服电话',
    field: 'mobile',
    component: 'InputNumber',
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