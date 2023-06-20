import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '酒店名称',
    align:"center",
    dataIndex: 'hotelName'
   },
   {
    title: '酒店地址',
    align:"center",
    dataIndex: 'hotelAddress'
   },
   {
    title: '酒店电话',
    align:"center",
    dataIndex: 'hotelPhone'
   },
   {
    title: '酒店邮箱',
    align:"center",
    dataIndex: 'hotelEmail'
   },
   {
    title: '酒店星级',
    align:"center",
    dataIndex: 'hotelRating_dictText'
   },
   {
    title: '酒店描述',
    align:"center",
    dataIndex: 'hotelDescription',
    slots: { customRender: 'htmlSlot' },
   },
   {
    title: '酒店图片',
    align:"center",
    dataIndex: 'hotelImage',
    customRender:render.renderImage,
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '酒店名称',
    field: 'hotelName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入酒店名称!'},
          ];
     },
  },
  {
    label: '酒店地址',
    field: 'hotelAddress',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入酒店地址!'},
          ];
     },
  },
  {
    label: '酒店电话',
    field: 'hotelPhone',
    component: 'Input',
  },
  {
    label: '酒店邮箱',
    field: 'hotelEmail',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: false},
                 { pattern: /^([\w]+\.*)([\w]+)@[\w]+\.\w{3}(\.\w{2}|)$/, message: '请输入正确的电子邮件!'},
          ];
     },
  },
  {
    label: '酒店星级',
    field: 'hotelRating',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"hotel_rating"
     },
  },
  {
    label: '酒店描述',
    field: 'hotelDescription',
    component: 'JEditor',
  },
  {
    label: '酒店图片',
    field: 'hotelImage',
     component: 'JImageUpload',
     componentProps:{
      },
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