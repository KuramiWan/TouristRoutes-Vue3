<template>
  <div>
    <a-button type="primary" style="margin: 5px 5px;" @click="handleAdd">添加日程</a-button>
    <a-button type="primary" danger style="width: 150px;margin: 5px 20px;float:right; margin-right: 10px;" @click="commitSave">保存</a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'date'">
          <div class="editable-cell">
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <input v-model="editableData[record.key].date" @keyup.enter="save(record.key)" type="date"/>
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'price'">
          <div>
            <div v-if="editableData2[record.key]" class="editable-cell-input-wrapper">
              <input v-model="editableData2[record.key].price" @keyup.enter="save2(record.key)" type="number"/>
              <check-outlined @click="save2(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || 0 }}元
              <edit-outlined @click="edit2(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'thatDay'">
          <div>
            <div v-if="editableData3[record.key]" class="editable-cell-input-wrapper">
              <input v-model="editableData3[record.key].thatDay" @keyup.enter="save3(record.key)" type="number"/>
              <check-outlined @click="save3(record.key)" />
            </div>
            <div v-else >
              <span style="color: red;" v-if="record.thatDay == record.maxMan">{{ text || 0 }}人</span>
              <span v-else>{{ text || 0 }}人</span>
              <edit-outlined @click="edit3(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'maxMan'">
          <div>
            <div v-if="editableData4[record.key]" >
              <input v-model="editableData4[record.key].maxMan" @keyup.enter="save4(record.key)" type="number"/>
              <check-outlined @click="save4(record.key)" />
            </div>
            <div v-else >
              <span style="color: red;" v-if="record.thatDay == record.maxMan">{{ text || 0 }}人</span>
              <span v-else>{{ text || 0 }}人</span>
              <edit-outlined @click="edit4(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除吗?"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <a-alert style="width: 100%;text-align: center;font-weight: bold;font-size: 15px;"
             message="修改后请记得保存或确认"
             type="warning"
             closable
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { message } from 'ant-design-vue';
import { CheckOutlined, EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { getDatePrice,deleteDatePrice,addDatePrice,updateDatePrice } from './api/api';
import { number, string } from 'vue-types';
import { error } from 'console';
// import axios from 'axios';

interface DataItem {
  id: string;
  key: string;
  date: string;
  price: number;
  thatDay: number;
  maxMan: number;
}

interface PriceDate{
  id:string;
  proId: string;
  pdDate: string;
  pdPrice: number;
  pdEnrollment: number;
  pdMaxMan: number;
}


const props = defineProps(['ProId'])

var params={
  proId : props.ProId
}
const datePrice : Ref<DataItem[]> = ref([])
onMounted(()=>{

  getDatePrice(params).then(res=>{
    console.log("===========",res)
    for(let i=0;i<res.length;i++){
      const item : DataItem = {
        id: res[i].id,
        key: i.toString(),
        date: res[i].pdDate,
        price: res[i].pdPrice,
        thatDay:res[i].pdEnrollment,
        maxMan:res[i].pdMaxMan
      }
      datePrice.value.push(item)
    }
    console.log(datePrice.value[0])
  })
})

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: '20%',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '当天报名人数(注：当天报名人数 <= 最多报名人数)',
    dataIndex: 'thatDay',
    width:"27%"
  },
  {
    title: '最多报名人数',
    dataIndex: 'maxMan',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '20%',
  },
];

const dataSource: Ref<DataItem[]> = datePrice;
const count = computed(() => dataSource.value.length);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
const editableData2: UnwrapRef<Record<string, DataItem>> = reactive({});
const editableData3: UnwrapRef<Record<string, DataItem>> = reactive({});
const editableData4: UnwrapRef<Record<string, DataItem>> = reactive({});


const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};

const edit2 = (key: string) => {
  editableData2[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};

const edit3 = (key: string) => {
  editableData3[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};

const edit4 = (key: string) => {
  editableData4[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};


const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  console.log(dataSource.value[key].date)
  console.log("ProId",props.ProId)
  delete editableData[key];
  // return false;
};
const save2 = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData2[key]);
  console.log(dataSource.value[key])
  delete editableData2[key];
};
const save3 = (key: string) => {
  const item = dataSource.value.filter(item => key === item.key)[0];
  if(editableData3[key].thatDay < 0 || item.maxMan < editableData3[key].thatDay){
    message.error("数据填写错误！！！")
    delete editableData3[key];
  }else{
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData3[key]);
    console.log(dataSource.value[key])
    delete editableData3[key]
  }


};
const save4 = (key: string) => {
  const item = dataSource.value.filter(item => key === item.key)[0];
  if(editableData4[key].maxMan < 0 || item.thatDay > editableData4[key].maxMan){
    message.error("数据填写错误！！！")
    delete editableData4[key];
  }else{
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData4[key]);
    console.log(dataSource.value[key])
    delete editableData4[key]
  }
};

const onDelete = (key: string) => {
  console.log(dataSource.value[key])
  console.log(dataSource.value[key].id)
  var param = {
    id : dataSource.value[key].id,
  }
  console.log(param)
  deleteDatePrice(param).then(res => {
    console.log(res)
  })
  dataSource.value = dataSource.value.filter(item => item.key !== key);
  dataSource.value.length - 1;
  getDatePrice(params)
  console.log(dataSource.value)
};

const handleAdd = () => {
  const iday = Date.now()
  const day = new Date(iday)
  const date =  day.toISOString().slice(0,10)
  const priceDate = {
    proId: params.proId,
    pdDate: date,
    pdPrice: 0,
    pdEnrollment: 0,
    pdMaxMan: 1,
  }

  var newId : string
  addDatePrice(priceDate).then(res=>{
    console.log(res)
    newId = res
    const newData = {
      id: newId,
      proId:params.proId,
      key: `${count.value}`,
      date: date,
      price: 0,
      thatDay:0,
      maxMan:1
    };
    dataSource.value.push(newData);
    console.log(dataSource.value)
  });
};

const priceDates: Ref<PriceDate[]> = ref([])
const commitSave = () => {

  Modal.confirm({
    title: '确定要保存吗',
    icon: createVNode(ExclamationCircleOutlined),
    content: '保存修改的所有内容',
    onOk() {
      return new Promise((resolve, reject) => {
        dataSource.value.forEach(element => {
          const priceDate = {
            id:element.id,
            proId: params.proId,
            pdDate: element.date,
            pdPrice: element.price,
            pdEnrollment: element.thatDay,
            pdMaxMan: element.maxMan,
          }
          priceDates.value.push(priceDate)
        });
        console.log(priceDates.value)
        updateDatePrice(priceDates.value).then(()=>{
          getDatePrice(params)
        })
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        return true;
      }).catch(() => console.log('错误'));
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {return false},
  });
}

</script>

<style lang="less">
</style>
