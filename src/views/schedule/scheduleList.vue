<template>
  <div>
    <a-button type="primary" @click="showModal">点击查看日程</a-button>
    <a-modal v-model:visible="visible" title="产品日程" width="100%" wrap-class-name="full-modal" @ok="handleOk">
      <div class="schedule-content">
        <template v-for="(schedule, index) in schedules" :key="schedule.id">
          <a-card style="width: 100%">
            <!-- 日程标题 -->
            <div class="schedule-content-head">
              <div
                ><span>第{{ index + 1 }}天</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{{ schedule.schTitle }}</span></div
              >
              <div
                ><a-button type="primary" style="margin-right: 10px"><div>编辑</div></a-button></div
              >
            </div>
            <!-- 任务卡片 -->
            <a-card style="width: 100%; margin-top: 14px">
              <!-- 展示第一个任务的时间线 -->
              <a-timeline v-if="!openIndex[index]">
                <a-timeline-item>
                  <template #dot>
                    <div style="display: flex; justify-content: center">
                      <img v-if="tasks[index].tasks[0].taskTitle == '交通'" class="schedule-icon" src="../../assets/images/交通.png" />
                      <img v-if="tasks[index].tasks[0].taskTitle == '酒店'" class="schedule-icon" src="../../assets/images/酒店.png" />
                      <img
                        v-if="
                          tasks[index].tasks[0].taskTitle == '早餐' ||
                          tasks[index].tasks[0].taskTitle == '午餐' ||
                          tasks[index].tasks[0].taskTitle == '晚餐'
                        "
                        class="schedule-icon"
                        src="../../assets/images/餐饮.png"
                      />
                      <img v-if="tasks[index].tasks[0].taskTitle == '景点/场馆'" class="schedule-icon" src="../../assets/images/景点.png" />
                      <img v-if="tasks[index].tasks[0].taskTitle == '自由活动'" class="schedule-icon" src="../../assets/images/自由活动.png" />
                    </div>
                    <div>{{ tasks[index].tasks[0].taskDate }}</div>
                  </template>
                  <div>
                    <div class="task-title">{{ tasks[index].tasks[0].taskTitle }}</div>
                    <div>{{ tasks[index].tasks[0].taskContent }}</div>
                    <div>
                      <a-image-preview-group>
                        <template v-if="tasks[index].tasks[0].taskImgs != null">
                          <div class="task-img-group">
                            <template v-for="(img, imgIndex) in tasks[index].tasks[0].taskImgs" :key="imgIndex">
                              <a-image :width="200" :src="img" />
                            </template>
                          </div>
                        </template>
                      </a-image-preview-group>
                    </div>
                  </div>
                </a-timeline-item>
              </a-timeline>
              <!-- 展示所有时间线 -->
              <a-timeline v-if="openIndex[index]">
                <template v-for="task in tasks[index].tasks" :key="task.id">
                  <a-timeline-item>
                    <template #dot>
                      <div style="display: flex; justify-content: center">
                        <img v-if="task.taskTitle == '交通'" class="schedule-icon" src="../../assets/images/交通.png" />
                        <img v-if="task.taskTitle == '酒店'" class="schedule-icon" src="../../assets/images/酒店.png" />
                        <img
                          v-if="task.taskTitle == '早餐' || task.taskTitle == '午餐' || task.taskTitle == '晚餐'"
                          class="schedule-icon"
                          src="../../assets/images/餐饮.png"
                        />
                        <img v-if="task.taskTitle == '景点/场馆'" class="schedule-icon" src="../../assets/images/景点.png" />
                        <img v-if="task.taskTitle == '自由活动'" class="schedule-icon" src="../../assets/images/自由活动.png" />
                      </div>
                      <div>{{ task.taskDate }}</div>
                    </template>
                    <div>
                      <div class="task-title">{{ task.taskTitle }}</div>
                      <div>{{ task.taskContent }}</div>
                      <div>
                        <a-image-preview-group>
                          <template v-if="task.taskImgs != null">
                            <div class="task-img-group">
                              <template v-for="(img, imgIndex) in task.taskImgs" :key="imgIndex">
                                <a-image :width="200" :src="img" />
                              </template>
                            </div>
                          </template>
                        </a-image-preview-group>
                      </div>
                    </div>
                  </a-timeline-item>
                </template>
              </a-timeline>
              <!-- 是否展开 -->
              <div style="display: flex; justify-content: center; align-content: center">
                <a-button @click="fold(index)"
                  >展开
                  <template v-if="!openIndex[index]">
                    <down-outlined />
                  </template>
                  <template v-if="openIndex[index]">
                    <up-outlined />
                  </template>
                </a-button>
              </div>
            </a-card>
          </a-card>
        </template>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  import { getSchedulesList, getTaskstList } from './api/index';
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    components: {
      DownOutlined,
      UpOutlined,
    },
    setup() {
      const openIndex = ref<any>([]);
      const visible = ref<boolean>(false);
      const schedules = ref<any>([]);
      const tasks = ref<any>([]);

      const showModal = () => {
        openIndex.value = [];
        let params = {
          productId: '1680280351362117633',
          proId: '1680280351362117633',
        };
        getSchedulesList(params).then((res) => {
          console.log('getSchedulestList===', res);
          for (let i = 0; i < res.length; i++) {
            openIndex.value.push(false);
          }
          schedules.value = res;

          getTaskstList(params).then((res) => {
            console.log('getTaskstList===', res);
            tasks.value = res;

            console.log('openIndex===', openIndex.value);

            visible.value = true;
          });
        });
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };

      // 是否展开
      const fold = (index: number) => {
        openIndex.value[index] = !openIndex.value[index];
      };

      return {
        visible,
        showModal,
        handleOk,
        schedules,
        tasks,
        openIndex,
        fold,
      };
    },
  });
</script>
<style lang="less">
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }
  }

  .ant-timeline-item-head-custom {
    top: 13.5px;
  }

  .schedule-content {
    width: 100%;
    height: 85vh;
    padding: 10px;
    overflow-y: scroll;

    .schedule-content-head {
      display: flex;
      justify-content: space-between;
      align-content: center;

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .schedule-icon {
      width: 20px;
      height: 20px;
      border-radius: 100px;
    }
  }

  .task-title {
    font-size: 16px;
    font-weight: bold;
  }

  .task-img-group {
    margin-top: 10px;
  }
</style>
