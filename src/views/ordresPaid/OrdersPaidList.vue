<template>
  <div>
    <a-card>
      <a-button type="primary" style="margin-bottom: 10px; margin-right: 10px" @click="showAddModal">添加导游</a-button>
      <a-input-search style="width: 200px" v-model:value="searchName" placeholder="输入名字搜索" enter-button @search="onSearchByName" />
      <!-- 编辑or添加模态框 -->
      <a-modal width="35%" v-model:visible="addVisible" title="添加导游" @ok="handleOkAdd">
        <div class="add-tourist">
          <a-form name="basic" :label-col="{ span: 3 }" :wrapper-col="{ span: 24 }">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游姓名" name="name">
                  <a-input v-model:value="addTourist.name" placeholder="请输入导游姓名" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游年龄" name="age">
                  <a-input-number v-model:value="addTourist.age" :min="18" :max="100" style="width: 100%" placeholder="请输入导游年龄" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游性别" name="sex">
                  <a-select ref="selectSex" v-model:value="addTourist.sex" placeholder="请选择导游性别">
                    <a-select-option value="男">男</a-select-option>
                    <a-select-option value="女">女</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游祖籍" name="descent">
                  <a-input v-model:value="addTourist.descent" placeholder="请输入导游祖籍" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游头像" name="avatar">
                  <a-upload v-model:file-list="addTourist.avatar" :customRequest="customRequest" list-type="picture-card" name="file">
                    <div v-if="addTourist.avatar.length < 1">
                      <plus-outlined />
                      <div style="margin-top: 8px">Upload</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="个人介绍" name="introduction">
                  <a-textarea v-model:value="addTourist.introduction" show-count :maxlength="150" placeholder="请输入个人介绍" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游头衔" name="honor">
                  <a-select ref="selectHonor" v-model:value="addTourist.honor" placeholder="请选择导游头衔">
                    <a-select-option value="金牌导游">金牌导游</a-select-option>
                    <a-select-option value="银牌导游">银牌导游</a-select-option>
                    <a-select-option value="铜牌导游">铜牌导游</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="从业年限" name="employmentTime">
                  <a-input-number v-model:value="addTourist.employmentTime" :min="0" :max="100" style="width: 96%" placeholder="请输入从业年限" />年
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="瀑布摘要" name="summary">
                  <a-textarea v-model:value="addTourist.summary" show-count :maxlength="150" placeholder="请输入瀑布摘要" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="擅长景点" name="greatSpots">
                  <a-input v-model:value="addTourist.greatSpots" placeholder="请输入擅长景点(每个地点以空格分割)" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="从业资质" name="qualifications">
                  <a-textarea v-model:value="addTourist.qualifications" show-count :maxlength="150" placeholder="请输入从业资质" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-modal>
      <!-- 查看详情模态框 -->
      <a-modal width="35%" v-model:visible="detailVisible" title="添加导游" @ok="cancelDetailModal">
        <div class="add-tourist">
          <a-form name="basic" :label-col="{ span: 3 }" :wrapper-col="{ span: 24 }">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游姓名" name="name">
                  <a-input disabled v-model:value="addTourist.name" placeholder="请输入导游姓名" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游年龄" name="age">
                  <a-input-number disabled v-model:value="addTourist.age" :min="18" :max="100" style="width: 100%" placeholder="请输入导游年龄" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游性别" name="sex">
                  <a-select disabled ref="selectSex" v-model:value="addTourist.sex" placeholder="请选择导游性别">
                    <a-select-option value="男">男</a-select-option>
                    <a-select-option value="女">女</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游祖籍" name="descent">
                  <a-input disabled v-model:value="addTourist.descent" placeholder="请输入导游祖籍" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游头像" name="avatar">
                  <a-upload disabled v-model:file-list="addTourist.avatar" :customRequest="customRequest" list-type="picture-card" name="file">
                    <div v-if="addTourist.avatar.length < 1">
                      <plus-outlined />
                      <div style="margin-top: 8px">Upload</div>
                    </div>
                  </a-upload>
                  <a-modal disabled :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="个人介绍" name="introduction">
                  <a-textarea disabled v-model:value="addTourist.introduction" show-count :maxlength="150" placeholder="请输入个人介绍" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="导游头衔" name="honor">
                  <a-select disabled ref="selectHonor" v-model:value="addTourist.honor" placeholder="请选择导游头衔">
                    <a-select-option value="金牌导游">金牌导游</a-select-option>
                    <a-select-option value="银牌导游">银牌导游</a-select-option>
                    <a-select-option value="铜牌导游">铜牌导游</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="从业年限" name="employmentTime">
                  <a-input-number
                    disabled
                    v-model:value="addTourist.employmentTime"
                    :min="0"
                    :max="100"
                    style="width: 96%"
                    placeholder="请输入从业年限"
                  />年
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="瀑布摘要" name="summary">
                  <a-textarea disabled v-model:value="addTourist.summary" show-count :maxlength="150" placeholder="请输入瀑布摘要" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="擅长景点" name="greatSpots">
                  <a-input disabled v-model:value="addTourist.greatSpots" placeholder="请输入擅长景点(每个地点以空格分割)" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="从业资质" name="qualifications">
                  <a-textarea disabled v-model:value="addTourist.qualifications" show-count :maxlength="150" placeholder="请输入从业资质" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-modal>
      <a-table :loading="loading" bordered :pagination="false" sticky :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
        <template #bodyCell="{ column, record }">
          <!-- 操作单元格 -->
          <template v-if="column.key === 'operation'">
            <a-space>
              <a @click="showEditGuide(record)">编辑</a>
              <a-popconfirm title="确定删除吗？" ok-text="确定" cancel-text="取消" @confirm="deleteGuide(record.id)">
                <a>删除</a>
              </a-popconfirm>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent> 更多操作 <DownOutlined /> </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a @click="showDetailModal(record)">查看详情</a>
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
      <a-pagination @change="changePage(current)" v-model:pageSize="pageSize" v-model:current="current" :total="pageTotal" style="margin-top: 15px" />
    </a-card>
  </div>
</template>
<script lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { DownOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import type { Ref } from 'vue';
  import { getGuideList, uploadGuideImg, addGuide, deleteGuideById, guideListByName } from './api/index';

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  export default defineComponent({
    components: {
      DownOutlined,
      PlusOutlined,
    },
    setup() {
      const loading = ref(false);
      // ---------------------------------------------分页配置-----------------------------------------------------------
      let current = ref(1);
      let pageSize = ref(5);
      let pageTotal = ref(5);

      function changePage(page) {
        console.log('page,pageSize', page, pageSize);
        current.value = page;
        getAllGuideList();
      }

      // ---------------------------------------------table查看数据-----------------------------------------------------------
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
          width: 150,
          dataIndex: 'name',
          fixed: 'left',
          align: 'center',
        },
        {
          title: '年龄',
          width: 100,
          dataIndex: 'age',
          align: 'center',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width: 100,
          align: 'center',
        },
        {
          title: '祖籍',
          dataIndex: 'descent',
          width: 100,
          align: 'center',
        },
        {
          title: '从业年限',
          dataIndex: 'employmentTime',
          width: 100,
          align: 'center',
        },
        {
          title: '瀑布摘要',
          dataIndex: 'summary',
          width: 350,
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
          width: 350,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '从业资质',
          dataIndex: 'qualifications',
          width: 350,
          ellipsis: true,
          align: 'center',
        },
        {
          title: '头衔',
          dataIndex: 'honor',
          width: 100,
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
        loading.value = true;
        let params = {
          pageNo: current.value,
          pageSize: pageSize.value,
        };
        const res = await getGuideList(params);
        console.log('res==', res);
        data.value = res.records;
        pageTotal.value = res.total;
        pageSize.value = res.size;
        console.log('pageTotal.value', pageTotal.value);
        console.log('pageSize.value', pageSize.value);
        console.log('data.value==', data.value);
        loading.value = false;
      };
      getAllGuideList();

      // ---------------------------------------------新增导游数据-----------------------------------------------------------
      // 新增导游对象
      const addTourist = ref<any>({
        name: '',
        age: '',
        sex: '',
        avatar: [],
        descent: '',
        employmentTime: '',
        summary: '',
        greatSpots: '',
        introduction: '',
        qualifications: '',
        honor: '',
      });

      const addVisible = ref<boolean>(false);

      const showAddModal = () => {
        // 重置添加对象为空
        addTourist.value = {
          name: '',
          age: '',
          sex: '',
          avatar: [],
          descent: '',
          employmentTime: '',
          summary: '',
          greatSpots: '',
          introduction: '',
          qualifications: '',
          honor: '',
        };
        addVisible.value = true;
      };

      // 判断新增导游对象是否为空
      function checkObjectProperties(obj) {
        for (let key in obj) {
          if (obj[key] === '' || (Array.isArray(obj[key]) && obj[key].length === 0)) {
            return false;
          }
        }
        return true;
      }

      // 点击确定新增or编辑导游
      const handleOkAdd = async () => {
        let data = { ...addTourist.value };
        // 有字段为空不允许添加
        if (!checkObjectProperties(addTourist.value)) {
          message.warning('请补充完整导游信息');
          return;
        }

        // 把擅长景点改为以空格分隔的数组
        console.log('addTourist.value.greatSpots.split()', addTourist.value.greatSpots.split(' '));
        data.greatSpots = addTourist.value.greatSpots.split(' ');
        // 改变导游对象的avatar属性的值
        data.avatar = addTourist.value.avatar[0].url;
        // 改变从业年限
        data.employmentTime = data.employmentTime + '年';
        // 调用添加接口
        await addGuide(data);
        getAllGuideList();
        // 关闭对话框
        addVisible.value = false;
      };

      const previewVisible = ref(false);
      const previewImage = ref('');
      const previewTitle = ref('');

      const handleCancel = () => {
        previewVisible.value = false;
        previewTitle.value = '';
      };

      // 自定义图片上传：返回值：url
      const customRequest = async (e) => {
        let base64Img = await getBase64(e.file);
        let imgbase64 = base64Img.split(',')[1];
        let data = {
          base64Img: imgbase64,
        };
        uploadGuideImg(data).then((res) => {
          e.onProgress({ percent: 100 });
          e.file.url = res[0];
          e.onSuccess(res[0], e);
          // fileList.value?.push([{}]);
          console.log(res[0]);
        });
      };

      // ---------------------------------------------删除导游数据-----------------------------------------------------------
      const deleteGuide = async (id) => {
        await deleteGuideById({ id });
        getAllGuideList();
      };

      // ---------------------------------------------编辑导游数据-----------------------------------------------------------
      let tempAvatar = [];
      let greatSpots = '';
      const showEditGuide = async (record) => {
        addTourist.value = { ...record };
        // 转换avatar
        tempAvatar = [];
        tempAvatar.push({
          url: record.avatar,
        });
        addTourist.value.avatar = tempAvatar;
        // 转化greatSpots
        greatSpots = '';
        record.greatSpots.forEach((i, index) => {
          if (index === 0) {
            greatSpots = i;
          } else {
            greatSpots = greatSpots + ' ' + i;
          }
        });
        addTourist.value.greatSpots = greatSpots;
        // 转化从业年限
        addTourist.value.employmentTime = record.employmentTime.split('年')[0];
        addVisible.value = true;
      };

      // ---------------------------------------------查看导游详情-----------------------------------------------------------
      const detailVisible = ref(false);

      function showDetailModal(record) {
        addTourist.value = { ...record };
        // 转换avatar
        tempAvatar = [];
        tempAvatar.push({
          url: record.avatar,
        });
        addTourist.value.avatar = tempAvatar;
        // 转化greatSpots
        greatSpots = '';
        record.greatSpots.forEach((i, index) => {
          if (index === 0) {
            greatSpots = i;
          } else {
            greatSpots = greatSpots + ' ' + i;
          }
        });
        addTourist.value.greatSpots = greatSpots;
        // 转化从业年限
        addTourist.value.employmentTime = record.employmentTime.split('年')[0];
        detailVisible.value = true;
      }

      function cancelDetailModal() {
        detailVisible.value = false;
      }

      // ---------------------------------------------根据名字模糊搜索-----------------------------------------------------------
      const searchName = ref(null);
      const onSearchByName = async () => {
        loading.value = true;
        console.log(searchName.value);
        let res = undefined;
        if (searchName.value === null) {
          res = await getGuideList({ name: searchName.value });
        } else {
          res = await guideListByName({ name: searchName.value });
        }
        data.value = res.records;
        pageTotal.value = res.total;
        pageSize.value = res.size;
        // 搜索完一次置空
        searchName.value = null;
        loading.value = false;
      };

      return {
        data,
        columns,
        current,
        pageSize,
        pageTotal,
        fixedTop: ref(false),
        addVisible,
        addTourist,
        previewVisible,
        previewImage,
        previewTitle,
        detailVisible,
        searchName,
        loading,
        getGuideList,
        getAllGuideList,
        onSearchByName,
        changePage,
        showAddModal,
        handleOkAdd,
        getBase64,
        handleCancel,
        customRequest,
        showEditGuide,
        deleteGuide,
        showDetailModal,
        cancelDetailModal,
      };
    },
  });
</script>
<style lang="less" scoped>
  #components-table-demo-summary tfoot th,
  #components-table-demo-summary tfoot td {
    background: #fafafa;
  }
  [data-theme='dark'] #components-table-demo-summary tfoot th,
  [data-theme='dark'] #components-table-demo-summary tfoot td {
    background: #1d1d1d;
  }

  .add-tourist {
    padding: 20px;
    height: 50vh;
    overflow-y: scroll;
  }
</style>
