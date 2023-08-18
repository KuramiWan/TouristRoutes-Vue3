<template>
  <div>
    <!-- 查看详情模态框 -->
    <a-modal width="100%" wrap-class-name="full-modal" v-model:visible="detailVisible" title="订单详情" @ok="cancelDetailModal">
      <div>
        <a-form name="basic" :label-col="{ span: 3 }" :wrapper-col="{ span: 24 }">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="订单号">
                <a-input v-model:value="ordersDetail.id" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="下单时间">
                <a-input v-model:value="ordersDetail.createTime" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="微信支付订单号">
                <a-input v-model:value="ordersDetail.transactionId" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="产品id">
                <a-input v-model:value="ordersDetail.product.id" />
              </a-form-item>
              <a-form-item label="产品标题">
                <a-input v-model:value="ordersDetail.product.proTitle" />
              </a-form-item>
              <a-form-item label="产品介绍">
                <a-input v-model:value="ordersDetail.product.proIntroduction" />
              </a-form-item>
              <a-form-item label="产品封面">
                <a-image width="10%" height="10%" :src="ordersDetail.product.proPageImg" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="出发日期">
                <a-input v-model:value="ordersDetail.dateStarted" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="结束日期">
                <a-input v-model:value="ordersDetail.dateClosed" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="套餐名称">
                <a-input v-model:value="ordersDetail.journeypackage.jpContent" />
              </a-form-item>
              <a-form-item label="成人价格">
                <a-input v-model:value="ordersDetail.journeypackage.jpPriceAdult" />
              </a-form-item>
              <a-form-item label="儿童价格">
                <a-input v-model:value="ordersDetail.journeypackage.jpPriceChild" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" v-if="ordersDetail.touristGuide !== null">
            <a-col :span="24">
              <a-form-item label="导游头像">
                <a-image width="10%" height="10%" :src="ordersDetail.touristGuide.avatar" />
              </a-form-item>
              <a-form-item label="导游id">
                <a-input v-model:value="ordersDetail.touristGuide.id" />
              </a-form-item>
              <a-form-item label="导游姓名">
                <a-input v-model:value="ordersDetail.touristGuide.name" />
              </a-form-item>
              <a-form-item label="导游年龄">
                <a-input v-model:value="ordersDetail.touristGuide.age" />
              </a-form-item>
              <a-form-item label="导游性别">
                <a-input v-model:value="ordersDetail.touristGuide.sex" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="用户openid">
                <a-input v-model:value="ordersDetail.userinfo.openid" />
              </a-form-item>
              <a-form-item label="用户头像">
                <a-image width="10%" height="10%" :src="ordersDetail.userinfo.avatar" />
              </a-form-item>
              <a-form-item label="用户姓名">
                <a-input v-model:value="ordersDetail.userinfo.username" />
              </a-form-item>
              <a-form-item label="用户手机号">
                <a-input v-model:value="ordersDetail.userinfo.phone" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="联系人姓名">
                <a-input v-model:value="ordersDetail.contactName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="联系人手机号">
                <a-input v-model:value="ordersDetail.contactPhone" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" v-for="travleler in ordersDetail.travellers" :key="travleler.id">
              <a-form-item label="出行人id">
                <a-input v-model:value="travleler.id" />
              </a-form-item>
              <a-form-item label="出行人姓名">
                <a-input v-model:value="travleler.realName" />
              </a-form-item>
              <a-form-item label="出行人手机号">
                <a-input v-model:value="travleler.phone" />
              </a-form-item>
              <a-form-item label="出行人性别">
                <a-input v-model:value="travleler.gender" />
              </a-form-item>
              <a-form-item label="出行人生日">
                <a-input v-model:value="travleler.birthday" />
              </a-form-item>
              <a-form-item label="出行人类型">
                <a-input v-model:value="travleler.type" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="成人个数">
                <a-input v-model:value="ordersDetail.adultCount" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="儿童个数">
                <a-input v-model:value="ordersDetail.childrenCount" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="支付金额">
                <a-input v-model:value="ordersDetail.paidMoney" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="支付方式">
                <a-input v-model:value="ordersDetail.paidMethod" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" v-if="ordersDetail.insures !== null">
            <a-col :span="24" v-for="(insure, index) in ordersDetail.insures" :key="index">
              <a-form-item label="保险名称">
                <a-input v-model:value="insure.content" />
              </a-form-item>
              <a-form-item label="保险价格">
                <a-input v-model:value="insure.price" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="订单备注">
                <a-textarea v-model:value="ordersDetail.note" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="订单状态">
                <a-input v-if="ordersDetail.status == 1" value="待确认" />
                <a-input v-else-if="ordersDetail.status == 2" value="待出行" />
                <a-input v-else-if="ordersDetail.status == 3" value="已结束" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
    <a-card>
      <a-input-search
        style="width: 200px; margin-bottom: 10px"
        v-model:value="searchName"
        placeholder="输入订单号搜索"
        enter-button
        @search="onSearch"
      />
      <a-button type="primary" @click="getAllOrdersList">重置</a-button>
      <!-- 表格 -->
      <a-table :loading="loading" bordered :pagination="false" sticky :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
        <template #bodyCell="{ column, record }">
          <!-- 产品信息 -->
          <template v-if="column.dataIndex === 'product'">
            <span>
              <a-tag color="green">
                {{ record.product.proTitle }}
              </a-tag>
            </span>
          </template>
          <!-- 套餐信息 -->
          <template v-if="column.dataIndex === 'journeypackage'">
            <span>
              <a-tag color="green"> 套餐:{{ record.journeypackage.jpContent }} </a-tag>
            </span>
            <span>
              <a-tag color="green"> 成人:{{ record.journeypackage.jpPriceAdult }}元/人 </a-tag>
            </span>
            <span>
              <a-tag color="green"> 儿童:{{ record.journeypackage.jpPriceChild }}元/人 </a-tag>
            </span>
          </template>
          <!-- 导游信息 -->
          <template v-if="column.dataIndex === 'touristGuide' && record.touristGuide !== null">
            <span>
              <a-tag color="green"> 姓名:{{ record.touristGuide.name }} </a-tag>
            </span>
            <span>
              <a-tag color="green"> 年龄:{{ record.touristGuide.age }} </a-tag>
            </span>
            <span>
              <a-tag color="green"> 性别:{{ record.touristGuide.sex }} </a-tag>
            </span>
          </template>
          <!-- 用户信息 -->
          <template v-if="column.dataIndex === 'userinfo'">
            <!-- <span>
              <a-tag color="green"> openid:{{ record.userinfo.openid }} </a-tag>
            </span> -->
            <span>
              <a-tag color="green"> 昵称:{{ record.userinfo.username }} </a-tag>
            </span>
            <span v-if="record.userinfo.phone !== null">
              <a-tag color="green"> 电话:{{ record.userinfo.phone }} </a-tag>
            </span>
          </template>
          <!-- 出行人信息 -->
          <template v-if="column.dataIndex === 'travellers' && record.travellers[0] !== null">
            <div v-for="travleler in record.travellers" :key="travleler.id">
              <span>
                <a-tag color="green"> 姓名:{{ travleler.realName }} </a-tag>
              </span>
              <span>
                <a-tag color="green"> 电话:{{ travleler.phone }} </a-tag>
              </span>
              <span>
                <a-tag color="green"> 性别:{{ travleler.gender }} </a-tag>
              </span>
              <span>
                <a-tag color="green"> 类型:{{ travleler.type }} </a-tag>
              </span>
            </div>
          </template>
          <!-- 保险信息 -->
          <template v-if="column.dataIndex === 'insures' && record.insures[0] !== null">
            <div v-for="(insure, index) in record.insures" :key="index">
              <span>
                <a-tag color="green"> 保险:{{ insure.content }} </a-tag>
              </span>
              <span>
                <a-tag color="green"> 价格:{{ insure.price }}元/人 </a-tag>
              </span>
            </div>
          </template>
          <!-- 订单状态 -->
          <template v-if="column.dataIndex === 'status'">
            <span v-if="record.status == '1'">
              <a-tag color="warning"> 待确认 </a-tag>
            </span>
            <span v-if="record.status == '2'">
              <a-tag color="blue"> 待出行 </a-tag>
            </span>
            <span v-if="record.status == '3'">
              <a-tag color="success"> 已结束 </a-tag>
            </span>
          </template>
          <!-- 操作单元格 -->
          <template v-if="column.key === 'operation'">
            <a-space>
              <a @click="showDetailModal(record)">查看详情</a>
              <a-dropdown v-if="record.status !== 3">
                <a class="ant-dropdown-link" @click.prevent> 更多操作 <DownOutlined /> </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item v-if="record.status == '1'">
                      <a-popconfirm title="确定审核通过此订单吗？" ok-text="确定" cancel-text="取消" @confirm="toConfirmOrders(record.id)">
                        <a>审核订单</a>
                      </a-popconfirm>
                    </a-menu-item>
                    <a-menu-item v-if="record.status == '2'">
                      <a-popconfirm title="确定取消审核此订单吗？" ok-text="确定" cancel-text="取消" @confirm="toCancelConfirmed(record.id)">
                        <a>取消审核</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
        </template>
      </a-table>
      <a-pagination @change="changePage(current)" v-model:pageSize="pageSize" v-model:current="current" :total="pageTotal" style="margin-top: 15px" />
    </a-card>
  </div>
</template>
<script lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import type { Ref } from 'vue';
  import { getOrdersAllList, confirmOrders, cancelConfirmed, getSearch } from './api/index';

  export default defineComponent({
    components: { DownOutlined },
    setup() {
      const loading = ref(false);
      // ---------------------------------------------分页配置-----------------------------------------------------------
      let current = ref(1);
      let pageSize = ref(10);
      let pageTotal = ref(1);

      function changePage(page) {
        console.log('page,pageSize', page, pageSize);
        current.value = page;
        getAllOrdersList();
      }

      // ---------------------------------------------table查看数据-----------------------------------------------------------
      const columns = ref<TableColumnsType>([
        {
          title: '订单号',
          width: 200,
          dataIndex: 'id',
          fixed: 'left',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '下单时间',
          width: 200,
          dataIndex: 'createTime',
          fixed: 'left',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '微信支付订单号',
          width: 250,
          dataIndex: 'transactionId',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '产品信息',
          dataIndex: 'product',
          width: 300,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '出发日期',
          dataIndex: 'dateStarted',
          width: 200,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '结束日期',
          dataIndex: 'dateClosed',
          width: 200,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '套餐信息',
          dataIndex: 'journeypackage',
          width: 450,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '导游信息',
          dataIndex: 'touristGuide',
          // key: 'greatSpots',
          width: 250,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '用户信息',
          dataIndex: 'userinfo',
          width: 350,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '联系人姓名',
          dataIndex: 'contactName',
          width: 200,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '联系人手机号',
          dataIndex: 'contactPhone',
          width: 200,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '出行人信息',
          dataIndex: 'travellers',
          width: 550,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '成人个数',
          dataIndex: 'adultCount',
          width: 100,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '儿童个数',
          dataIndex: 'childrenCount',
          width: 100,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '支付金额',
          dataIndex: 'paidMoney',
          width: 150,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '支付方式',
          dataIndex: 'paidMethod',
          width: 150,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '保险信息',
          dataIndex: 'insures',
          width: 550,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '订单备注',
          dataIndex: 'note',
          width: 150,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          width: 100,
          ellipsis: true,
          fixed: 'right',
          align: 'center',
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          align: 'center',
          width: 180,
        },
      ]);

      interface Product {
        id: string;
        proTitle: string;
        proPageImg: string;
        proIntroduction: string;
      }

      interface JourneyPackage {
        jpContent: string;
        jpPriceAdult: number;
        jpPriceChild: number;
      }

      interface TouristGuide {
        id: string;
        name: string;
        age: string;
        sex: string;
        avatar: string;
      }

      interface Userinfo {
        openid: string;
        username: string;
        avatar: string;
        phone: string;
      }

      interface Traveler {
        id: string;
        realName: string;
        phone: string;
        gender: string;
        type: string;
        birthday: string;
      }

      interface Insure {
        content: string;
        price: string;
      }

      interface DataItem {
        id: string;
        createTime: string;
        transactionId: string;
        product: Product;
        dateStarted: string;
        dateClosed: string;
        journeypackage: JourneyPackage;
        touristGuide: TouristGuide;
        userinfo: Userinfo;
        contactName: string;
        contactPhone: string;
        travellers: Traveler[];
        adultCount: number;
        childrenCount: number;
        paidMoney: number;
        paidMethod: string;
        coupon: string;
        insures: Insure[];
        note: string;
        youxiabi: string;
        status: number;
      }

      let data: Ref<DataItem[]> = ref([]);

      const getAllOrdersList = async () => {
        loading.value = true;
        let params = {
          pageNo: current.value,
          pageSize: pageSize.value,
        };
        const res = await getOrdersAllList(params);
        console.log('res==', res);
        data.value = res.records;
        pageTotal.value = res.total;
        pageSize.value = res.size;
        console.log('pageTotal.value', pageTotal.value);
        console.log('pageSize.value', pageSize.value);
        console.log('data.value==', data.value);
        loading.value = false;
      };
      getAllOrdersList();

      // ---------------------------------------------审核待确认订单-----------------------------------------------------------
      const toConfirmOrders = async (id) => {
        await confirmOrders({ id });
        getAllOrdersList();
      };

      // ---------------------------------------------审核取消-----------------------------------------------------------
      const toCancelConfirmed = async (id) => {
        await cancelConfirmed({ id });
        getAllOrdersList();
      };

      // ---------------------------------------------查看订单详情-----------------------------------------------------------
      const detailVisible = ref(false);

      let ordersDetail = ref<DataItem>();
      const showDetailModal = (record) => {
        ordersDetail.value = { ...record };
        detailVisible.value = true;
      };

      // ---------------------------------------------根据订单号模糊搜索-----------------------------------------------------------
      const searchName = ref<string>();

      const onSearch = async () => {
        loading.value = true;
        const res = await getSearch({ keyword: searchName.value });
        data.value = res.records;
        pageTotal.value = res.total;
        pageSize.value = res.size;
        loading.value = false;
      };

      return {
        data,
        columns,
        current,
        pageSize,
        searchName,
        pageTotal,
        fixedTop: ref(false),
        loading,
        detailVisible,
        ordersDetail,
        onSearch,
        getAllOrdersList,
        changePage,
        toConfirmOrders,
        toCancelConfirmed,
        showDetailModal,
      };
    },
  });
</script>
<style lang="less">
  #components-table-demo-summary tfoot th,
  #components-table-demo-summary tfoot td {
    background: #fafafa;
  }
  [data-theme='dark'] #components-table-demo-summary tfoot th,
  [data-theme='dark'] #components-table-demo-summary tfoot td {
    background: #1d1d1d;
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
      overflow-y: scroll;
    }
    .ant-modal-body {
      flex: 1;
    }
  }
</style>
