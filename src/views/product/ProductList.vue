<template>
  <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag v-for="tag in record.tags" :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import ProductOperate from './components/ProductOperate.vue';
const data = [
  {
    key: '1',
    productDec: 'John Brown',
    title: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    ProductOperate
  },
  setup() {
    const columns = ref([
      // {
      //   dataIndex: 'title',
      //   key: 'title',
      //   resizable: true,
      //   width: 150,
      // },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        resizable: true,
        width: 100,
        minWidth: 100,
        maxWidth: 200,
      },
      {
        title: '描述',
        dataIndex: 'productDec',
        key: 'productDec',
      },
      {
        title: '目的地',
        key: 'departure',
        dataIndex: 'departure',
      },
      {
        title: '海报',
        key: 'img',
      },
    ]);
    return {
      data,
      columns,
      handleResizeColumn: (w, col) => {
        col.width = w;
      },
    };
  },
});
</script>