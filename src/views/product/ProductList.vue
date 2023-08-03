<template>
  <div class="core">
    <a-button style="margin-bottom: 1%;" type="primary" @click="addProduct">新增产品</a-button>
    <div class="table-container">
      <a-table bordered :pagination="false" :columns="columns" :data-source="currentData" :scroll="{ x: 1500, y: 300 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-space>
              <a @click="showModal(record)">编辑</a>
              <a @click="deleteRow(record)">删除</a>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  更多操作
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a>日程详情</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a>每日价格</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a>批次套餐</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a>行程套餐</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
          <template v-if="column.dataIndex === 'proPageImg'">
            <img style="width: 50%;height: 50%;" :src="record.proPageImg" />
          </template>
          <template v-if="column.dataIndex === 'posters'">
            <img style="width: 50%;height: 50%;" :src="record.posters" />
          </template>
        </template>
      </a-table>
    </div>
    <div class="pagination-container">
      <a-pagination v-model:current="currentPage" v-model:page-size="pageSize" :total="currentData.length"
        show-size-changer @showSizeChange="onShowSizeChange" />
    </div>
    <a-modal v-model:visible="visible" title="产品信息" :confirm-loading="confirmLoading" @ok="handleOk">
      <div style="padding: 1%;">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <template v-for="column in columns">
            <template v-if="column.key !== 'operation'">
              <a-form-item :label="column.title" :key="column.key">
                <!-- For '产品售卖数量' and '推荐指数', display as text if the key is matching -->
                <template v-if="column.dataIndex === 'soldNumber' || column.dataIndex === 'recNum'">
                  <span>{{ formState[column.dataIndex] }}</span>
                </template>
                <template v-else>
                  <a-input v-model:value="formState[column.dataIndex]" />
                </template>
              </a-form-item>
            </template>
          </template>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { defineProps } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { list } from './Product.api';

  const columns = [
    {
      title: '产品标题',
      width: 155,
      dataIndex: 'proTitle',
      key: '1',
      fixed: 'left',
      align: 'center'
    },
    {
      title: '产品估价',
      dataIndex: 'proEvaluate',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '产品介绍',
      dataIndex: 'proIntroduction',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '产品时长',
      dataIndex: 'proDate',
      key: '4',
      width: 150,
      align: 'center'
    },
    {
      title: '产品封面',
      dataIndex: 'proPageImg',
      key: '5',
      width: 150,
      align: 'center'
    },
    {
      title: '产品海报',
      dataIndex: 'posters',
      key: '6',
      width: 150,
      align: 'center'
    },
    {
      title: '成团人数',
      dataIndex: 'proMan',
      key: '7',
      width: 150,
      align: 'center'
    },
    {
      title: '封面标题',
      dataIndex: 'proPageTitle',
      key: '8',
      width: 150,
      align: 'center'
    },
    {
      title: '出发地点',
      dataIndex: 'origin',
      key: '9',
      width: 150,
      align: 'center'
    },
    {
      title: '产品售卖数量',
      dataIndex: 'soldNumber',
      key: '10',
      width: 150,
      align: 'center'
    },
    {
      title: '产品地点',
      dataIndex: 'local',
      key: '11',
      width: 150,
      align: 'center'
    },
    {
      title: '详细地点(小标题)',
      dataIndex: 'localDetail',
      key: '12',
      width: 150,
      align: 'center'
    },
    {
      title: '推荐指数',
      dataIndex: 'recNum',
      key: '13',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 180,
      align: 'center'
    },
  ];

  const currentPage = ref(1);
  const pageSize = ref(10);
  const visible = ref(false);
  const confirmLoading = ref(false);
  let clickedRecord = ref(null);

  const labelCol = reactive({
    style: {
      width: '150px',
    },
  });
  const wrapperCol = reactive({
    span: 14,
  });

  let formState = reactive(null);

  const currentData = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return productList.slice(startIndex, endIndex); // 修改这里
  });

  const resetFormState = () => {
    formState = Object.fromEntries(Object.keys(formState).map(key => [key, '']));
  };

  const onShowSizeChange = (current, size) => {
    pageSize.value = size;
    currentPage.value = current || 1;
  };

  // 拿到本行记录
  const showModal = (record) => {
    if (record) {
      visible.value = true;
      clickedRecord.value = { ...record };
      // 更新表单数据
      formState = { ...record }
      // 更新其他表单项的数据
    } else {
      // 清空表单数据
      resetFormState();
      // 清空其他表单项的数据
      visible.value = true;
    }
  };

  const handleOk = () => {
    confirmLoading.value = true;
    setTimeout(() => {
      visible.value = false;
      confirmLoading.value = false;
      if (clickedRecord.value) {
        const index = productList.findIndex((item) => item.key === clickedRecord.value.key);
        if (index !== -1) {
          productList[index] = { ...formState };
        }
      } else {
        // Add a new product to the first row
        productList.unshift({ ...formState, key: productList.length });
      }
      resetFormState();
    }, 500);
  };


  const deleteRow = (record) => {
    const index = productList.findIndex((item) => item.key === record.key);
    if (index !== -1) {
      productList.splice(index, 1);
    }
  };

  const addProduct = () => {
    showModal();
  };

  const productList = reactive([]);
  const batchPackage = reactive([]);
  const priceDate = reactive([]);
  const journeyPackage = reactive([]);
  const schedules = reactive([]);

  onMounted(async () => {
    try {
      // 从服务器获取产品列表综合
      const response = await list({});
      // response.records是所有信息，根据这个筛选
      console.log(response.records);
      response.records.forEach(record => {
        let product = reactive({
          id: record.id || null,
          local: record.local || null,
          localDetail: record.localDetail || null,
          origin: record.origin || null,
          posters: record.posters || null,
          proDate: record.proDate || null,
          proEvaluate: record.proEvaluate || null,
          proIntroduction: record.proIntroduction || null,
          proMan: record.proMan || null,
          proPageImg: record.proPageImg || null,
          proPageTitle: record.proPageTitle || null,
          proTitle: record.proTitle || null,
          recNum: record.recNum || null,
          soldNumber: record.soldNumber || null,
        });
        // 产品封装
        productList.push(product);
        // 批次套餐封装
        batchPackage.push(record['batch_package']);
        // 日程套餐封装
        journeyPackage.push(record.journey);
        // 每日价格封装
        priceDate.push(record['price_date']);
        // 日程封装，每日涵盖任务数组
        schedules.push(record.schedules);
      });
      // 有部分数据是空，使用时需要做出合理判断
      // console.log(productList);
      // console.log(batchPackage);
      // console.log(journeyPackage);
      // console.log(priceDate);
      // console.log(schedules);
    } catch (error) {
      console.error('获取产品列表数据时出错：', error);
    }
  });

</script>

<style lang="less" scoped>
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