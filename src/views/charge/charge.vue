<template>
  <div>
    <a-modal v-model:visible="visible" title="费用说明" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
      </template>
      <a-card>
        前提摘要：<a-textarea v-model:value="value1" style="margin-bottom: 3px" placeholder="请填写前提摘要"></a-textarea> 景点门票：<a-textarea
          v-model:value="value2"
          style="margin-bottom: 3px"
          placeholder="请填写景点门票"
        ></a-textarea>
        当地交通：<a-textarea v-model:value="value3" style="margin-bottom: 3px" placeholder="请填写当地交通"></a-textarea> 餐饮：<a-textarea
          v-model:value="value4"
          style="margin-bottom: 3px"
          placeholder="请填写餐饮"
        ></a-textarea>
        司导服务：<a-textarea v-model:value="value5" style="margin-bottom: 3px" placeholder="请填写司导服务"></a-textarea> 其它：<a-textarea
          v-model:value="value6"
          style="margin-bottom: 3px"
          placeholder="请填写前提其它"
        ></a-textarea>
      </a-card>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { getChargePro,editChargePro } from './api';

let props = defineProps({ proId: String });
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);
const value1 = ref<String>();
const value2 = ref<String>();
const value3 = ref<String>();
const value4 = ref<String>();
const value5 = ref<String>();
const value6 = ref<String>();

const showModal = async () => {
  const res = await getChargePro({ proId: props.proId });
  if (res == null) {
    return;
  }
  value1.value = res.cdDigest;
  value2.value = res.cdTicket;
  value3.value = res.cdTraffic;
  value4.value = res.cdFood;
  value5.value = res.cdGuide;
  value6.value = res.cdOther;
  visible.value = true;
};

const handleOk = async () => {
 
    let data = {
      proId: props.proId,
      cdDigest: value1.value,
      cdTicket: value2.value,
      cdTraffic: value3.value,
      cdFood: value4.value,
      cdGuide: value5.value,
      cdOther: value6.value,
    };
    loading.value = true;
    await editChargePro(data)
    console.log(data);
    loading.value = false;
    visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

// 主动暴露showModal方法，让父组件调用
defineExpose({ showModal });
</script>