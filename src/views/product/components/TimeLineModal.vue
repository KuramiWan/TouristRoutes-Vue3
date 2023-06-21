<template>
  <!-- 时间线对话框 -->
  <div>
    <!-- <a-button type="primary" @click="showModal">详情</a-button> -->
    <a-modal v-model:visible="visible" title="产品详情" @ok="handleOk">
      <a-card v-for="(journeyDay, index) in timelineData.journeyDays" :key="journeyDay.id">
        <h3>Day:{{ index + 1 }}&nbsp;{{ journeyDay.title }}</h3>
        <!-- <h3>{{ journeyDay.date }} -- {{ journeyDay.title }}</h3> -->
        <a-card>
          <a-timeline mode="left">
            <template v-for="task in journeyDay.tasks" :key="task.id">
              <a-timeline-item color="red" style="color: rgb(237, 111, 111)">
                <template #dot>
                  <ClockCircleOutlined style="font-size: 16px" />
                </template>
                {{ task.time }}
              </a-timeline-item>
              <a-timeline-item color="#00CCFF" style="color: #00ccff">{{ task.title }}</a-timeline-item>
              <!-- <a-timeline-item color="#00CCFF" style="color: #00ccff">{{ task.subtitle }}</a-timeline-item> -->
              <a-timeline-item color="#00CCFF" style="font-weight: 500">
                <template #dot>
                  <SmileOutlined />
                </template>
                {{ task.action }}</a-timeline-item>
              <!-- <a-timeline-item>
              <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
            </a-timeline-item> -->
              <!-- <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
            <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item>
              <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
              Technical testing 2015-09-01
            </a-timeline-item> -->
            </template>
          </a-timeline>
        </a-card>
      </a-card>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import 'ant-design-vue/dist/antd.css';
  import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import { getProductListByIdApi } from '../Product.api';
  export default defineComponent({
    components: {
      ClockCircleOutlined,
      SmileOutlined,
    },
    setup() {
      // 定义时间轴数据的数据结构
      interface TasksData {
        title: string;
        subtitle: string;
        action: string;
        time: string;
      }
      interface JourneyDaysData {
        title: string;
        journeyDayDec: string;
        date: string;
        tasks: TasksData[];
      }
      interface TimeLineData {
        title: string;
        productDec: string;
        journeyDays: JourneyDaysData[];
      }
      const visible = ref < boolean > (false);
      const timelineData = ref < TimeLineData > ({
        title: '',
        productDec: '',
        journeyDays: [
          {
            title: '',
            journeyDayDec: '',
            date: '',
            tasks: [
              {
                title: '',
                subtitle: '',
                action: '',
                time: '',
              },
            ],
          },
        ],
      });

      // 发送网络请求获取每个产品的数据
      const getProductListById = (id: string) => {
        getProductListByIdApi(id)
          .then((res: any) => {
            timelineData.value = res.result;
            console.log(res.result);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      const showModal = (id: string) => {
        getProductListById(id);
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
        timelineData,
      };
    },
  });
</script>