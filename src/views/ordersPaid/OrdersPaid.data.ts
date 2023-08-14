import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
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
   {
    title: '微信支付订单号',
    align:"center",
    dataIndex: 'transactionId'
   },
   {
    title: '用户id',
    align:"center",
    dataIndex: 'userId'
   },
   {
    title: '产品id',
    align:"center",
    dataIndex: 'productId'
   },
   {
    title: '出发日期',
    align:"center",
    dataIndex: 'dateStarted',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '结束日期',
    align:"center",
    dataIndex: 'dateClosed',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '行程套餐id',
    align:"center",
    dataIndex: 'journeypackageId'
   },
   {
    title: '选择导游id',
    align:"center",
    dataIndex: 'batchpackageId'
   },
   {
    title: '联系人姓名',
    align:"center",
    dataIndex: 'contactName'
   },
   {
    title: '联系人手机号',
    align:"center",
    dataIndex: 'contactPhone'
   },
   {
    title: '出行人id(数组)',
    align:"center",
    dataIndex: 'travellerId'
   },
   {
    title: '成人个数',
    align:"center",
    dataIndex: 'adultCount'
   },
   {
    title: '儿童个数',
    align:"center",
    dataIndex: 'childrenCount'
   },
   {
    title: '实付金额',
    align:"center",
    dataIndex: 'paidMoney'
   },
   {
    title: '付款方式',
    align:"center",
    dataIndex: 'paidMethod'
   },
   {
    title: '优惠卷抵扣金额',
    align:"center",
    dataIndex: 'coupon'
   },
   {
    title: '保险id',
    align:"center",
    dataIndex: 'insureId'
   },
   {
    title: '订单备注',
    align:"center",
    dataIndex: 'note'
   },
   {
    title: '订单状态',
    align:"center",
    dataIndex: 'status'
   },
   {
    title: '是否申请退款',
    align:"center",
    dataIndex: 'toRefund'
   },
   {
    title: '是否退款',
    align:"center",
    dataIndex: 'isRefund'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
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
	{
      label: "微信支付订单号",
      field: 'transactionId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "用户id",
      field: 'userId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "产品id",
      field: 'productId',
      component: 'Input',
      colProps: {span: 6},
 	},
     {
      label: "出发日期",
      field: "dateStarted",
      component: 'RangePicker',
      componentProps: {
          valueType: 'Date',
      },
      colProps: {span: 6},
	},
     {
      label: "结束日期",
      field: "dateClosed",
      component: 'RangePicker',
      componentProps: {
          valueType: 'Date',
      },
      colProps: {span: 6},
	},
	{
      label: "行程套餐id",
      field: 'journeypackageId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "选择导游id",
      field: 'batchpackageId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "联系人姓名",
      field: 'contactName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "联系人手机号",
      field: 'contactPhone',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "成人个数",
      field: 'adultCount',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "儿童个数",
      field: 'childrenCount',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "实付金额",
      field: 'paidMoney',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "付款方式",
      field: 'paidMethod',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "保险id",
      field: 'insureId',
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
      label: "订单状态",
      field: 'status',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "是否申请退款",
      field: 'toRefund',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "是否退款",
      field: 'isRefund',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
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
  {
    label: '微信支付订单号',
    field: 'transactionId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '用户id',
    field: 'userId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '产品id',
    field: 'productId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '出发日期',
    field: 'dateStarted',
    component: 'DatePicker',
    dynamicDisabled:true
  },
  {
    label: '结束日期',
    field: 'dateClosed',
    component: 'DatePicker',
    dynamicDisabled:true
  },
  {
    label: '行程套餐id',
    field: 'journeypackageId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '选择导游id',
    field: 'batchpackageId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '联系人姓名',
    field: 'contactName',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '联系人手机号',
    field: 'contactPhone',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '出行人id(数组)',
    field: 'travellerId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '成人个数',
    field: 'adultCount',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '儿童个数',
    field: 'childrenCount',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '实付金额',
    field: 'paidMoney',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '付款方式',
    field: 'paidMethod',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '优惠卷抵扣金额',
    field: 'coupon',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '保险id',
    field: 'insureId',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '订单备注',
    field: 'note',
    component: 'InputTextArea',
    dynamicDisabled:true
  },
  {
    label: '订单状态',
    field: 'status',
    component: 'InputNumber',
  },
  {
    label: '是否申请退款',
    field: 'toRefund',
    component: 'InputNumber',
  },
  {
    label: '是否退款',
    field: 'isRefund',
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