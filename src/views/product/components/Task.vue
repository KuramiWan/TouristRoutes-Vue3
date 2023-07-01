<template>
  <a-card v-for="(jd, i) in journeyDays" :key="jd.id">
    <h2
      ><strong>Day:{{ i + 1 }}&nbsp;{{ jd.title }}</strong></h2
    >
    <a-button ghost type="primary" @click="addNewTask(i)" size="small">添加新任务</a-button>
    <a-card :hoverable="true" v-for="(task, index) in jd.tasks" :key="task.id">
      <h3>任务:{{ index + 1 }}&nbsp;{{ task.title }}</h3>
      <a-form :model="formDate" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="标题">
          <a-input v-model:value="task.title" />
        </a-form-item>
        <a-form-item label="行为">
          <a-input v-model:value="task.action" />
        </a-form-item>
        <a-form-item label="时间">
          <a-input v-model:value="task.time" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-space>
            <a-button type="primary" @click="save(jd.id, task)">保存</a-button>
          </a-space>
          <a-button style="margin-left: 10px" @click="clear(jd.id, task)">删除</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-card>
</template>
<script>
  import { defineComponent, reactive, ref, defineExpose } from 'vue';
  import { getProductListByIdApi } from '../Product.api';
  import { saveOrUpdate, deleteOne } from '../../task/JourneyTask.api';
  import { message } from 'ant-design-vue';
  export default defineComponent({
    props: ['id'],
    setup(props) {
      let flag = ref(false);
      // console.log(props.id)
      const formDate = reactive({});
      const warning = () => {
        message.warning('抱歉，有数据为空，不能保存提交！！！');
      };

      let journeyDays = ref([]);
      const queryTask = () => {
        getProductListByIdApi(props.id).then((res) => {
          journeyDays.value = res.result.journeyDays;
          // 第一天的任务集合
          // console.log(journeyDays.value[0].tasks)
        });
        return journeyDays;
      };

      const addNewTask = (index) => {
        journeyDays.value[index].tasks.push({
          title: '',
          action: '',
          time: '',
        });
      };

      let allDays = ref([]);
      const save = (id, task) => {
        if (!(task.title && task.action && task.time)) {
          warning();
          return false;
        }
        if (!task.journeyDayId) {
          // 给任务加上对应的天的id，然后直接插入到数据库
          task.journeyDayId = id;
          saveOrUpdate(task).then((res) => {
            console.log(res);
          });
          return true;
        }
        saveOrUpdate(task, true).then((res) => {
          console.log(res);
        });
      };

      const clear = (id, task) => {
        // 如果task没有天id，那么就是还没有进入数据库，那么页面重置
        if (!task.journeyDayId) {
          task.title = '';
          task.action = '';
          task.time = '';
          return false;
        }
        // 如果已经有天id，那么就是在数据库，那么页面重置，且执行数据库清空
        task.title = '';
        task.action = '';
        task.time = '';
        deleteOne(task).then((res) => {
          console.log(res);
        });
      };

      return {
        formDate,
        queryTask,
        journeyDays,
        addNewTask,
        save,
        clear,
        flag,
        warning,
      };
    },
  });
</script>
