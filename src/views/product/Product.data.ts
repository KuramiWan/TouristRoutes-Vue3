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
    title: '描述',
    align:"center",
    dataIndex: 'productDec',
    slots: { customRender: 'htmlSlot' },
   },
   {
    title: '出发地',
    align:"center",
    dataIndex: 'departure',
    slots: { customRender: 'pcaSlot' },
   },
   {
    title: '标签',
    align:"center",
    dataIndex: 'tags'
   },
   {
    title: '海报',
    align:"center",
    dataIndex: 'img',
    customRender:render.renderImage,
   },
   {
    title: '行程标题',
    align:"center",
    dataIndex: 'journeyTitle'
   },
   {
    title: '行程描述',
    align:"center",
    dataIndex: 'journeyDesc',
    slots: { customRender: 'htmlSlot' },
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
    label: '描述',
    field: 'productDec',
    component: 'JEditor',
  },
  {
    label: '出发地',
    field: 'departure',
    component: 'JAreaLinkage',
  },
  {
    label: '标签',
    field: 'tags',
    component: 'Input',
  },
  {
    label: '海报',
    field: 'img',
     component: 'JImageUpload',
     componentProps:{
      },
  },
  {
    label: '行程标题',
    field: 'journeyTitle',
    component: 'Input',
  },
  {
    label: '行程描述',
    field: 'journeyDesc',
    component: 'JEditor',
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