import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '序号',
    align:"center",
    dataIndex: 'orderQueue'
   },
   {
    title: '日期',
    align:"center",
    dataIndex: 'date'
   },
   {
    title: '描述',
    align:"center",
    dataIndex: 'journeyDayDec'
   },
   {
    title: '标题',
    align:"center",
    dataIndex: 'title'
   },
   {
    title: '产品id',
    align:"center",
    dataIndex: 'productId'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '序号',
    field: 'orderQueue',
    component: 'Input',
  },
  {
    label: '日期',
    field: 'date',
    component: 'Input',
  },
  {
    label: '描述',
    field: 'journeyDayDec',
    component: 'Input',
  },
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '产品id',
    field: 'productId',
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