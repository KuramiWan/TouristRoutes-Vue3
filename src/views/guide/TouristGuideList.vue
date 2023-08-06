<template>
  <div>
    <a-card>
      <a-button type="primary" style="margin-bottom: 10px">添加导游</a-button>
      <a-table bordered sticky :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
        <template #bodyCell="{ column, record }">
          <!-- 操作单元格 -->
          <template v-if="column.key === 'operation'">
            <a-space>
              <a @click="showModal(record)">编辑</a>
              <a @click="showDeleteConfirm(record)">删除</a>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent> 更多操作 <DownOutlined /> </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a>带队产品</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
          <!-- 显示图片 -->
          <template v-else-if="column.dataIndex === 'avatar'">
            <img style="width: 100%; height: 100%" :src="record[column.dataIndex]" />
          </template>
          <template v-else-if="column.key === 'greatSpots'">
            <span>
              <a-tag v-for="tag in record.greatSpots" :key="tag" color="green">
                {{ tag }}
              </a-tag>
            </span>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import type { Ref } from 'vue';
  import { getGuideList } from './api/index';

  export default defineComponent({
    components: {
      DownOutlined,
    },
    setup() {
      const columns = ref<TableColumnsType>([
        {
          title: '头像',
          width: 100,
          dataIndex: 'avatar',
          fixed: 'left',
          ellipsis: true,
          align: 'center',
        },
        {
          title: '姓名',
          width: 100,
          dataIndex: 'name',
          fixed: 'left',
          align: 'center',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width: 150,
          align: 'center',
        },
        {
          title: '祖籍',
          dataIndex: 'descent',
          width: 150,
          align: 'center',
        },
        {
          title: '从业年限',
          dataIndex: 'employmentTime',
          width: 150,
          align: 'center',
        },
        {
          title: '瀑布摘要',
          dataIndex: 'summary',
          width: 150,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '擅长景点',
          dataIndex: 'greatSpots',
          key: 'greatSpots',
          width: 250,
          align: 'center',
        },
        {
          title: '个人介绍',
          dataIndex: 'introduction',
          width: 150,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '从业资质',
          dataIndex: 'qualifications',
          width: 150,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '头衔',
          dataIndex: 'honor',
          width: 150,
          align: 'center',
        },
        {
          title: '点赞数量',
          dataIndex: 'likeNum',
          width: 150,
          align: 'center',
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 180,
        },
      ]);

      interface DataItem {
        id: string;
        name: string;
        age: string;
        sex: string;
        descent: string;
        employmentTime: string;
        summary: string;
        greatSpots: [];
        introduction: string;
        qualifications: string;
        honor: string;
        likeNum: string;
      }

      let data: Ref<DataItem[]> = ref([]);

      const getAllGuideList = async () => {
        let params = {
          pageNo: 1,
          pageSize: 10,
        };
        const res = await getGuideList(params);
        console.log('res==', res);
        data.value = res.records;
        console.log('data.value==', data.value);
      };
      getAllGuideList();

      return {
        data,
        columns,
        fixedTop: ref(false),
        getGuideList,
        getAllGuideList,
      };
    },
  });
</script>
<style>
  #components-table-demo-summary tfoot th,
  #components-table-demo-summary tfoot td {
    background: #fafafa;
  }
  [data-theme='dark'] #components-table-demo-summary tfoot th,
  [data-theme='dark'] #components-table-demo-summary tfoot td {
    background: #1d1d1d;
  }
</style>
