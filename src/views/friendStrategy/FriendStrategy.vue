<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
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
      </template>
    </template>
  </a-table>
</template>
<script lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { defineComponent, reactive, ref } from 'vue';
  import type { UnwrapRef } from 'vue';

  const columns = [
    {
      title: '攻略标题',
      width: 180,
      dataIndex: 'title',
      fixed: 'left',
    },
    {
      title: '攻略内容',
      width: 180,
      dataIndex: 'content',
    },
    {
      title: '转发数',
      dataIndex: 'forwardCount',
      width: 150,
    },
    {
      title: '攻略图片',
      dataIndex: 'img',
      width: 150,
    },
    {
      title: '点赞数',
      dataIndex: 'likeCount',
      width: 150,
    },
    {
      title: '攻略用户id',
      dataIndex: 'userid',
      width: 150,
    },
    {
      title: '操作',
      fixed: 'right',
      dataIndex: 'operation',
      width: 180,
    },
  ];
  interface DataItem {
    key: string;
    title: string;
    content: string;
    forwardCount: string;
    userid: string;
    img: string;
    likeCount: string;
  }
  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      title: 'string',
      content: 'string',
      forwardCount: 'string',
      userid: 'string',
      img: 'string',
      likeCount: 'string',
    });
  }
  export default defineComponent({
    setup() {
      const dataSource = ref(data);
      const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

      const edit = (key: string) => {
        editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
      };
      const save = (key: string) => {
        Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
        delete editableData[key];
      };
      const cancel = (key: string) => {
        delete editableData[key];
      };
      return {
        dataSource,
        columns,
        editingKey: '',
        editableData,
        edit,
        save,
        cancel,
      };
    },
  });

  // const columns = [
  //   {
  //     title: '攻略标题',
  //     width: 180,
  //     dataIndex: 'title',
  //     key: 'title',
  //     fixed: 'left',
  //   },
  //   {
  //     title: '攻略内容',
  //     width: 180,
  //     dataIndex: 'content',
  //     key: 'content',
  //   },
  //   {
  //     title: '转发数',
  //     dataIndex: 'forwardCount',
  //     key: 'forwardCount',
  //     width: 150,
  //   },
  //   {
  //     title: '攻略图片',
  //     dataIndex: 'img',
  //     key: 'img',
  //     width: 150,
  //   },
  //   {
  //     title: '点赞数',
  //     dataIndex: 'likeCount',
  //     key: 'likeCount',
  //     width: 150,
  //   },
  //   {
  //     title: '攻略用户id',
  //     dataIndex: 'userid',
  //     key: 'userid',
  //     width: 150,
  //   },
  //   {
  //     title: '操作',
  //     key: 'operation',
  //     fixed: 'right',
  //     width: 180,
  //   },
  // ];
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
