<template>
  <a-drawer
    title="编辑"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="日程标题" name="schTitle">
            <a-input v-model:value="form.schTitle" placeholder="请输入日程标题" />
          </a-form-item>
        </a-col>
      </a-row>
      <template v-for="(task, index) in form.tasks" :key="task.id">
        <a-card style="margin-top: 20px">
          <a-card-grid style="width: 100%">
            <div class="delete-task">
              <a-popconfirm
                title="你确定要删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmTaskDelete(task.id, index)"
                @cancel="cancelTaskDelete"
              >
                <close-outlined />
              </a-popconfirm>
            </div>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-form-item label="任务标题" name="taskTitle">
                  <a-select ref="select" v-model:value="task.taskTitle" style="width: 100%" @focus="focus" @change="handleChange">
                    <a-select-option value="早餐">早餐</a-select-option>
                    <a-select-option value="午餐">午餐</a-select-option>
                    <a-select-option value="晚餐">晚餐</a-select-option>
                    <a-select-option value="交通">交通</a-select-option>
                    <a-select-option value="景点/场馆">景点/场馆</a-select-option>
                    <a-select-option value="酒店">酒店</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="任务详情" name="taskContent">
                  <a-input v-model:value="task.taskContent" placeholder="请输入任务详情" />
                </a-form-item>
                <a-form-item label="任务时间" name="taskDate"> <a-input v-model:value="task.taskDate" placeholder="请输入任务时间" /> </a-form-item>
                <a-form-item label="任务地点" name="taskAddress">
                  <a-input v-model:value="task.taskAddress" placeholder="请输入任务地点" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-form-item label="任务精选图片" name="taskImgs">
                  <template v-if="task.taskImgs !== null">
                    <div class="clearfix">
                      <a-upload
                        v-model:file-list="tasksImgsList[index]"
                        :customRequest="customRequest"
                        list-type="picture-card"
                        name="file"
                        @preview="handlePreview"
                        @change="uploadChange"
                      >
                        <template v-if="tasksImgsList[index] == undefined">
                          <plus-outlined />
                          <div style="margin-top: 8px">Upload</div>
                        </template>
                        <template v-else>
                          <div v-if="tasksImgsList[index].length < 5">
                            <plus-outlined />
                            <div style="margin-top: 8px">Upload</div>
                          </div>
                        </template>
                      </a-upload>
                      <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                      </a-modal>
                    </div>
                  </template>
                  <template v-else>
                    <a-upload
                      v-model:file-list="tasksImgsList[index]"
                      :customRequest="customRequest"
                      name="file"
                      list-type="picture-card"
                      @preview="handlePreview"
                      @remove="pictureRemove"
                    >
                      <template v-if="tasksImgsList[index] == undefined">
                        <plus-outlined />
                        <div style="margin-top: 8px">Upload</div>
                      </template>
                      <template v-else>
                        <div v-if="tasksImgsList[index].length < 5">
                          <plus-outlined />
                          <div style="margin-top: 8px">Upload</div>
                        </div>
                      </template>
                    </a-upload>
                  </template>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card-grid>
        </a-card>
      </template>
      <div class="add-task">
        <a-button type="primary" @click="addTask()"><plus-outlined />新增任务</a-button>
      </div>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="saveSchedule(form.schTitle)">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts">
  import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { andOrEditScheduleAndTask, deleteTask, uploadTaskImg } from '../api/index';
  import type { UploadProps } from 'ant-design-vue';

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  export default defineComponent({
    components: { PlusOutlined, CloseOutlined },
    props: ['editScheduleVisible', 'schedule'],
    emits: ['changeVisible'],
    setup(props, ctx) {
      const rules: Record<string, Rule[]> = {
        // schTitle: [{ required: true, message: '请输入日程标题' }],
        // taskContent: [{ required: true, message: '请输入任务详情' }],
        // taskDate: [{ required: true, message: '请输入任务时间' }],
      };

      const visible = ref<boolean>(props.editScheduleVisible);
      console.log('visible', visible);
      const onClose = () => {
        // tasksImgsList.value = [];
        visible.value = false;
        ctx.emit('changeVisible', visible.value);
      };

      const form = ref<any>(props.schedule);

      // 保存日程信息
      const saveSchedule = async (schTitle) => {
        form.value.schTitle = schTitle;
        console.log('form.value', form.value);
        // 根据更新的tasksImgsList，更新form表单数据
        // if(tasksImgsList.value !== null && )
        for (let i = 0; i < form.value.tasks.length; i++) {
          let tempArr = [];
          if (tasksImgsList.value[i] !== undefined) {
            tasksImgsList.value[i].forEach((img) => {
              tempArr.push(img.url);
            });
          }
          // console.log('iiiiii', i);
          form.value.tasks[i].taskImgs = tempArr;
        }

        console.log('form.value', form.value);
        await andOrEditScheduleAndTask(form.value);
        visible.value = false;
        ctx.emit('changeVisible', visible.value);
      };

      const previewVisible = ref(false);
      const previewImage = ref('');
      const previewTitle = ref('');

      const fileList = ref<UploadProps['fileList']>([
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
      ]);

      function uploadChange(res: any) {
        console.log('uploadChange', res);
      }

      function pictureRemove(e) {
        fileList.value?.pop();
        console.log('pictureRemove', e);
      }

      // 自定义图片上传：返回值：url
      const customRequest = async (e) => {
        console.log('e', e);
        let base64Img = await getBase64(e.file);
        let imgbase64 = base64Img.split(',')[1];
        let data = {
          base64Img: imgbase64,
        };
        uploadTaskImg(data).then((res) => {
          e.onProgress({ percent: 100 });
          e.file.url = res[0];
          e.onSuccess(res[0], e);
          fileList.value?.push([{}]);
          console.log('tasksImgsList.value', tasksImgsList.value);
        });
      };

      // 根据传来的任务图片数组构造一个新的数组以适应组件的功能
      const tasksImgsList = ref<any>([]);

      const handleCancel = () => {
        previewVisible.value = false;
        previewTitle.value = '';
      };
      const handlePreview = async (file: UploadProps['fileList'][number]) => {
        if (!file.url && !file.preview) {
          file.preview = (await getBase64(file.originFileObj)) as string;
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
        previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
      };

      const addTask = () => {
        form.value.tasks.push({
          id: '',
          proId: form.value.proId,
          schId: form.value.id,
          taskContent: null,
          taskDate: null,
          taskImgs: [],
          taskTitle: null,
        });
      };

      const confirmTaskDelete = async (id, index) => {
        if (id == '' || id == null) {
          form.value.tasks.splice(index, 1);
        } else {
          let data = {
            id: id,
          };
          const res = await deleteTask(data);
          console.log('delete res === ', res);
          form.value.tasks.splice(index, 1);
        }
      };

      return {
        rules,
        visible,
        form,
        onClose,
        saveSchedule,
        previewVisible,
        previewImage,
        fileList,
        handleCancel,
        handlePreview,
        previewTitle,
        addTask,
        confirmTaskDelete,
        tasksImgsList,
        uploadChange,
        customRequest,
        pictureRemove,
      };
    },
    watch: {
      editScheduleVisible(newValue) {
        // 更新存储每个task的图片的集合
        // console.log('newValue', newValue);
        this.visible = newValue;
      },
      schedule(newValue) {
        console.log('newValue', newValue);
        this.form = newValue;
        this.tasksImgsList = [];
        let tasks = newValue.tasks;
        const that = this;
        if (tasks != null && tasks.length !== 0) {
          for (let i = 0; i < tasks.length; i++) {
            that.tasksImgsList.push([]);
            if (tasks[i].taskImgs !== null) {
              let taskImgs = tasks[i].taskImgs;
              let tempArr = [];
              taskImgs.forEach((img, index) => {
                let tempImg = {
                  uid: '',
                  name: '',
                  status: '',
                  url: '',
                };
                // console.log('img', img);
                tempImg.url = img;
                // console.log('tempImg.url', tempImg.url);
                tempImg.uid = index;
                tempArr.push(tempImg);
              });
              that.tasksImgsList[i] = tempArr;
            } else {
              that.tasksImgsList[i] = [];
            }
          }
        }
        console.log('this.tasksImgsList', this.tasksImgsList);
      },
    },
  });
</script>
<style lang="less" scoped>
  .add-task {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 15px;
  }

  .delete-task {
    display: flex;
    justify-content: end;
    margin-right: 20px;
    color: red;
  }
</style>
