<template>
  <div class="core">
    <a-button style="margin-bottom: 1%" type="primary" @click="addProduct">新增产品</a-button>
    <div class="table-container">
      <a-table bordered :pagination="false" :columns="columns" :data-source="model" :scroll="{ x: 1500, y: 300 }">
      </a-table>
    </div>
    <div class="pagination-container">
      <!--      <a-pagination v-model:current="currentPage" v-model:page-size="pageSize" show-size-changer @showSizeChange="onShowSizeChange" />-->
    </div>
  </div>
</template>

<script setup>
import { getFriendStrategyList } from '/src/views/friendStrategy/friendStrategyApi';

const columns = [
  {
    title: '攻略标题',
    width: 180,
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
  },
  {
    title: '攻略内容',
    width: 180,
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '转发数',
    dataIndex: 'forwardCount',
    key: 'forwardCount',
    width: 150,
  },
  {
    title: '攻略图片',
    dataIndex: 'img',
    key: 'img',
    width: 150,
  },
  {
    title: '点赞数',
    dataIndex: 'likeCount',
    key: 'likeCount',
    width: 150,
  },
  {
    title: '攻略用户id',
    dataIndex: 'userid',
    key: 'userid',
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 180,
  },
];
// let data = null;
// let currentPage = '';
// let pageSize = '';

let model = [];
getFriendStrategyList().then((res) => {
  console.log(res);
  model = res.record;
});
</script>

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
