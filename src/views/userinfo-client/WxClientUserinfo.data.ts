import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '用户唯一标识',
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
    dataIndex: 'avatar',
    customRender:render.renderImage,
   },
   {
    title: '手机号',
    align:"center",
    dataIndex: 'phone'
   },
   {
    title: '个性签名',
    align:"center",
    dataIndex: 'signature'
   },
   {
    title: '个人积分',
    align:"center",
    dataIndex: 'credit'
   },
   {
    title: '创建日期',
    align:"center",
    sorter: true,
    dataIndex: 'createTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '更新日期',
    align:"center",
    sorter: true,
    dataIndex: 'updateTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "用户唯一标识",
      field: 'openid',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "用户昵称",
      field: 'username',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "手机号",
      field: 'phone',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "个性签名",
      field: 'signature',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "个人积分",
      field: 'credit',
      component: 'Input',
      colProps: {span: 6},
 	},
     {
      label: "创建日期",
      field: "createTime",
      component: 'RangePicker',
      componentProps: {
          valueType: 'Date',
      },
      colProps: {span: 6},
	},
     {
      label: "更新日期",
      field: "updateTime",
      component: 'RangePicker',
      componentProps: {
          valueType: 'Date',
      },
      colProps: {span: 6},
	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '用户唯一标识',
    field: 'openid',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '用户昵称',
    field: 'username',
    component: 'Input',
  },
  {
    label: '用户头像url',
    field: 'avatar',
     component: 'JImageUpload',
     componentProps:{
      },
    dynamicDisabled:true
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '个性签名',
    field: 'signature',
    component: 'Input',
  },
  {
    label: '个人积分',
    field: 'credit',
    component: 'InputNumber',
  },
  {
    label: '创建日期',
    field: 'createTime',
    component: 'DatePicker',
    dynamicDisabled:true
  },
  {
    label: '更新日期',
    field: 'updateTime',
    component: 'DatePicker',
    dynamicDisabled:true
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