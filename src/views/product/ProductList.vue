<template>
  <div class="core">
    <a-button style="margin-bottom: 1%" type="primary" @click="addProduct">新增产品</a-button>
    <div class="table-container">
      <a-table bordered :pagination="false" :columns="columns" :data-source="currentData"
        :scroll="{ x: 1500, y: 1500 }">
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
                      <a-button @click="showBigModal" type="text">日程价格</a-button>
                      <a-modal v-model:visible="open" title="日程价格" width="100%" wrapClassName="full-modal"
                        cancelText="关闭" :footer="null">
                        <DatePrice ref="childRef" :ProId="record.id" />

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
          <template v-if="column.dataIndex === 'proPageImg'||column.dataIndex === 'posters'">
            <img style="width: 50%;height: 50%;" :src="record[column.dataIndex]" />
          </template>
        </template>
      </a-table>
    </div>
    <div class="pagination-container">
      <a-pagination v-model:current="currentPage" v-model:page-size="pageSize" :total="currentData.length"
        show-size-changer @showSizeChange="onShowSizeChange" />
    </div>
    <a-modal :body-style="bodystyle" v-model:visible="visible" title="产品信息" :confirm-loading="confirmLoading"
      @ok="handleOk">
      <div style="padding: 1%;">

        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <template v-for="column in columns">
            <template v-if="column.key !== 'operation'">
              <a-form-item :label="column.title" :key="column.key">
                <!-- For '产品售卖数量' and '推荐指数', display as text if the key is matching -->
                <template v-if="column.dataIndex === 'soldNumber' || column.dataIndex === 'recNum'">
                  <span style=" font-size: 14px; font-weight: 700;">{{ formState[column.dataIndex] }}</span>
                </template>

                <!-- For 'proPageImg' or 'posts', display as image upload box -->
                <template v-else-if="column.dataIndex === 'proPageImg' || column.dataIndex === 'posters'">

                </template>

                <!-- For 'proIntroduction', display as textarea -->
                <template v-else-if="column.dataIndex === 'proIntroduction'">
                  <textarea class="custom-textarea" v-model="formState[column.dataIndex]"></textarea>
                </template>
                <!-- For 'proEvaluate', 'proDate', and 'proMan', display as numeric input -->
                <template v-else>
                  <!-- 数字判定。。。。。。。。。 -->
                  <input
                    v-if="column.dataIndex === 'proEvaluate' || column.dataIndex === 'proDate' || column.dataIndex === 'proMan'"
                    v-model="formState[column.dataIndex]" />
                  <!-- For other fields, display as regular input box -->
                  <input v-else v-model="formState[column.dataIndex]" />
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
  import { ref, reactive, computed, onMounted, defineProps } from 'vue';
  import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { getProductList, saveOrUpdate, deleteOne } from './Product.api';
  import { Modal } from 'ant-design-vue';
  import { createVNode, defineComponent } from 'vue';
  import DatePrice from '../datePrice/datePrice.vue';

  const bodystyle = {
    height: '480px',
    overflow: 'hidden',
    overflowY: 'scroll',
  }
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
      width: 155,
      align: 'center'
    },
    {
      title: '产品介绍',
      dataIndex: 'proIntroduction',
      key: '3',
      width: 155,
      align: 'center'
    },
    {
      title: '产品时长',
      dataIndex: 'proDate',
      key: '4',
      width: 155,
      align: 'center'
    },
    {
      title: '产品封面',
      dataIndex: 'proPageImg',
      key: '5',
      width: 155,
      align: 'center'
    },
    {
      title: '产品海报',
      dataIndex: 'posters',
      key: '6',
      width: 155,
      align: 'center'
    },
    {
      title: '成团人数',
      dataIndex: 'proMan',
      key: '7',
      width: 155,
      align: 'center'
    },
    {
      title: '封面标题',
      dataIndex: 'proPageTitle',
      key: '8',
      width: 155,
      align: 'center'
    },
    {
      title: '出发地点',
      dataIndex: 'origin',
      key: '9',
      width: 155,
      align: 'center'
    },
    {
      title: '产品售卖数量',
      dataIndex: 'soldNumber',
      key: '10',
      width: 155,
      align: 'center'
    },
    {
      title: '产品地点',
      dataIndex: 'local',
      key: '11',
      width: 155,
      align: 'center'
    },
    {
      title: '详细地点(小标题)',
      dataIndex: 'localDetail',
      key: '12',
      width: 155,
      align: 'center'
    },
    {
      title: '推荐指数',
      dataIndex: 'recNum',
      key: '13',
      width: 155,
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

  // 点击记录
  let clickedRecord = ref(null);
  // 表单数据
  let formState = reactive(null);

  const labelCol = reactive({
    style: {
      width: '150px',
    },
  });
  const wrapperCol = reactive({
    span: 14,
  });

  const currentData = computed(() => {
    return productList;
  });

  // 请求返回的数据
  const productList = reactive([]);
  const batchPackage = reactive([]);
  const priceDate = reactive([]);
  const journeyPackage = reactive([]);
  const schedules = reactive([]);

  // 清空表单数据
  const resetFormState = () => {
    if (formState) {
      let keys = Object.keys(formState);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        formState[key] = '';
      }
    } else {
      console.log('出错了，请刷新！！！')
    }
  };

  const onShowSizeChange = (current, size) => {
    pageSize.value = size;
    currentPage.value = current || 1;
  };

  // 拿到本行记录
  const showModal = (record) => {
    // console.log(record)
    // 有记录就是编辑
    if (record) {
      visible.value = true;
      clickedRecord.value = { ...record };
      // 更新表单数据
      formState = { ...record }
    } else {
      // 没有记录就是新增
      // 先清空或者重构
      formState = { ...productList[0] }
      resetFormState();
      visible.value = true;
    }
  };

  /** 编辑逻辑开始**/

  const isFormStateValid = (formState) => {
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        // 排除recNum和soldNumber字段的空值验证
        if ((key === 'recNum' || key === 'soldNumber') && formState[key] === '') {
          continue;
        }

        if (formState[key].trim() === '') {
          return false; // 如果有任何一个属性值为空，则返回false
        }
      }
    }
    return true; // 如果所有属性值都不为空，则返回true
  };

  const error = () => {
    message.error('不允许有空值！！！');
  };
  const handleOk = () => {
    if (!isFormStateValid(formState)) {
      // 如果有任何属性值为空，不允许上传
      error();
      return;
    }
    confirmLoading.value = true;
    setTimeout(() => {
      visible.value = false;
      confirmLoading.value = false;
      if (clickedRecord.value) {
        const index = productList.findIndex((item) => item.key === clickedRecord.value.key);
        if (index !== -1) {
          productList[index] = { ...formState };
          // 执行编辑
          saveOrUpdate({ formState: formState });
        }
      } else {
        // Add a new product to the first row
        productList.unshift({ ...formState, key: productList.length });
        // 执行新增

      }
      resetFormState();
    }, 500);
  };

  /** 编辑逻辑结束**/


  /** 删除逻辑开始**/
  const deleteRow = (record) => {
    const index = productList.findIndex((item) => item.id === record.id);
    if (index !== -1) {
      handleDelete(record);
      productList.splice(index, 1);
    }
  };

  /**
 * 删除事件
 */
  async function handleDelete(record) {

    await deleteOne({ id: record.id }, handleSuccess);
  }
  /**
 * 成功回调
 */
  function handleSuccess() {
    console.log("删除成功")
  }
  /** 删除逻辑结束**/


  /** 添加逻辑开始**/
  const addProduct = () => {
    showModal();
    // saveOrUpdate({ formState: formState })
  };
  /** 添加逻辑结束**/

  /** 查询逻辑开始**/
  onMounted(async () => {
    try {
      // 从服务器获取产品列表综合
      const response = await getProductList({});
      // response.records是所有信息，根据这个筛选
      console.log(response.records);
      response.records.forEach(record => {
        let product = reactive({
          proTitle: record.proTitle || null,
          proEvaluate: record.proEvaluate || null,
          proIntroduction: record.proIntroduction || null,
          proDate: record.proDate || null,
          proPageImg: record.proPageImg || null,
          posters: record.posters || null,
          proMan: record.proMan || null,
          proPageTitle: record.proPageTitle || null,
          origin: record.origin || null,
          soldNumber: record.soldNumber || null,
          local: record.local || null,
          localDetail: record.localDetail || null,
          recNum: record.recNum || null,
          id: record.id || null,
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
  /** 查询逻辑结束**/

  const open = ref(false);
  const childRef = ref();
  const getChild = () => {
    // 第三步： 调用子组件的方法或者变量，通过value
    childRef.value.commitSave('1683715194473160706');
  };
  const showBigModal = () => {
    open.value = true;
  };
  const handleCancel = () => {
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

  input {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px 5px;
    width: 300px;
    font-size: 14px;
    font-weight: 700;
  }

  input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
  }

  .custom-textarea {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px 5px;
    width: 300px;
    font-size: 14px;
    font-weight: 700;
  }

  .custom-textarea:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
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