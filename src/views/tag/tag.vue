<template>
  <div>
    <a-modal v-model:visible="visible" title="Title" @ok="handleOk" maskClosable="false">
      <template #footer>
        <a-button key="cancel" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
      </template>

      <a-card>
        标签：
        <a-select v-model:value="value" mode="tags" style="width: 100%" placeholder="请输入标签" @change="handleChange" allowClear> </a-select>
      </a-card>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getTag,editTagPro } from './api';


let props = defineProps({ proId: String });
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);

let options = [];
let value = ref([]);

const showModal = async () => {
  value.value = [];
  const res = await getTag({ productId: props.proId });
  res.forEach((i) => {
    value.value.push(i.tagContent);
  });
  visible.value = true;
};

const handleOk = async() => {
    let data = {
      proId: props.proId,
      value: value.value,
    };
  loading.value = true;
  await editTagPro(data);
//   setTimeout(() => {
    loading.value = false;
    visible.value = false;
//   }, 100);
  console.log(value.value)
};

const handleCancel = () => {
  visible.value = false;
};

const handleChange = (Value: string) => {
  console.log(`selected ${Value}`);
//   value.value.push(value)
    value.value = Value
// console.log(Value[lastOne])
};

// 主动暴露showModal方法，让父组件调用
defineExpose({ showModal });
</script>