<template>
  <div>
    <a-modal v-model:visible="visible" title="推荐导游" width="50%" @ok="handleOk" ok-text="确定">
      <a-card>
        选择导游：
        <a-select
          @change="changeSelected"
          v-model:value="selectedValue"
          mode="multiple"
          style="width: 90%"
          placeholder="请为该产品分配导游(支持搜索)"
          :options="options"
        />
      </a-card>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  import { ref, defineExpose, defineProps } from 'vue';
  import { getOrdersAllList } from '../api/index';
  let props = defineProps({ proId: String });
  console.log(props.proId);
  const visible = ref(false);
  const selectedValue = ref([]); // 选中的value：name
  const pushValue = ref([]); // 发送的数组
  const options = ref<SelectProps['options']>([]);

  const showModal = async () => {
    selectedValue.value = [];
    options.value = [];
    // 先查询该产品已经包含的导游
    const res = await getGuideListByProId({ productId: props.proId });
    res.forEach((i) => {
      selectedValue.value.push(i.name);
    });

    // 再查所有导游
    const guideList = await getGuideList({ pageSize: 9999999 });
    console.log('guideList', guideList);
    guideList.records.forEach((i) => {
      options.value.push({
        label: i.name,
        value: i.name,
        id: i.id,
      });
    });
    visible.value = true;
  };

  // change
  const changeSelected = (value, option) => {
    pushValue.value = [];
    option.forEach((v) => {
      pushValue.value.push(v.id);
    });
    console.log('pushValue.value', pushValue.value);
  };

  // 保存所选择的导游
  const handleOk = async () => {
    let data = {
      proId: props.proId,
      value: pushValue.value,
    };
    console.log('data', data);
    await editProductGuide(data);
    visible.value = false;
  };

  // 主动暴露showModal方法，让父组件调用
  defineExpose({ showModal });
</script>

<style scoped></style>
