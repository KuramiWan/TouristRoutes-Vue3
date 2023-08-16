<template>
  <div>
    <a-modal v-model:visible="visible" title="客服联系电话配置" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
      </template>
      <a-card>
        客服电话：<a-input v-model:value="value1" style="margin-bottom: 3px" placeholder="请填写产品客服电话"></a-input> 
      </a-card>
    </a-modal>
  </div>
</template>
  <script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { getPhonePro, editPhonePro } from './api';

let props = defineProps({ proId: String });
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);
const value1 = ref<String>();


const showModal = async () => {
  const res = await getPhonePro({ proId: props.proId });
  if (res == null) {
    return;
  }
  value1.value = res.phone;
  visible.value = true;
};

const handleOk = async () => {
  let data = {
    proId: props.proId,
    phone: value1.value,
  };
  loading.value = true;
  await editPhonePro(data);
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