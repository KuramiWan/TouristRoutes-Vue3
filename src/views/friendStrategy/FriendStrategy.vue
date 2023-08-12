<template>
  <a-button class="editable-add-btn" type="primary" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered :pagination="ipagination" @change="handleTableChange">
    <template #bodyCell="{ column, text, record }">
      <template v-if="['title', 'content', 'forwardCount', 'img', 'likeCount', 'userid'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">保存</a-typography-link>
            <a-popconfirm title="确认取消?" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">编辑</a>
          </span>
        </div>
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { getFriendStrategyList, updateFriendStrategy, deleteFriendStrategy, addFriendStrategy } from './friendStrategyApi';

const columns = [
  {
    title: '攻略标题',
    width: 180,
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: '攻略内容',
    width: 180,
    dataIndex: 'content',
    ellipsis: true,
  },
  {
    title: '转发数',
    dataIndex: 'forwardCount',
    width: 150,
  },
  {
    title: '攻略图片',
    dataIndex: 'img',
    width: 150,
    ellipsis: true,
  },
  {
    title: '点赞数',
    dataIndex: 'likeCount',
    width: 150, 
  },
  {
    title: '攻略用户id',
    dataIndex: 'userid',
    width: 150,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
  },
];
interface DataItem {
  key: string;
  title: string;
  content: string;
  forwardCount: string;
  userid: string;
  img: string;
  likeCount: string;
}
const data: DataItem[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     title: 'string',
//     content: 'string',
//     forwardCount: 'string',
//     userid: 'string',
//     img: 'string',
//     likeCount: 'string',
//   });
// }
let counter = 0;
let allStra = 0;
let ipagination;
const page = {
  pageNo: 1,
  pageSize: 10,
};
function getList() {
  getFriendStrategyList(page).then((res) => {
    dataSource.value = res.records;
    allStra = res.total;
    let pagination = {
      size: 'large',
      current: 1,
      total: allStra,
      pageSize: 10,
      showTotal: (total, range) => {
        return range[0] + '-' + range[1] + ' 共' + total + '条';
      }, //展示每页第几条至第几条和总数
      hideOnSinglePage: false, // 只有一页时是否隐藏分页器
      showQuickJumper: true, //是否可以快速跳转至某页
      showSizeChanger: true, //是否可以改变pageSize
    };
    ipagination =pagination
    // debugger
    dataSource.value.forEach((item) => {
      item.key = (counter++).toString();
    });
  });
}
function getList2() {
  getFriendStrategyList(page).then((res) => {
    dataSource.value = res.records;
    allStra = res.total;
    // debugger
    dataSource.value.forEach((item) => {
      item.key = (counter++).toString();
    });
  });
}

getList();


const handleTableChange = function (pagination, filters, sorter) {
  // console.log(allStra)
  // console.log(pagination)
  page.pageNo = pagination.current;
  page.pageSize = pagination.pageSize;
  ipagination = pagination;
  getList2();
};

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  console.log(editableData[key]);
};
const save = (key: string) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
  updateFriendStrategy(editableData[key]).then((res) => {
    console.log(res);
  });
  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};

const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  deleteFriendStrategy(dataSource[key].id);
};

const handleAdd = () => {
  const newData = {
    key: `${++counter}`,
    title: '',
    content: '',
    forwardCount: '',
    userid: '',
    img: '',
    likeCount: '',
  };
  dataSource.value.push(newData);
  // editableData[counter] = newData;
  addFriendStrategy(dataSource[counter]).then((res) => {
    console.log(res);
  });
};

// const columns = [
//   {
//     title: '攻略标题',
//     width: 180,
//     dataIndex: 'title',
//     key: 'title',
//     fixed: 'left',
//   },
//   {
//     title: '攻略内容',
//     width: 180,
//     dataIndex: 'content',
//     key: 'content',
//   },
//   {
//     title: '转发数',
//     dataIndex: 'forwardCount',
//     key: 'forwardCount',
//     width: 150,
//   },
//   {
//     title: '攻略图片',
//     dataIndex: 'img',
//     key: 'img',
//     width: 150,
//   },
//   {
//     title: '点赞数',
//     dataIndex: 'likeCount',
//     key: 'likeCount',
//     width: 150,
//   },
//   {
//     title: '攻略用户id',
//     dataIndex: 'userid',
//     key: 'userid',
//     width: 150,
//   },
//   {
//     title: '操作',
//     key: 'operation',
//     fixed: 'right',
//     width: 180,
//   },
// ];
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>

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
