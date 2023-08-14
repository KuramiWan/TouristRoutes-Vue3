<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">点击查看日程</a-button> -->
    <a-modal v-model:visible="visible" title="产品日程" width="100%" wrap-class-name="full-modal" @ok="handleOk" ok-text="确定">
      <div class="schedule-content">
        <template v-if="schedules.length !== 0">
          <template v-for="(schedule, index) in schedules" :key="schedule.id">
            <a-card style="width: 100%">
              <a-card-grid style="width: 100%">
                <!-- 日程标题 -->
                <div class="schedule-content-head">
                  <div
                    ><span>第{{ index + 1 }}天</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{{ schedule.schTitle }}</span></div
                  >
                  <div>
                    <a-button type="primary" style="margin-right: 10px" @click="showEditSchedule(schedule)"><div>编辑</div></a-button>
                    <a-popconfirm
                      title="你确定要删除吗?"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="confirmScheduleDelete(index)"
                      @cancel="cancelScheduleDelete"
                    >
                      <a-button type="danger" style="margin-right: 10px"><div>删除</div></a-button>
                    </a-popconfirm>
                  </div>
                </div>
                <!-- 任务卡片 -->
                <a-card style="width: 100%; margin-top: 14px; padding: 20px">
                  <template v-if="schedule.tasks.length !== 0">
                    <!-- 展示第一个任务的时间线 -->
                    <a-timeline v-if="!openIndex[index]">
                      <a-timeline-item>
                        <template #dot>
                          <div style="display: flex; justify-content: center">
                            <img v-if="schedule.tasks[0].taskTitle == '交通'" class="schedule-icon" src="../../assets/images/交通.png" />
                            <img v-if="schedule.tasks[0].taskTitle == '酒店'" class="schedule-icon" src="../../assets/images/酒店.png" />
                            <img
                              v-if="
                                schedule.tasks[0].taskTitle == '早餐' ||
                                schedule.tasks[0].taskTitle == '午餐' ||
                                schedule.tasks[0].taskTitle == '晚餐'
                              "
                              class="schedule-icon"
                              src="../../assets/images/餐饮.png"
                            />
                            <img v-if="schedule.tasks[0].taskTitle == '景點/場館'" class="schedule-icon" src="../../assets/images/景点.png" />
                            <img v-if="schedule.tasks[0].taskTitle == '自由活動'" class="schedule-icon" src="../../assets/images/自由活动.png" />
                          </div>
                          <div>{{ schedule.tasks[0].taskDate }}</div>
                        </template>
                        <div>
                          <div class="task-title">{{ schedule.tasks[0].taskTitle }}</div>
                          <div>{{ schedule.tasks[0].taskContent }}</div>
                          <div>
                            <a-image-preview-group>
                              <template v-if="schedule.tasks[0].taskImgs != null">
                                <div class="task-img-group">
                                  <template v-for="(img, imgIndex) in schedule.tasks[0].taskImgs" :key="imgIndex">
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
                      <template v-for="task in schedule.tasks" :key="task.id">
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
                              <img v-if="task.taskTitle == '景點/場館'" class="schedule-icon" src="../../assets/images/景点.png" />
                              <img v-if="task.taskTitle == '自由活動'" class="schedule-icon" src="../../assets/images/自由活动.png" />
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
                  </template>
                </a-card>
              </a-card-grid>
            </a-card>
          </template>
        </template>
        <!-- 无数据的时候展示的 -->
        <template v-else>
          <a-card style="width: 100%">
            <a-empty :image="simpleImage">
              <template #description>
                <span style="color: #bfbfbf"> 暂无数据，请先添加 </span>
              </template>
            </a-empty>
          </a-card>
        </template>
        <div class="add-schedule">
          <a-button type="primary" @click="addSchedule"> <plus-outlined />添加日程 </a-button>
        </div>
      </div>
      <EditSchedule ref="editSchedule" :editScheduleVisible="editScheduleVisible" :schedule="mySchedule" @changeVisible="changeVisible" />
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { DownOutlined, UpOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { getProductList, deleteScheduleAndTask, addScheduleByProId } from './api/index';
  import { defineComponent, ref } from 'vue';

  import EditSchedule from './components/editSchedule.vue';
  export default defineComponent({
    components: {
      DownOutlined,
      UpOutlined,
      EditSchedule,
      PlusOutlined,
    },
    props: ['proId'],
    setup(props, ctx) {
      const openIndex = ref<any>([]);
      const visible = ref<boolean>(false);
      const editScheduleVisible = ref<boolean>(false);
      const productInfo = ref<any>();
      const schedules = ref<any>([]);
      const mySchedule = ref<any>();
      const tasks = ref<any>([]);
      const proId = ref<any>(props.proId);

      const showModal = () => {
        openIndex.value = [];
        let params = {
          id: proId.value,
        };
        console.log('proId', params);
        getProductList(params).then((res) => {
          console.log('res===', res);
          for (let i = 0; i < res.schedules.length; i++) {
            openIndex.value.push(false);
          }
          productInfo.value = res;
          schedules.value = res.schedules;
          visible.value = true;
        });
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };

      const confirmScheduleDelete = async (index) => {
        console.log('delete schedule ===', schedules.value[index]);
        await deleteScheduleAndTask(schedules.value[index]);
        // 从schedules数组中移除
        schedules.value.splice(index, 1);
      };

      const cancelScheduleDelete = (e: MouseEvent) => {
        console.log(e);
      };

      const tempSchedule = ref<any>();
      const editSchedule = ref();

      // 展示编辑日程的模态框
      const showEditSchedule = (schedule) => {
        let params = {
          id: proId.value,
        };
        console.log('proId', params);
        getProductList(params).then((res) => {
          console.log('res===', res);
          for (let i = 0; i < res.schedules.length; i++) {
            openIndex.value.push(false);
          }
          productInfo.value = res;
          schedules.value = res.schedules;

          tempSchedule.value = schedule.value;
          schedule.value = tempSchedule.value;
          mySchedule.value = schedule;
          visible.value = true;
          editScheduleVisible.value = true;

          console.log('editSchedule.value.form', editSchedule.value.form);
          console.log('editScheduleVisible.value', editScheduleVisible.value);
          console.log('schedule.value', mySchedule.value.id);
        });
      };

      const changeVisible = (value, form) => {
        // mySchedule.value = [];
        let params = {
          id: proId.value,
        };
        console.log('proId', params);
        getProductList(params).then((res) => {
          console.log('res===', res);
          for (let i = 0; i < res.schedules.length; i++) {
            openIndex.value.push(false);
          }
          productInfo.value = res;
          schedules.value = res.schedules;
          visible.value = true;

          // tempSchedule.value = schedule.value;
          // schedule.value = tempSchedule.value;
          mySchedule.value = form;
          editScheduleVisible.value = value;
        });
      };

      // 是否展开
      const fold = (index: number) => {
        openIndex.value[index] = !openIndex.value[index];
      };

      const addSchedule = async () => {
        let data = {
          proId: productInfo.value.id,
        };
        const res = await addScheduleByProId(data);
        schedules.value.push({
          id: res[0],
          schTitle: null,
          tasks: [],
          proId: productInfo.value.id,
        });
      };

      return {
        visible,
        showModal,
        tempSchedule,
        handleOk,
        cancelScheduleDelete,
        confirmScheduleDelete,
        schedules,
        editSchedule,
        mySchedule,
        productInfo,
        tasks,
        openIndex,
        fold,
        showEditSchedule,
        changeVisible,
        editScheduleVisible,
        addSchedule,
      };
    },
    watch: {
      productInfo(newValue) {
        this.productInfo = newValue;
        console.log('this.productInfo', this.productInfo);
      },
      schedules(newValue) {
        this.schedules = newValue;
      },
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

  .add-schedule {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 15px;
  }
</style>
