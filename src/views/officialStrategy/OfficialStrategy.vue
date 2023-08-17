<template>
  <div>
    <a-button type="primary" style="margin: 5px 5px" @click="handleAdd">添加官方攻略</a-button>
    <a-button type="primary" danger style="width: 150px; margin: 5px 20px; float: right; margin-right: 10px" @click="commitSave">保存</a-button>
    <a-alert
      style="width: 100%; text-align: center; font-weight: bold; font-size: 15px"
      message="修改后请记得保存或确认(有[]得写在里面)"
      type="warning"
      closable
    />
    <a-table :data-source="dataSource" :columns="columns" bordered :pagination="ipagination" @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'title'">
          <div class="editable-cell">
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-textarea v-model:value="editableData[record.key].title" @keyup.enter="save(record.key)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'tag'">
          <div>
            <div v-if="editableData2[record.key]">
              <a-textarea v-model:value="editableData2[record.key].tag" @keyup.enter="save2(record.key)" />
              <check-outlined @click="save2(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit2(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'locationAddress'">
          <div>
            <div v-if="editableData3[record.key]">
              <a-textarea v-model:value="editableData3[record.key].locationAddress" @keyup.enter="save3(record.key)" />
              <check-outlined @click="save3(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit3(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'locationTitle'">
          <div>
            <div v-if="editableData4[record.key]">
              <a-textarea v-model:value="editableData4[record.key].locationTitle" @keyup.enter="save4(record.key)" />
              <check-outlined @click="save4(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit4(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'locationDesc'">
          <div>
            <div v-if="editableData5[record.key]">
              <a-textarea v-model:value="editableData5[record.key].locationDesc" @keyup.enter="save5(record.key)" />
              <check-outlined @click="save5(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit5(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'locationHour'">
          <div>
            <div v-if="editableData6[record.key]">
              <a-textarea v-model:value="editableData6[record.key].locationHour" @keyup.enter="save6(record.key)" />
              <check-outlined @click="save6(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit6(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'views'">
          <div>
            <div v-if="editableData7[record.key]">
              <a-textarea v-model:value="editableData7[record.key].views" @keyup.enter="save7(record.key)" />
              <check-outlined @click="save7(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit7(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'days'">
          <div>
            <div v-if="editableData8[record.key]">
              <a-textarea v-model:value="editableData8[record.key].days" @keyup.enter="save8(record.key)" />
              <check-outlined @click="save8(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit8(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'locationCount'">
          <div>
            <div v-if="editableData9[record.key]">
              <a-textarea v-model:value="editableData9[record.key].locationCount" @keyup.enter="save9(record.key)" />
              <check-outlined @click="save9(record.key)" />
            </div>
            <div v-else>
              <text class="updateText"> {{ text || ' ' }} </text>
              <edit-outlined @click="edit9(record.key)" />
            </div>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'img'">
          <div>
            <!-- <div v-if="editableData10[record.key]"> -->
            <!-- <img style="width: 100%; height: 100%" :src="record[column.dataIndex]" /> -->
            <a-upload v-model:file-list="record[column.dataIndex]" :customRequest="customRequest" list-type="picture-card" name="file">
              <div v-if="record[column.dataIndex].length < 1">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
            <!-- <a-textarea v-model:value="editableData10[record.key].img" @keyup.enter="save10(record.key)" /> -->
            <!-- <check-outlined @click="save10(record.key)" /> -->
            <!-- </div> -->
            <!-- <div v-else> -->
            <!-- <edit-outlined @click="edit10(record.key)" /> -->
            <!-- </div> -->
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
  import { getPageList, DeleOff, AddOff, SavePageList } from './api';
  import { message, Modal } from 'ant-design-vue';
  import { uploadOfficialImg } from './api';

  interface OffItem {
    id: string;
    key: string;
    title: string;
    img: string;
    tag: string;
    locationAddress: string;
    locationTitle: string;
    locationDesc: string;
    days: number;
    locationHour: string;
    locationCount: number;
    views: number;
  }

  interface Off {
    id: string;
    title: string;
    img: string;
    tag: string;
    locationAddress: JSON;
    locationTitle: JSON;
    locationDesc: JSON;
    days: number;
    locationHour: JSON;
    locationCount: number;
    views: number;
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
    getPageList(page.value).then((res) => {
      const HelpList2: Ref<OffItem[]> = ref([]);
      for (let i = 0; i < res.records.length; i++) {
        let item1 = JSON.stringify(res.records[i].locationAddress);
        let item2 = JSON.stringify(res.records[i].locationTitle);
        let item3 = JSON.stringify(res.records[i].locationDesc);
        let item4 = JSON.stringify(res.records[i].locationHour);
        // let item2 = JSON.parse(item1)locationHour
        // console.log(res.records[i].locationAddress);
        // console.log(item2)
        const item: OffItem = {
          id: res.records[i].id,
          key: i.toString(),
          title: res.records[i].title,
          img: res.records[i].img,
          tag: res.records[i].tag,
          locationAddress: item1,
          locationTitle: item2,
          locationDesc: item3,
          days: res.records[i].days,
          locationHour: item4,
          locationCount: res.records[i].locationCount,
          views: res.records[i].views,
        };
        item.img = [
          {
            url: item.img,
          },
        ];
        HelpList2.value.push(item);
      }
      console.log('dataSource.value', dataSource.value);
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
      dataSource.value = HelpList2.value;
      ipagination.value = pagenation;
    });
  }

  getList();

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // 自定义图片上传：返回值：url
  const customRequest = async (e) => {
    let base64Img = await getBase64(e.file);
    let imgbase64 = base64Img.split(',')[1];
    let data = {
      base64Img: imgbase64,
    };
    uploadOfficialImg(data).then((res) => {
      e.onProgress({ percent: 100 });
      e.file.url = res[0];
      e.onSuccess(res[0], e);
      // fileList.value?.push([{}]);
      console.log(res[0]);
    });
  };

  function getList2() {
    getPageList(page.value).then((res) => {
      const HelpList2: Ref<OffItem[]> = ref([]);
      for (let i = 0; i < res.records.length; i++) {
        let item1 = JSON.stringify(res.records[i].locationAddress);
        let item2 = JSON.stringify(res.records[i].locationTitle);
        let item3 = JSON.stringify(res.records[i].locationDesc);
        let item4 = JSON.stringify(res.records[i].locationHour);
        // let item2 = JSON.parse(item1)locationHour
        // console.log(res.records[i].locationAddress);
        // console.log(item2)
        const item: OffItem = {
          id: res.records[i].id,
          key: i.toString(),
          title: res.records[i].title,
          img: res.records[i].img,
          tag: res.records[i].tag,
          locationAddress: item1,
          locationTitle: item2,
          locationDesc: item3,
          days: res.records[i].days,
          locationHour: item4,
          locationCount: res.records[i].locationCount,
          views: res.records[i].views,
        };
        HelpList2.value.push(item);
      }
      dataSource.value = HelpList2.value;
      pages.value = res.pages;
      // debugger
    });
  }

  const handleTableChange = function (pagination, filters, sorter) {
    // console.log(allStra)
    // console.log(pagination)
    page.value.pageNo = pagination.current;
    page.value.pageSize = pagination.pageSize;
    ipagination.value = pagination;
    allStra.value = pagination.total;
    // console.log(pagination);
    getList();
    console.log(dataSource.value);
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: '12%',
    },
    {
      title: '图片',
      dataIndex: 'img',
      ellipsis: true,
      align: 'center',
      width: 130,
    },
    {
      title: '标签',
      dataIndex: 'tag',
      ellipsis: true,
      width: '10%',
    },
    {
      title: '观光点地址',
      dataIndex: 'locationAddress',
      ellipsis: true,
      width: '12%',
    },
    {
      title: '观光点小标题',
      dataIndex: 'locationTitle',
      ellipsis: true,
      width: '12%',
    },
    {
      title: '观光点描述',
      dataIndex: 'locationDesc',
      ellipsis: true,
      width: '12%',
    },
    {
      title: '观光点推荐游玩小时数',
      dataIndex: 'locationHour',
      ellipsis: true,
      width: '9%',
    },
    {
      title: '游玩天数',
      dataIndex: 'days',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '观光点个数',
      dataIndex: 'locationCount',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '浏览数',
      dataIndex: 'views',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      ellipsis: true,
      width: '8%',
    },
  ];

  const dataSource: Ref<OffItem[]> = ref([]);
  const count = computed(() => dataSource.value.length);
  const editableData: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData2: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData3: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData4: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData5: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData6: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData7: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData8: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData9: UnwrapRef<Record<string, OffItem>> = reactive({});
  const editableData10: UnwrapRef<Record<string, OffItem>> = reactive({});

  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit2 = (key: string) => {
    editableData2[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit3 = (key: string) => {
    editableData3[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit4 = (key: string) => {
    editableData4[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit5 = (key: string) => {
    editableData5[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit6 = (key: string) => {
    editableData6[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit7 = (key: string) => {
    editableData7[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit8 = (key: string) => {
    editableData8[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit9 = (key: string) => {
    editableData9[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
  };

  const edit10 = (key: string) => {
    editableData10[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
    console.log('editableData10[key]', editableData10[key]);
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
  const save3 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData3[key]);
    delete editableData3[key];
    // return false;
  };
  const save4 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData4[key]);
    delete editableData4[key];
    // return false;
  };
  const save5 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData5[key]);
    delete editableData5[key];
    // return false;
  };
  const save6 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData6[key]);
    delete editableData6[key];
    // return false;
  };
  const save7 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData7[key]);
    delete editableData7[key];
    // return false;
  };
  const save8 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData8[key]);
    delete editableData8[key];
    // return false;
  };
  const save9 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData9[key]);
    delete editableData9[key];
    // return false;
  };
  const save10 = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData10[key]);
    delete editableData10[key];
    // return false;
  };

  const onDelete = (key: string) => {
    console.log(dataSource.value[key]);
    console.log(dataSource.value[key].id);
    var param = {
      id: dataSource.value[key].id,
    };
    console.log(param);
    DeleOff(param).then((res) => {
      console.log(res);
    });
    dataSource.value = dataSource.value.filter((item) => item.key !== key);
    dataSource.value.length - 1;
    console.log(dataSource.value);
    // if(dataSource.value.length == 0){
    //   page.value.pageNo = page.value.pageNo - 1
    // }
    // getList()
  };

  const handleAdd = () => {
    let item1 = JSON.parse('[]');
    let item2 = JSON.parse('[]');
    let item3 = JSON.parse('[]');
    let item4 = JSON.parse('[]');
    const off2 = {
      title: '',
      img: '',
      tag: '',
      locationAddress: item1,
      locationTitle: item2,
      locationDesc: item3,
      days: 0,
      locationHour: item4,
      locationCount: 0,
      views: 0,
    };
    console.log(ipagination.value);
    if (ipagination.value.current == pages.value) {
      var newId: string;
      AddOff(off2).then((res) => {
        // console.log(res);
        newId = res;
        const newOff = {
          id: newId,
          key: `${count.value}`,
          title: '',
          img: [],
          tag: '',
          locationAddress: '[]',
          locationTitle: '[]',
          locationDesc: '[]',
          days: 0,
          locationHour: '[]',
          locationCount: 0,
          views: 0,
        };

        dataSource.value.push(newOff);
        console.log(newId);
        getList()
        // getList2();
      });
      // getList2()
    } else {
      message.error('请到最后一页添加');
    }
  };

  const commitSave = () => {
    const off1: Ref<Off[]> = ref([]);
    Modal.confirm({
      title: '确定要保存吗',
      icon: createVNode(ExclamationCircleOutlined),
      content: '保存修改的所有内容',
      onOk() {
        return new Promise((resolve, reject) => {
          dataSource.value.forEach((element) => {
            let item1 = JSON.parse(element.locationAddress);
            let item2 = JSON.parse(element.locationTitle);
            let item3 = JSON.parse(element.locationDesc);
            let item4 = JSON.parse(element.locationHour);

            const offOne = {
              id: element.id,
              title: element.title,
              img: element.img,
              tag: element.tag,
              locationAddress: item1,
              locationTitle: item2,
              locationDesc: item3,
              days: element.days,
              locationHour: item4,
              locationCount: element.locationCount,
              views: element.views,
            };

            offOne.img = offOne.img[0].url;
            console.log('offOne.img', offOne.img);

            off1.value.push(offOne);
          });
          // console.log(help.value);
          SavePageList(off1.value).then(() => {
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
</script>

<style>
  .updateText {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    /* 设置显示的最大行数，根据需要进行调整 */
    /* text-overflow: ellipsis; */
    width: 100%;
    height: auto;
  }
</style>
