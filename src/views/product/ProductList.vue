<template>
  <a-table :columns="columns" :data-source="data" :pagination="pageination" @resizeColumn="handleResizeColumn">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'title'">
        <span>
          <smile-outlined />
          标题
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'productDec'">
        <a>
          {{ record.productDec }}
        </a>
      </template>
      <template v-else-if="column.key === 'departure'">
        <a>
          {{ record.departure }}
        </a>
      </template>
      <template v-else-if="column.key === 'img'">
        <img style="max-width: 50px" :src="record.img" />
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>编辑</a>
          <a-divider type="vertical" />
          <a>删除</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              更多操作
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">其它</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { getProductListApi } from '/@/views/product/Product.api';
let data = ref();
let columns = ref([
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
    dataIndex: 'img',
  },
  {
    title: '操作',
    key: 'action',
  },
]);
let pageination = {
  total: 0,
  pageSize: 10,
  showSizeChanger: true,
  // pageSizeOptions: ['10', '20', '30'],
  showTotal: (total) => `全部 ${total} 条`,
  showSizeChange: (current, pageSize) => {
    this.pageSize = pageSize;
  },
};
function getProductList() {
  const pageParams = {
    pageNo: 1,
    pageSize: 5,
  };
  getProductListApi(pageParams).then((res) => {
    let result = res.result;
    data.value = result.records;
    pageination.total = result.total;
  });
}

getProductList();
</script>
