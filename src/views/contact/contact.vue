<template>
  <div>
    <a-card>
      <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="修改后记得保存" />
      <br />
      联系电话:<a-input placeholder="请输入联系电话" v-model:value="phone"></a-input>
      <br />
      联系地址:<a-textarea placeholder="请输入联系地址" v-model:value="address"></a-textarea>
      <br />
      地址坐标（经/纬度）：<a-input-group compact>
        <a-input style="width: 50%" type="number" placeholder="请输入经度" v-model:value="longitude" />
        <a-input style="width: 50%" type="number" placeholder="请输入纬度" v-model:value="latitude" />
      </a-input-group>
      <br />
      <a-alert message="如果需要地址经纬度请点击下方链接" type="warning" closable> </a-alert>
      <br />
      <div>
        <a href="https://lbs.qq.com/tool/getpoint/get-point.html" target="_blank">点击打开查询经纬度网页</a>
        <a-button style="float: right" type="primary" @click="save" :loading="iconLoading">保存</a-button>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import {  ref } from 'vue';
import { getContact, saveContact } from './api';

interface DelayLoading {
  delay: number;
}

let phone = ref<string>();
let address = ref<string>();
let longitude = ref<number>();
let latitude = ref<number>();
let id = ref<string>();
const iconLoading = ref<boolean | DelayLoading>(false);

getContact().then((res) => {
  phone.value = res.phone;
  address.value = res.contactAcdress;
  longitude.value = res.longitude;
  latitude.value = res.latitude;
  id.value = res.id;
});

console.log(phone);

const save = () => {
    let data = {
        id:id.value,
        phone:phone.value,
        contactAcdress:address.value,
        latitude:latitude.value,
        longitude:longitude.value
    }
    saveContact(data).then(res=>{
        console.log(res)
    })
//   iconLoading.value = { delay: 100 };
//   setTimeout(() => {
//     iconLoading.value = false;
//   }, 1000);
};
</script>