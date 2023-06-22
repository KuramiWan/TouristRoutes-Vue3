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

      let journeyDays = reactive([]);
      const query = () => {
        getProductListByIdApi(props.id).then((res) => {
          journeyDays = res.result.journeyDays;
          console.log(journeyDays);
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
