<template>
  <div>
    <a-modal v-model:visible="visible" title="保险添加选择" @ok="handleOk" maskClosable="false">
      <template #footer>
        <a-button key="cancel" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
      </template>

      <a-card>
        保险：
        <a-select v-model:value="value" mode="tags" style="width: 100%" placeholder="请输入标签" @change="handleChange" allowClear> </a-select>
      </a-card>

      <a-card>
        保险价格:
        <br/>
        <text v-for="item in items" style="margin-top: 10px;">{{ item.content }} <a-input style="width: 50%"  type="number" v-model:value="item.price"/> <br/></text>  
      </a-card>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { GetInsureByProId } from './api';

let props = defineProps({ proId: String });
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);

let options = [];
let value = ref([]);
let items = ref([]);
let value2 = ref();

const showModal = async () => {
  console.log(props.proId);
  value.value = [];
  const res = await GetInsureByProId({ proId: props.proId });
  res.forEach((i) => {
    value.value.push(i.content);
    items.value.push(i)
  });
  console.log(items.value)
  visible.value = true;
};

const handleOk = async () => {
  let data = {
    proId: props.proId,
    value: value.value,
  };
  loading.value = true;
  // await editTagPro(data);
  //   setTimeout(() => {
  loading.value = false;
  visible.value = false;
  //   }, 100);
  console.log(value.value);
};

const handleCancel = () => {
  items = ref([]);
  visible.value = false;
  
};

const handleChange = (Value: string) => {
  console.log(`selected ${Value}`);
  //   value.value.push(value)
  value.value = Value;
  // console.log(Value[lastOne])
  value = ref([]);
  items = ref([]);
};

// 主动暴露showModal方法，让父组件调用
defineExpose({ showModal });
</script>