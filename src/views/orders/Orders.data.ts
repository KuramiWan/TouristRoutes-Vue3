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
    dataIndex: 'orderStatus_dictText'
   },
   {
    title: '订单金额',
    align:"center",
    dataIndex: 'orderMoney'
   },
   {
    title: '支付方式',
    align:"center",
    dataIndex: 'payMethod_dictText'
   },
   {
    title: '支付状态',
    align:"center",
    dataIndex: 'payStatus_dictText'
   },
   {
    title: '支付时间',
    align:"center",
    dataIndex: 'payDate'
   },
   {
    title: '支付金额',
    align:"center",
    dataIndex: 'payMoney'
   },
   {
    title: '订单备注',
    align:"center",
    dataIndex: 'note'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "产品id",
      field: 'productId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "客户id",
      field: 'userId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "订单状态",
      field: 'orderStatus',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"order_status"
      },
      colProps: {span: 6},
 	},
	{
      label: "订单金额",
      field: 'orderMoney',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "支付方式",
      field: 'payMethod',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"pay_method"
      },
      colProps: {span: 6},
 	},
	{
      label: "支付状态",
      field: 'payStatus',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"pay_status"
      },
      colProps: {span: 6},
 	},
	{
      label: "支付时间",
      field: 'payDate',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
	{
      label: "支付金额",
      field: 'payMoney',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "订单备注",
      field: 'note',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "创建日期",
      field: 'createTime',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
	{
      label: "更新日期",
      field: 'updateTime',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
	{
      label: "创建人",
      field: 'createBy',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "更新人",
      field: 'updateBy',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "所属部门",
      field: 'sysOrgCode',
      component: 'Input',
      colProps: {span: 6},
 	},
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
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"order_status"
     },
  },
  {
    label: '订单金额',
    field: 'orderMoney',
    component: 'InputNumber',
  },
  {
    label: '支付方式',
    field: 'payMethod',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"pay_method"
     },
  },
  {
    label: '支付状态',
    field: 'payStatus',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"pay_status"
     },
  },
  {
    label: '支付时间',
    field: 'payDate',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '支付金额',
    field: 'payMoney',
    component: 'InputNumber',
  },
  {
    label: '订单备注',
    field: 'note',
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