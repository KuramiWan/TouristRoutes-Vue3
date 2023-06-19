import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '真实名称',
    align: "center",
    dataIndex: 'touristName'
  },
  {
    title: '昵称',
    align: "center",
    dataIndex: 'touristNickname'
  },
  {
    title: '年龄',
    align: "center",
    dataIndex: 'touristAge'
  },
  {
    title: '性别',
    align: "center",
    dataIndex: 'touristGender_dictText'
  },
  {
    title: '手机号',
    align: "center",
    dataIndex: 'touristPhoneNumber'
  },
  {
    title: '邮箱',
    align: "center",
    dataIndex: 'touristEmail'
  },
  {
    title: '国籍',
    align: "center",
    dataIndex: 'touristNationality'
  },
  {
    title: '偏好',
    align: "center",
    dataIndex: 'touristPreference'
  },
  {
    title: '健康状态',
    align: "center",
    dataIndex: 'touristHealthCondition'
  },
  {
    title: '平台内货币',
    align: "center",
    dataIndex: 'utouristPlatformCurrency'
  },
  {
    title: '紧急联系人手机号',
    align: "center",
    dataIndex: 'touristEmergencyContact'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "游客真实名称",
    field: 'touristName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: "游客昵称",
    field: 'touristNickname',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: "游客年龄",
    field: 'touristAge',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: "游客性别",
    field: 'touristGender',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "gender"
    },
    colProps: { span: 6 },
  },
  {
    label: "游客手机号",
    field: 'touristPhoneNumber',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: "游客国籍",
    field: 'touristNationality',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '真实名称',
    field: 'touristName',
    component: 'Input',
  },
  {
    label: '昵称',
    field: 'touristNickname',
    component: 'Input',
  },
  {
    label: '年龄',
    field: 'touristAge',
    component: 'InputNumber',
  },
  {
    label: '性别',
    field: 'touristGender',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "gender"
    },
  },
  {
    label: '手机号',
    field: 'touristPhoneNumber',
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'touristEmail',
    component: 'Input',
  },
  {
    label: '国籍',
    field: 'touristNationality',
    component: 'Input',
  },
  {
    label: '偏好',
    field: 'touristPreference',
    component: 'Input',
  },
  {
    label: '健康状态',
    field: 'touristHealthCondition',
    component: 'Input',
  },
  {
    label: '平台内货币',
    field: 'utouristPlatformCurrency',
    component: 'InputNumber',
  },
  {
    label: '紧急联系人手机号',
    field: 'touristEmergencyContact',
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
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}