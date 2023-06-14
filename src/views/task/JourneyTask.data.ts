import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '标题',
    align:"center",
    dataIndex: 'title'
   },
   {
    title: '行为',
    align:"center",
    dataIndex: 'action'
   },
   {
    title: '副标题',
    align:"center",
    dataIndex: 'subtitle'
   },
   {
    title: '时间',
    align:"center",
    dataIndex: 'time'
   },
   {
    title: '旅游日程id',
    align:"center",
    dataIndex: 'journeyDayId'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '行为',
    field: 'action',
    component: 'Input',
  },
  {
    label: '副标题',
    field: 'subtitle',
    component: 'Input',
  },
  {
    label: '时间',
    field: 'time',
    component: 'Input',
  },
  {
    label: '旅游日程id',
    field: 'journeyDayId',
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