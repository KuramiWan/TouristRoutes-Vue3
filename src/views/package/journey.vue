<template>
  <div>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加</a-button>
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['jpContent', 'jpPriceAdult', 'jpPriceChild'].includes(column.dataIndex)">
          <div>
            <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)">保存</a-typography-link>
              <a-popconfirm title="确认取消?" @confirm="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
            </span>
          </div>
          <a-popconfirm v-if="dataSource.length" title="确认删除?" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { cloneDeep } from 'lodash-es';
  import { reactive, ref } from 'vue';
  import type { UnwrapRef } from 'vue';
  import { getJourney, addJourney, deleteJourney, updateJourney } from './journeyApi';
  const props = defineProps({
    ProId: String,
  });
  const columns = [
    {
      title: '套餐内容',
      width: 180,
      dataIndex: 'jpContent',
      ellipsis: true,
    },
    {
      title: '成人价格',
      width: 180,
      dataIndex: 'jpPriceAdult',
      ellipsis: true,
    },
    {
      title: '儿童价格',
      width: 180,
      dataIndex: 'jpPriceChild',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 180,
    },
  ];
  interface DataItem {
    id: string;
    proId: string;
    key: string;
    jpContent: string;
    jpPriceAdult: number;
    jpPriceChild: number;
  }
  const data: DataItem[] = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i.toString(),
  //     title: 'string',
  //     content: 'string',
  //     forwardCount: 'string',
  //     userid: 'string',
  //     img: 'string',
  //     likeCount: 'string',
  //   });
  // }
  const dataSource = ref(data);
  let counter = 0;
  function getList() {
    // const page = {
    //   pageNo: 1,
    //   pageSize: 10,
    // };
    getJourney({ proId: props.ProId }).then((res) => {
      dataSource.value = res;
      dataSource.value.forEach((item) => {
        item.key = (counter++).toString();
      });
      console.log(dataSource.value);
    });
  }

  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
    console.log(editableData[key]);
  };
  const save = (key: string) => {
    console.log(hasAdding);
    console.log(editableData[key]);
    console.log(hasAdding && editableData[key]);
    console.log(!hasAdding && editableData[key]);
    if (!hasAdding) {
      Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
      console.log(editableData[key]);
      editableData[key].id = dataSource.value.filter((item) => key === item.key)[0].id;
      updateJourney(editableData[key]).then((res) => {
        console.log(res);
        console.log(editableData[key]);
      });
    }
    if (hasAdding) {
      addJourney(editableData[key]).then((res) => {
        console.log(res);
        hasAdding = false;
      });
    }
    delete editableData[key];
  };
  const cancel = (key: string) => {
    delete editableData[key];
  };

  const onDelete = (key: string) => {
    console.log(dataSource.value.filter((item) => key === item.key)[0].id);
    deleteJourney({ id: dataSource.value.filter((item) => key === item.key)[0].id });
    dataSource.value = dataSource.value.filter((item) => item.key !== key);
  };

  let hasAdding = false;
  const handleAdd = () => {
    if (!hasAdding) {
      const newData = {
        id: '',
        proId: props.ProId,
        key: `${++counter}`,
        jpPriceAdult: 0,
        jpPriceChild: 0,
        jpContent: '',
      };
      dataSource.value.push(newData);
      editableData[counter] = newData;
      hasAdding = true;
    }
  };

  getList();
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>

<style scoped>
  .core {
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .table-container {
    flex: 1;
    width: 100%;
    overflow: auto;
  }

  .pagination-container {
    position: relative;
    margin-top: 1rem;
  }
</style>
