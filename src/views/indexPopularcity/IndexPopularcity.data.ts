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
    title: '小标题',
    align:"center",
    dataIndex: 'littleTitle'
   },
   {
    title: '图片',
    align:"center",
    dataIndex: 'img',
    customRender:render.renderImage,
   },
   {
    title: '地点',
    align:"center",
    dataIndex: 'address'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "标题",
      field: 'title',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "小标题",
      field: 'littleTitle',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "地点",
      field: 'address',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '小标题',
    field: 'littleTitle',
    component: 'Input',
  },
  {
    label: '图片',
    field: 'img',
     component: 'JImageUpload',
     componentProps:{
      },
  },
  {
    label: '地点',
    field: 'address',
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