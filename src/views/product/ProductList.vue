<template>
  <div class="core">
    <a-button style="margin-bottom: 1%" type="primary" @click="addProduct">新增产品</a-button>
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
                      <a-button @click="showBigModal" type="text" >日程价格</a-button>
                      <a-modal v-model:visible="open" title="日程价格" width="100%" wrapClassName="full-modal" cancelText="关闭" :footer="null">
                        <DatePrice ref="childRef" :ProId="record.id"/>

                        <template slot="footer">
                          <a-button @click="handleCancel">关闭</a-button>
                        </template>

                      </a-modal>
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
        </template>
      </a-table>
    </div>

    <div class="pagination-container">
      <a-pagination
        v-model:current="currentPage"
        v-model:page-size="pageSize"
        :total="data.length"
        show-size-changer
        @showSizeChange="onShowSizeChange"
      />
    </div>
    <a-modal v-model:visible="visible" title="产品信息" :confirm-loading="confirmLoading" @ok="handleOk">
      <div style="padding: 1%">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="产品标题">
            <a-input v-model:value="clickedRecord.proTitle" />
          </a-form-item>
          <a-form-item label="产品估价">
            <a-input v-model:value="clickedRecord.proEvaluate" />
          </a-form-item>
          <a-form-item label="产品介绍">
            <a-input v-model:value="clickedRecord.proIntroduction" type="textarea" />
          </a-form-item>
          <!-- 添加其他表单项 -->
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
import DatePrice from '../datePrice/datePrice.vue';

const columns = [
  {
    title: '产品标题',
    width: 180,
    dataIndex: 'proTitle',
    key: 'proTitle',
    fixed: 'left',
  },
  {
    title: '产品估价',
    dataIndex: 'proEvaluate',
    key: '1',
    width: 150,
  },
  {
    title: '产品介绍',
    dataIndex: 'proIntroduction',
    key: '2',
    width: 150,
  },
  {
    title: '产品时长',
    dataIndex: 'proDate',
    key: '3',
    width: 150,
  },
  {
    title: '产品封面',
    dataIndex: 'proPageImg',
    key: '4',
    width: 150,
  },
  {
    title: '产品海报',
    dataIndex: 'posters',
    key: '5',
    width: 150,
  },
  {
    title: '成团人数',
    dataIndex: 'proMan',
    key: '6',
    width: 150,
  },
  {
    title: '封面标题',
    dataIndex: 'proPageTitle',
    key: '7',
    width: 150,
  },
  {
    title: '出发地点',
    dataIndex: 'origin',
    key: '8',
    width: 150,
  },
  {
    title: '产品售卖数量',
    dataIndex: 'soldNumber',
    key: '9',
    width: 150,
  },
  {
    title: '产品地点',
    dataIndex: 'local',
    key: '10',
    width: 150,
  },
  {
    title: '详细地点(小标题)',
    dataIndex: 'localDetail',
    key: '11',
    width: 150,
  },
  {
    title: '推荐指数',
    dataIndex: 'recNum',
    key: '12',
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 180,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    recNum: `Edrward ${i}`,
    localDetail: 32,
    local: `London Park no. ${i}`,
  });
}

const currentPage = ref(1);
const pageSize = ref(10);
const visible = ref(false);
const confirmLoading = ref(false);
const clickedRecord = ref(null);

const labelCol = reactive({
  style: {
    width: '150px',
  },
});
const wrapperCol = reactive({
  span: 14,
});

const formState = reactive({
  proTitle: '',
  proEvaluate: '',
  proIntroduction: '',
  // 添加其他表单项的默认值
});

const currentData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return productList.slice(startIndex, endIndex); // 修改这里
});

const onShowSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const showModal = (record) => {
  if (record) {
    visible.value = true;
    clickedRecord.value = { ...record };
    // 更新表单数据
    formState.proTitle = record.proTitle;
    formState.proEvaluate = record.proEvaluate;
    formState.proIntroduction = record.proIntroduction;
    // 更新其他表单项的数据
  } else {
    // 清空表单数据
    formState.proTitle = '';
    formState.proEvaluate = '';
    formState.proIntroduction = '';
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
      // 编辑状态下，更新表格数据
      const index = productList.findIndex((item) => item.key === clickedRecord.value.key);
      if (index !== -1) {
        productList[index] = { ...formState };
      }
    } else {
      // 新增状态下，将表单数据添加到表格的第一行
      productList.unshift({ ...formState, key: productList.length });
    }
    // 清空表单数据
    formState.proTitle = '';
    formState.proEvaluate = '';
    formState.proIntroduction = '';
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
    response.records.forEach((record) => {
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

const open = ref(false);
const childRef = ref();
const getChild = () => {
  // 第三步： 调用子组件的方法或者变量，通过value
  childRef.value.commitSave('1683715194473160706');
};
const showBigModal = () => {
  open.value = true;
};
const handleCancel = ()=>{
  open.value = false;
}
</script>

<style lang="less">
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
</style>