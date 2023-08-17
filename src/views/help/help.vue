<template>
  <div>
    <a-button type="primary" style="margin: 5px 5px" @click="handleAdd">添加帮助中心问题</a-button>
    <a-button type="primary" danger style="width: 150px; margin: 5px 20px; float: right; margin-right: 10px" @click="commitSave">保存</a-button>
    <a-alert style="width: 100%; text-align: center; font-weight: bold; font-size: 15px" message="修改后请记得保存或确认" type="warning" closable />
    <a-table :data-source="dataSource" :columns="columns" bordered :pagination="ipagination" @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'questionTitle'">
          <div class="editable-cell">
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.key].questionTitle" @keyup.enter="save(record.key)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'answer'">
          <div>
            <div v-if="editableData2[record.key]">
              <a-textarea v-model:value="editableData2[record.key].answer" @keyup.enter="save2(record.key)" />
              <check-outlined @click="save2(record.key)" />
            </div>
            <div v-else>
              <span style="color: red">{{ text || ' ' }}</span>
              <edit-outlined @click="edit2(record.key)" />
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
  </div>
</template>

<script lang="ts" setup>
  import { computed, createVNode, onMounted, reactive, ref } from 'vue';
  import type { Ref, UnwrapRef } from 'vue';
  import { CheckOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { getPageList, SavePageList, DeleHelpById, AddHelpOne } from './api';
  import { message, Modal } from 'ant-design-vue';
  import { error } from 'console';

  interface HelpItem {
    id: string;
    key: string;
    questionTitle: string;
    answer: string;
  }

  interface Help {
    id: string;
    questionTitle: string;
    answer: string;
  }

  let counter = 0;
  let allStra = ref();
  let ipagination = ref();
  let pages = ref();
  const page = ref({
    pageNo: 1,
    pageSize: 10,
  });
  function getList() {
  const HelpList: Ref<HelpItem[]> = ref([]);
    getPageList(page.value).then((res) => {
      for (let i = 0; i < res.records.length; i++) {
        const item: HelpItem = {
          id: res.records[i].id,
          key: i.toString(),
          questionTitle: res.records[i].questionTitle,
          answer: res.records[i].answer,
        };
        HelpList.value.push(item);
      }
      pages.value = res.pages;
      allStra.value = res.total;
      var pagenation = {
        size: 'large',
        current: page.value.pageNo,
        total: allStra.value,
        pageSize: page.value.pageSize,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条';
        }, //展示每页第几条至第几条和总数
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: true, //是否可以快速跳转至某页
        showSizeChanger: true, //是否可以改变pageSize
      };
      dataSource.value  = HelpList.value
      ipagination.value = pagenation;
    });
  }

  getList();



  const handleTableChange = function (pagination, filters, sorter) {
    // console.log(allStra)
    // console.log(pagination)
    page.value.pageNo = pagination.current;
    page.value.pageSize = pagination.pageSize;
    ipagination.value = pagination;
    allStra.value = pagination.total;
    console.log(pagination);
    getList();
    console.log(dataSource.value);
  };

  const columns = [
    {
      title: '问题',
      dataIndex: 'questionTitle',
      width: '20%',
    },
    {
      title: '回答',
      dataIndex: 'answer',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
    },
  ];

  const dataSource: Ref<HelpItem[]> = ref([]);
  const editableData: UnwrapRef<Record<string, HelpItem>> = reactive({});
  const editableData2: UnwrapRef<Record<string, HelpItem>> = reactive({});

  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit2 = (key: string) => {
    editableData2[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const save = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
    delete editableData[key];
    // return false;
  };
  const save2 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData2[key]);
    delete editableData2[key];
  };

  const commitSave = () => {
    const help: Ref<Help[]> = ref([]);
    Modal.confirm({
      title: '确定要保存吗',
      icon: createVNode(ExclamationCircleOutlined),
      content: '保存修改的所有内容',
      onOk() {
        return new Promise((resolve, reject) => {
          dataSource.value.forEach((element) => {
            const helpOne = {
              id: element.id,
              questionTitle: element.questionTitle,
              answer: element.answer,
            };

            help.value.push(helpOne);
          });
          // console.log(help.value);
          SavePageList(help.value).then(() => {
            // getList2();
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

  const count = computed(() => dataSource.value.length);
  const handleAdd = () => {
    const help2 = {
      questionTitle: '',
      answer: '',
    };
    console.log(ipagination.value);
    if (ipagination.value.current == pages.value) {
      var newId: string;
      AddHelpOne(help2).then((res) => {
        // console.log(res);
        newId = res;
        const newData = {
          id: newId,
          key: `${count.value}`,
          questionTitle: '',
          answer: '',
        };
        dataSource.value.push(newData);
        console.log(newId);
        getList()
        // getList2();
      });
      // getList2()
    } else {
      message.error('请到最后一页添加');
    }
  };

  const onDelete = (key: string) => {
    // console.log(dataSource.value[key]);
    // console.log(dataSource.value[key].id);
    var param = {
      id: dataSource.value[key].id,
    };
    // console.log(param);
    DeleHelpById(param).then(() => {
      // console.log(res);
    });
    dataSource.value = dataSource.value.filter((item) => item.key !== key);
    dataSource.value.length - 1;
    console.log(dataSource.value.length)
    if(dataSource.value.length == 0){
      page.value.pageNo = page.value.pageNo - 1
    }
    getList()
    // console.log(dataSource.value);
  };
</script>

<style lang="less"></style>
