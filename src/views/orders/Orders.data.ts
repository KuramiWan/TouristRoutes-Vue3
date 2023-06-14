import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '产品id',
    align:"center",
    dataIndex: 'productId'
   },
   {
    title: '客户id',
    align:"center",
    dataIndex: 'userId'
   },
   {
    title: '订单状态',
    align:"center",
    dataIndex: 'orderStatus'
   },
   {
    title: '订单金额',
    align:"center",
    dataIndex: 'ordreMoney'
   },
   {
    title: '支付方式',
    align:"center",
    dataIndex: 'payMethod'
   },
   {
    title: '支付状态',
    align:"center",
    dataIndex: 'payStatus',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '支付时间',
    align:"center",
    dataIndex: 'payData',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '支付金额',
    align:"center",
    dataIndex: 'payMoney'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'note'
   },
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '更新时间',
    align:"center",
    dataIndex: 'updateDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '时间戳',
    align:"center",
    dataIndex: 'ts'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '产品id',
    field: 'productId',
    component: 'Input',
  },
  {
    label: '客户id',
    field: 'userId',
    component: 'Input',
  },
  {
    label: '订单状态',
    field: 'orderStatus',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入订单状态!'},
          ];
     },
  },
  {
    label: '订单金额',
    field: 'ordreMoney',
    component: 'InputNumber',
  },
  {
    label: '支付方式',
    field: 'payMethod',
    component: 'Input',
  },
  {
    label: '支付状态',
    field: 'payStatus',
    component: 'DatePicker',
  },
  {
    label: '支付时间',
    field: 'payData',
    component: 'DatePicker',
  },
  {
    label: '支付金额',
    field: 'payMoney',
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'note',
    component: 'InputTextArea',
  },
  {
    label: '创建时间',
    field: 'createDate',
    component: 'DatePicker',
  },
  {
    label: '更新时间',
    field: 'updateDate',
    component: 'DatePicker',
  },
  {
    label: '时间戳',
    field: 'ts',
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