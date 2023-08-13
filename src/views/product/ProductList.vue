<template>
  <div class="core">
    <!-- 产品新增按钮 -->
    <a-button style="margin-bottom: 1%" type="primary" @click="showModal">新增产品</a-button>
    <!-- 整个产品表格 -->
    <div class="table-container">
      <a-table bordered :columns="columns" :pagination="false" :data-source="currentData" :scroll="{ x: 1500, y: 1500 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'proType'">
            <span>{{ record.proType == 1 ? '景点' : '线路' }}</span>
          </template>
          <!-- 操作单元格 -->
          <template v-if="column.dataIndex === 'operation'">
            <a-space>
              <a @click="showModal(record)">编辑</a>
              <a @click="showDeleteConfirm(record)">删除</a>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  更多操作
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a-button @click="showScheduleModal" type="text">日程详情</a-button>
                      <ScheduleList :proId="record.id" ref="ScheduleModal" />
                    </a-menu-item>
                    <a-menu-item>
                      <a-button @click="showBigModal(record.key)" type="text">日程价格</a-button>
                      <a-modal
                        v-model:visible="open[record.key]"
                        title="日程价格"
                        width="100%"
                        wrapClassName="full-modal"
                        cancelText="关闭"
                        @cancel="handleCancel(record.key)"
                        :footer="null"
                      >
                        <DatePrice ref="childRef" :ProId="record.id" />
                        <template #footer>
                          <a-button @click="handleCancel(record.key)">关闭</a-button>
                        </template>
                      </a-modal>
                    </a-menu-item>
                    <!-- <a-menu-item>
                      <a-button @click="goBatch" type="text">批次套餐</a-button>
                      <a-modal
                        @ok="closeBatch"
                        v-model:visible="openBatch"
                        title="批次套餐"
                        width="100%"
                        wrapClassName="full-modal"
                        cancelText="关闭"
                        :footer="null"
                      >
                        <BatchPackage :ProId="record.id" />
                        <template #footer>
                          <a-button @click="openBatch = false">关闭</a-button>
                        </template>
                      </a-modal>
                    </a-menu-item> -->
                    <a-menu-item>
                      <a-button @click="goJourney" type="text">行程套餐</a-button>
                      <a-modal
                        @ok="closeJourney"
                        v-model:visible="openJourney"
                        title="行程套餐"
                        width="100%"
                        wrapClassName="full-modal"
                        cancelText="关闭"
                        :footer="null"
                      >
                        <JourneyPackage :ProId="record.id" />
                        <template #footer>
                          <a-button @click="openJourney = false">关闭</a-button>
                        </template>
                      </a-modal>
                    </a-menu-item>
                    <a-menu-item>
                      <a-button @click="showGuideManageModal" type="text">推荐导游</a-button>
                      <GuideManage :proId="record.id" ref="GuideManageModal" />
                    </a-menu-item>
                    <a-menu-item>
                      <a-button type="text" @click="showTagModal">产品标签</a-button>
                      <Tag :proId="record.id" ref="showTag"></Tag>
                    </a-menu-item>
                    <a-menu-item>
                      <a-button @click="showBigModal2(record.key)" type="text">保险详情</a-button>
                      <a-modal v-model:visible="open2[record.key]" @cancel="handleCancel2(record.key)" title="保险详情" width="100%" wrapClassName="full-modal" cancelText="关闭" :footer="null">
                        <Insure :ProId="record.id" ref="childRef2" />
                        <template #footer>
                          <a-button @click="handleCancel2(record.key)">关闭</a-button>
                        </template>
                      </a-modal>
                    </a-menu-item>
                    <a-menu-item>
                      <a-button type="text" @click="showChargeModal">费用说明</a-button>
                      <Charge :proId="record.id" ref="showCharge"></Charge>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
          <!-- 显示图片 -->
          <template v-if="column.dataIndex === 'proPageImg' || column.dataIndex === 'posters'">
            <img style="width: 100%; height: 110px" :src="record[column.dataIndex]" />
          </template>
        </template>
      </a-table>
    </div>

    <!-- 分页组件 -->
    <div class="paginationCom">
      <a-pagination size="small" @change="changePage(current)" v-model:pageSize="pageSize" v-model:current="current" :total="total" />
    </div>

    <!-- 编辑或者新增，弹出的模态框，取消底部默认按钮 -->
    <a-modal :body-style="bodystyle" v-model:visible="visible" title="产品信息" :footer="null">
      <div style="padding: 1%">
        <!-- 模态框展示一张表单，用于收集产品数据 -->
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <!-- 循环表格中的字段，获取需要的展示到表单 -->
          <template v-for="column in columns">
            <!-- 不需要操作字段，推荐数和售卖数量 -->
            <template v-if="column.dataIndex !== 'operation' && column.dataIndex !== 'recNum' && column.dataIndex !== 'soldNumber'">
              <a-form-item :label="column.title" :key="column.key">
                <!-- 如果是产品介绍，那么渲染为长文本框 -->
                <template v-if="column.dataIndex === 'proIntroduction'">
                  <!-- <textarea class="custom-textarea" v-model="formState[column.dataIndex]"></textarea> -->
                  <a-textarea v-model:value="formState[column.dataIndex]" show-count :maxlength="150" />
                </template>
                <template v-else-if="column.dataIndex === 'proType'">
                  <a-select ref="selectType" v-model:value="formState[column.dataIndex]" placeholder="请选择产品类别">
                    <a-select-option value="1">景点</a-select-option>
                    <a-select-option value="2">线路</a-select-option>
                  </a-select>
                </template>
                <!-- 如果是产品封面，那么采用图片模态框，渲染加上传 -->
                <template v-else-if="column.dataIndex === 'proPageImg'">
                  <div class="clearfix">
                    <a-upload
                      v-model:file-list="pageImg"
                      :customRequest="customProPageImgRequest"
                      name="file"
                      :multiple="true"
                      list-type="picture-card"
                      @preview="handlePreview"
                      @change="uploadChange"
                    >
                      <template v-if="pageImg.length == 0">
                        <plus-outlined />
                        <div style="margin-top: 8px">Upload</div>
                      </template>
                      <template v-else>
                        <div v-if="pageImg.length < 1">
                          <plus-outlined />
                          <div style="margin-top: 8px">Upload</div>
                        </div>
                      </template>
                    </a-upload>
                    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="imgHandleCancel">
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </template>
                <!-- 如果是海报，那么也采用图片模态框，渲染加上传 -->
                <template v-else-if="column.dataIndex === 'posters'">
                  <div class="clearfix">
                    <a-upload
                      v-model:file-list="posterImg"
                      :customRequest="customPostersRequest"
                      name="file"
                      :multiple="true"
                      list-type="picture-card"
                      @preview="handlePreview"
                      @change="uploadChange"
                    >
                      <template v-if="posterImg[0] == null">
                        <plus-outlined />
                        <div style="margin-top: 8px">Upload</div>
                      </template>
                      <template v-else>
                        <div v-if="posterImg.length < 1">
                          <plus-outlined />
                          <div style="margin-top: 8px">Upload</div>
                        </div>
                      </template>
                    </a-upload>
                    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="imgHandleCancel">
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </template>
                <!-- 其余的采用普通输入框 -->
                <template v-else>
                  <!-- <input v-model="formState[column.dataIndex]" /> -->
                  <a-input v-model:value="formState[column.dataIndex]" />
                </template>
              </a-form-item>
            </template>
          </template>
          <!-- 表单的底部提交按钮 -->
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button style="margin-left: 5%" @click="clearForm">取消</a-button>
            <a-button style="margin-left: 40%" type="primary" @click="onSubmit">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, defineProps,getCurrentInstance } from 'vue';
import { DownOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getProductList, saveOrUpdate, deleteOne, uploadImg } from './Product.api';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import DatePrice from '../datePrice/datePrice.vue';
import ScheduleList from '../schedule/scheduleList.vue';
import GuideManage from '../guide/components/guideManage.vue';
import BatchPackage from '../package/batch.vue';
import JourneyPackage from '../package/journey.vue';
import Tag from '../tag/tag.vue';
import Charge from '../charge/charge.vue';
import Insure from '../insure/insure.vue';

/**---------------------------------------请求的产品数据--------------------------------------------------**/
// 请求返回的数据，等待请求之后完成封装
let productList = ref([]);
const batchPackage = ref([]);
const priceDate = ref([]);
const journeyPackage = ref([]);
const schedules = ref([]);
let pageSize = ref(null);
let total = ref(null);
let open2 = ref([])
let open = ref([])
// 调用接口，查询产品列表
const listPro = async (current) => {
  try {
    const response = await getProductList({ pageNo: current, pageSize: 10 });
    // response.records是所有信息，根据这个筛选
    console.log(response);
    pageSize.value = response.size;
    total.value = response.total;
    open2.value = Array.from( {length:total.value} , () => false)
    open.value = Array.from( {length:total.value} , () => false)
    let i = 0;
    response.records.forEach((record) => {
      let product = reactive({
        proTitle: record.proTitle || null,
        proEvaluate: record.proEvaluate || null,
        proIntroduction: record.proIntroduction || null,
        proDate: record.proDate || null,
        proType: record.proType || null,
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
        key: i
      });
      // 产品封装
      productList.value.push(product);
      // 批次套餐封装
      batchPackage.value.push(record['batch_package']);
      // 日程套餐封装
      journeyPackage.value.push(record.journey);
      // 每日价格封装
      priceDate.value.push(record['price_date']);
      // 日程封装，每日涵盖任务数组
      schedules.value.push(record.schedules);
      i = i + 1;
    });
  } catch (error) {
    console.error('获取产品列表数据时出错：', error);
  }
};
listPro(1);

/**---------------------------------------表格--------------------------------------------------**/
// 表格静态样式
const bodystyle = {
  height: '480px',
  overflow: 'hidden',
  overflowY: 'scroll',
};
// html中静态的表格字段
const columns = [
  {
    title: '产品标题',
    width: 155,
    dataIndex: 'proTitle',
    key: '1',
    fixed: 'left',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '产品估价',
    dataIndex: 'proEvaluate',
    key: '2',
    width: 155,
    align: 'center',
  },
  {
    title: '产品介绍',
    dataIndex: 'proIntroduction',
    key: '3',
    width: 155,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '旅行日程/天',
    dataIndex: 'proDate',
    key: '4',
    width: 155,
    align: 'center',
  },
  {
    title: '产品封面',
    dataIndex: 'proPageImg',
    key: '5',
    width: 155,
    align: 'center',
  },
  {
    title: '产品海报',
    dataIndex: 'posters',
    key: '6',
    width: 155,
    align: 'center',
  },
  {
    title: '成团人数',
    dataIndex: 'proMan',
    key: '7',
    width: 155,
    align: 'center',
  },
  {
    title: '封面标题',
    dataIndex: 'proPageTitle',
    key: '8',
    width: 155,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '出发地点',
    dataIndex: 'origin',
    key: '9',
    width: 155,
    align: 'center',
  },
  {
    title: '产品售卖数量',
    dataIndex: 'soldNumber',
    key: '10',
    width: 155,
    align: 'center',
  },
  {
    title: '产品地点',
    dataIndex: 'local',
    key: '11',
    width: 155,
    align: 'center',
  },
  {
    title: '详细地点(小标题)',
    dataIndex: 'localDetail',
    key: '12',
    width: 155,
    align: 'center',
  },
  {
    title: '产品类型',
    dataIndex: 'proType',
    key: '13',
    width: 155,
    align: 'center',
  },
  {
    title: '推荐指数',
    dataIndex: 'recNum',
    key: '14',
    width: 155,
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: '15',
    fixed: 'right',
    width: 180,
  },
];
// 表格中的产品数据
let currentData = productList.value;
// 调用接口删除数据库中数据
async function handleDelete(record) {
  await deleteOne({ id: record.id }, handleSuccess);
}
// 删除成功之后的回调
function handleSuccess() {
  console.log('删除成功');
}
// 前端操作按钮之删除
const deleteRecord = (record) => {
  const index = currentData.findIndex((item) => item.id === record.id);
  if (index !== -1) {
    handleDelete(record);
    currentData.splice(index, 1);
  }
};
// 点击删除之后，弹出警告对话框
const showDeleteConfirm = (record) => {
  Modal.confirm({
    title: '是否删除？',
    icon: createVNode(ExclamationCircleOutlined),
    content: '删除之后，将无法找到',
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk() {
      deleteRecord(record);
    },
    onCancel() {
      console.log('取消成功');
    },
  });
};

// 当前页
let current = ref(1);
// 分页函数
const changePage = (currentPage) => {
  console.log(currentPage);
  productList.value = [];
  listPro(currentPage);
  currentData = productList.value;
};

/**---------------------------------------表单--------------------------------------------------**/
// 创建表单对象，将点击的那一行的产品数据封装到表单
let formState = ref(null);
// 表单的静态属性
const labelCol = ref({
  style: {
    width: '150px',
  },
});
const wrapperCol = ref({
  span: 14,
});
// 清空表单数据
// 清空表单数据
const resetFormState = () => {
  if (formState.value) {
    let keys = Object.keys(formState.value);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      formState.value[key] = '';
    }
  } else {
    console.log('出错了，请刷新！！！');
  }
};
// 判断数据是否为空
const isObjectEmpty = (obj) => {
  // 遍历对象的属性
  for (const key of Object.keys(obj)) {
    if (key !== 'id' && key !== 'recNum' && key !== 'soldNumber' && key !== 'proPageImg' && key !== 'posters' && !obj[key]) {
      return false;
    }
  }
  return true;
};
// 空值报错
const errorNull = (msg) => {
  message.error(msg);
};

// 提交表单
const onSubmit = async () => {
  // console.log(pageImg.value.length === 0)
  // debugger;
  // 关闭模态框
  visible.value = false;
  // 收集表单数据
  let submitForm = { ...formState.value };
  // console.log("111111111111111111111111111", submitForm);
  // debugger;
  // 需要任意数据不为空
  if (!isObjectEmpty(submitForm)) {
    errorNull('添加失败，不允许有空值！！！');
    return;
  }
  try {
    submitForm.proPageImg = pageImg.value[0].url;
    submitForm.posters = posterImg.value[0].url;
  } catch (error) {
    errorNull('添加失败，图片必选！！！');
    console.error('发生错误：', error.message);
    return null;
  }
  // console.log("11111111111111111111", submitForm)
  // debugger
  // 如果是新增，需要添加到表格首行
  if (!submitForm.id) {
    currentData.unshift(submitForm);
    const response = await saveOrUpdate(submitForm);
    submitForm.id = response[0];
  } else {
    // 如果是编辑，直接提交
    const index = currentData.findIndex((item) => item.id === submitForm.id);
    if (index !== -1) {
      Object.keys(submitForm).forEach((key) => {
        currentData[index][key] = submitForm[key];
      });
    }
    const response = await saveOrUpdate(submitForm);
  }
};
// 关闭表单
const clearForm = () => {
  // 关闭模态框
  visible.value = false;
  // 清空表单
  resetFormState();
};

/**---------------------------------------模态框-表单--------------------------------------------------**/
let visible = ref(false);
// 表单中的图片列表
let pageImg = ref([]);
let posterImg = ref([]);
// 展示模态框中的表单
const showModal = (record) => {
  // 有记录就是编辑
  if (record.id) {
    visible.value = true;
    // 更新表单数据
    formState.value = { ...record };
    // outerRecord = record;
    pageImg.value = [];
    posterImg.value = [];
    pageImg.value.push({
      uid: '',
      name: '',
      url: formState.value.proPageImg,
    });
    posterImg.value.push({
      uid: '',
      name: '',
      url: formState.value.posters,
    });
    return;
  }
  // 没有记录就是新增
  // 先清空或者重构
  formState.value = { ...currentData[0] };
  resetFormState();
  pageImg.value = [];
  posterImg.value = [];
  visible.value = true;
};

/**---------------------------------------模态框-表单中的图片上传--------------------------------------------------**/
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const imgHandleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
// 转base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
// 自定义图片上传：返回值：url
const customProPageImgRequest = async (e) => {
  console.log('e', e);
  let base64Img = await getBase64(e.file);
  let imgbase64 = base64Img.split(',')[1];
  let data = {
    base64Data: imgbase64,
    witch: 1,
  };
  uploadImg(data).then((res) => {
    e.onProgress({ percent: 100 });
    e.file.url = res[0];
    e.onSuccess(res[0], e);
  });
};
const customPostersRequest = async (e) => {
  console.log('e', e);
  console.log('e', e);
  let base64Img = await getBase64(e.file);
  let imgbase64 = base64Img.split(',')[1];
  let data = {
    base64Data: imgbase64,
    witch: 0,
  };
  uploadImg(data).then((res) => {
    e.onProgress({ percent: 100 });
    e.file.url = res[0];
    e.onSuccess(res[0], e);
  });
};
const openJourney = ref(false);
const goJourney = () => {
  openJourney.value = true;
};
const closeJourney = (e) => {
  console.log(e);
  openJourney.value = false;
};
const openBatch = ref(false);
const goBatch = () => {
  openBatch.value = true;
};

const closeBatch = (e) => {
  console.log(e);
  openBatch.value = false;
};
/**---------------------------------------调用日程价格组件--------------------------------------------------**/
const childRef = ref();
const getChild = () => {
  // 第三步： 调用子组件的方法或者变量，通过value
  childRef.value.commitSave();
};
const showBigModal = (key) => {
  open.value[key] = true;
};
const handleCancel = (key) => {
  open.value[key] = false;
};

/**---------------------------------------调用日程详情组件--------------------------------------------------**/
const ScheduleModal = ref();
const showScheduleModal = () => {
  ScheduleModal.value.showModal();
};

/**---------------------------------------调用推荐导游组件--------------------------------------------------**/
const GuideManageModal = ref();
const showGuideManageModal = () => {
  GuideManageModal.value.showModal();
};
/**---------------------------------------调用标签组件--------------------------------------------------**/
const showTag = ref();
const showTagModal = () => {
  setTimeout(() => {
    showTag.value.showModal();
  }, 150);
};
const showCharge = ref();
const showChargeModal = () => {
  showCharge.value.showModal();
};

/**---------------------------------------调用保险组件--------------------------------------------------**/


  const childRef2 = ref();
  const getChild2 = () => {
    // 第三步： 调用子组件的方法或者变量，通过value
    childRef2.value.commitSave();
  };
  const showBigModal2 = (key) => {
    open2.value[key] = true;
    console.log(open2.value)
  };
  const handleCancel2 = (key) => {
    open2.value[key] = false;
    console.log(open2)
  };
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
