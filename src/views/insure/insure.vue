<template>
  <div>
    <a-button type="primary" style="margin: 5px 5px" @click="handleAdd">添加保险</a-button>
    <a-button type="primary" danger style="width: 150px; margin: 5px 20px; float: right; margin-right: 10px" @click="commitSave">保存</a-button>
    <a-table bordered :data-source="dataSource" :columns="columns" pagination="false">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'content'">
          <div class="editable-cell">
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.key].content" @keyup.enter="save(record.key)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'contentDetail'">
          <div>
            <div v-if="editableData2[record.key]" class="editable-cell-input-wrapper">
              <a-textarea v-model:value="editableData2[record.key].contentDetail" @keyup.enter="save2(record.key)" />
              <check-outlined @click="save2(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || '' }}
              <edit-outlined @click="edit2(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'price'">
          <div>
            <div v-if="editableData4[record.key]">
              <a-input v-model:value="editableData4[record.key].price" @keyup.enter="save4(record.key)" type="number" />
              <check-outlined @click="save4(record.key)" />
            </div>
            <div v-else>
              <span style="color: red">{{ text || 0 }}元</span>
              <edit-outlined @click="edit4(record.key)" />
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
    <a-alert style="width: 100%; text-align: center; font-weight: bold; font-size: 15px" message="修改后请记得保存或确认" type="warning" closable />
  </div>
</template>

<script lang="ts" setup>
import { computed, onActivated, onMounted, reactive, ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { message } from 'ant-design-vue';
import { CheckOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { GetInsureByProId, DeleteInsureById, AddInsureOne, UpdateInsureList } from './api';
import { active } from 'sortablejs';
// import axios from 'axios';

interface InsureItem {
  id: string;
  key: string;
  content: string;
  contentDetail: string;
  price: number;
}

interface Insure {
  id: string;
  proid: string;
  content: string;
  contentDetail: string;
  price: number;
}

const props = defineProps(['ProId']);

var params = {
  proId: props.ProId,
};
const Insures: Ref<InsureItem[]> = ref([]);
  onMounted(()=>{
  GetInsureByProId(params).then((res) => {
    console.log('=============', res);
    for (let i = 0; i < res.length; i++) {
      const item: InsureItem = {
        id: res[i].id,
        key: i.toString(),
        content: res[i].content,
        contentDetail: res[i].contentDetail,
        price: res[i].price,
      };
      Insures.value.push(item);
    }

  });
})

const columns = [
  {
    title: '保险标题',
    dataIndex: 'content',
    width: '25%',
  },
  {
    title: '保险内容',
    dataIndex: 'contentDetail',
    width: '55%',
  },
  {
    title: '保险价格',
    dataIndex: 'price',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

const dataSource: Ref<InsureItem[]> = Insures;
const count = computed(() => dataSource.value.length);
const editableData: UnwrapRef<Record<string, InsureItem>> = reactive({});
const editableData2: UnwrapRef<Record<string, InsureItem>> = reactive({});
const editableData4: UnwrapRef<Record<string, InsureItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
};

const edit2 = (key: string) => {
  editableData2[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
};

const edit4 = (key: string) => {
  editableData4[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
};

const save = (key: string) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
  console.log('ProId', props.ProId);
  delete editableData[key];
  // return false;
};
const save2 = (key: string) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData2[key]);
  console.log('ProId', props.ProId);
  delete editableData2[key];
};
const save4 = (key: string) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData4[key]);
  console.log('ProId', props.ProId);
  delete editableData4[key];
};

const onDelete = (key: string) => {
  console.log(dataSource.value[key]);
  console.log(dataSource.value[key].id);
  var param = {
    id: dataSource.value[key].id,
  };
  DeleteInsureById(param);
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  dataSource.value.length - 1;
  GetInsureByProId(params);
  console.log(dataSource.value);
};

const handleAdd = () => {
  const priceDate = {
    proid: params.proId,
    content: '',
    contentDetail: '',
    price: 1,
  };

  var newId: string;
  AddInsureOne(priceDate).then((res) => {
    console.log(res);
    newId = res;
    const newInsure = {
      id: newId,
      proId: params.proId,
      key: `${count.value}`,
      content: ' ',
      contentDetail: ' ',
      price: 1,
    };
    dataSource.value.push(newInsure);
    console.log(dataSource.value);
  });
};

const commitSave = () => {
  Modal.confirm({
    title: '确定要保存吗',
    icon: createVNode(ExclamationCircleOutlined),
    content: '保存修改的所有内容',
    onOk() {
      return new Promise((resolve, reject) => {
        const insures: Ref<Insure[]> = ref([]);
        dataSource.value.forEach((element) => {
          const insure = {
            id: element.id,
            proid: params.proId,
            content: element.content,
            contentDetail: element.contentDetail,
            price: element.price
          };
          insures.value.push(insure);
        });
        console.log(insures.value);
        UpdateInsureList(insures.value).then(() => {
          GetInsureByProId(params);
        });
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('错误'));
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {
      return false;
    },
  });
};
</script>

<style lang="less"></style>
