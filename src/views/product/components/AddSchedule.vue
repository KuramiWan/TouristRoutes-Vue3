<template>
  <div>
    <a @click="showModalForm">{{ name }}</a>
    <a-modal v-model:visible="visible" :title="name" @ok="handleOk">
      <Form v-if="name === '添加日程'" :id="id" ref="FormComponent"></Form>
      <Task v-else :id="id" ref="TaskComponent"></Task>
    </a-modal>
  </div>
</template>
<script>
  import { ref, defineComponent, reactive, watch } from 'vue';
  import Form from './Form.vue';
  import Task from './Task.vue';

  export default defineComponent({
    props: ['name', 'id'],
    components: { Form, Task },
    setup(props, context) {
      const visible = ref(false);
      const FormComponent = ref(null);
      const TaskComponent = ref(null);

      const DemoComponent = ref(null);

      const showModalForm = () => {
        visible.value = true;
      };

      const handleOk = () => {
        if (props.name === '添加日程') {
          // 子组件数据传给数据库
          FormComponent.value.add();
        } else {
        }
        visible.value = false;
      };

      watch(visible, () => {
        if (!visible.value) {
          if (props.name === '添加日程') {
            // 清空子组件数据
            FormComponent.value.clear();
          } else {
          }
        }
      });

      return {
        showModalForm,
        visible,
        handleOk,
        FormComponent,
        TaskComponent,
      };
    },
  });
</script>
