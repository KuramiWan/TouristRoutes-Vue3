<template>
  <a-form :model="formDate" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <a-form-item label="Day1的任务" name="username">
      <a-input v-model:value="formDate.username" />
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, reactive, ref, defineExpose } from 'vue';
  import { getProductListByIdApi } from '../Product.api';
  export default defineComponent({
    props: ['id'],
    setup(props) {
      // console.log(props.id)
      const formDate = reactive({
        username: '',
      });

      let journeyDays = ref([]);
      const queryTask = () => {
        getProductListByIdApi(props.id).then((res) => {
          journeyDays.value = res.result.journeyDays;
          // 第一天的任务集合
          // console.log(journeyDays.value[0].tasks)
        });
        return journeyDays;
      };

      return {
        formDate,
        query,
      };
    },
  });
</script>
