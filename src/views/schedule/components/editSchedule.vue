<template>
  <a-drawer
    title="编辑日程"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="日程标题" name="name">
            <a-input v-model:value="form.schTitle" placeholder="Please enter user name" />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="持续时间" name="name">
            <a-input v-model:value="form.name" placeholder="Please enter user name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="日程地点" name="url">
            <a-input v-model:value="form.url" style="width: 100%" placeholder="please enter url" />
          </a-form-item>
        </a-col>
      </a-row> -->
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  export default defineComponent({
    components: {},
    props: ['editScheduleVisible', 'schedule'],
    emits: ['changeVisible'],
    setup(props, ctx) {
      // const mySchedule = reactive({
      //   name: '',
      //   url: '',
      //   owner: '',
      //   type: '',
      //   approver: '',
      //   dateTime: null,
      //   description: '',
      // });

      const rules: Record<string, Rule[]> = {
        name: [{ required: true, message: 'Please enter user name' }],
        url: [{ required: true, message: 'please enter url' }],
        owner: [{ required: true, message: 'Please select an owner' }],
        type: [{ required: true, message: 'Please choose the type' }],
        approver: [{ required: true, message: 'Please choose the approver' }],
        dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
        description: [{ required: true, message: 'Please enter url description' }],
      };

      const visible = ref<boolean>(props.editScheduleVisible);
      console.log('visible', visible);
      const onClose = () => {
        visible.value = false;
        ctx.emit('changeVisible', visible.value);
      };

      const form = ref<any>(props.schedule);

      return {
        rules,
        visible,
        form,
        onClose,
      };
    },
    watch: {
      editScheduleVisible(newValue) {
        console.log('newValue', newValue);
        this.visible = newValue;
      },
      schedule(newValue) {
        console.log('newValue', newValue);
        this.form = newValue;
      },
    },
  });
</script>
