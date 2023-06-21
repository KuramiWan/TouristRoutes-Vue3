<template>
  <div>
    <a @click="showModal">{{ name }}</a>
    <a-modal v-model:visible="visible" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </a-modal>
  </div>
</template>
<script>
  import { ref, defineComponent } from 'vue';
  export default defineComponent({
    props: ['name'],
    setup() {
      const modalText = ref('Content of the modal');
      const visible = ref(false);
      const confirmLoading = ref(false);
      const showModal = () => {
        visible.value = true;
      };
      const handleOk = () => {
        modalText.value = 'The modal will be closed after two seconds';
        confirmLoading.value = true;
        setTimeout(() => {
          visible.value = false;
          confirmLoading.value = false;
        }, 2000);
      };
      return {
        modalText,
        visible,
        confirmLoading,
        showModal,
        handleOk,
      };
    },
  });
</script>
