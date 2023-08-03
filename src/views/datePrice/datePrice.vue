<template>
  <div>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加日程</a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'date'">
          <div class="editable-cell">
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.key].date" @pressEnter="save(record.key)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'price'">
          <div class="editable-cell">
            <div v-if="editableData2[record.key]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData2[record.key].price" @pressEnter="save2(record.key)" />
              <check-outlined class="editable-cell-icon-check" @click="save2(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined @click="edit2(record.key)" />
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm v-if="dataSource.length" title="确定删除吗?" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import type { Ref, UnwrapRef } from 'vue';
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';

  interface DataItem {
    key: string;
    date: string;
    price: number;
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: '30%',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];
  const dataSource: Ref<DataItem[]> = ref([
    {
      key: '0',
      date: '9月8日',
      price: 299,
    },
    {
      key: '1',
      date: '9月20日',
      price: 299,
    },
  ]);
  const count = computed(() => dataSource.value.length + 1);
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
  const editableData2: UnwrapRef<Record<string, DataItem>> = reactive({});

  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };

  const edit2 = (key: string) => {
    editableData2[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };
  const save = (key: string) => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
  };
  const save2 = (key: string) => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData2[key]);
    delete editableData2[key];
  };

  const onDelete = (key: string) => {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
  };

  const handleAdd = () => {
    const newData = {
      key: `${count.value}`,
      name: `Edward King ${count.value}`,
      age: 32,
      address: `London, Park Lane no. ${count.value}`,
    };
    dataSource.value.push(newData);
  };
</script>

<style lang="less" scoped>
  .editable-add-btn {
    margin: 10px 5px;
  }
</style>