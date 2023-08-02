import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '导游名字',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '年龄',
    align:"center",
    dataIndex: 'age'
   },
   {
    title: '性别',
    align:"center",
    dataIndex: 'sex'
   },
   {
    title: '祖籍',
    align:"center",
    dataIndex: 'descent'
   },
   {
    title: '从业年限',
    align:"center",
    dataIndex: 'employmentTime'
   },
   {
    title: '擅长景点',
    align:"center",
    dataIndex: 'greatSpots'
   },
   {
    title: '个人介绍',
    align:"center",
    dataIndex: 'introduction'
   },
   {
    title: '从业资质',
    align:"center",
    dataIndex: 'qualifications'
   },
   {
    title: '导游头像',
    align:"center",
    dataIndex: 'avatar'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '导游名字',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入导游名字!'},
          ];
     },
  },
  {
    label: '年龄',
    field: 'age',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入年龄!'},
          ];
     },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入性别!'},
          ];
     },
  },
  {
    label: '祖籍',
    field: 'descent',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入祖籍!'},
          ];
     },
  },
  {
    label: '从业年限',
    field: 'employmentTime',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入从业年限!'},
          ];
     },
  },
  {
    label: '擅长景点',
    field: 'greatSpots',
    component: 'Input',
  },
  {
    label: '个人介绍',
    field: 'introduction',
    component: 'Input',
  },
  {
    label: '从业资质',
    field: 'qualifications',
    component: 'Input',
  },
  {
    label: '导游头像',
    field: 'avatar',
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