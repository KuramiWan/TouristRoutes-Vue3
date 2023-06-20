<template>
  <!-- 时间线对话框 -->
  <div>
    <!-- <a-button type="primary" @click="showModal">详情</a-button> -->
    <a-modal v-model:visible="visible" title="产品详情" @ok="handleOk">
      <a-card>
        <a-timeline mode="alternate" reverse="true">
          <a-timeline-item>Create a services site 2015-09-02</a-timeline-item>
          <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
          <a-timeline-item>
            <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </a-timeline-item>
          <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
          <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
          <a-timeline-item>
            <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
            Technical testing 2015-09-01
          </a-timeline-item>
        </a-timeline>
      </a-card>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import 'ant-design-vue/dist/antd.css';
  import { ClockCircleOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    components: {
      ClockCircleOutlined,
    },
    setup() {
      const visible = ref<boolean>(false);

      const showModal = () => {
        visible.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };
      return {
        visible,
        showModal,
        handleOk,
      };
    },
  });
</script>
