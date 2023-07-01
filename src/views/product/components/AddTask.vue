<template>
    <div>
        <a @click="showModalForm">{{ name }}</a>
        <a-modal :forceRender="true" v-model:visible="visible" :title="name" @ok="handleOk">
            <Task :id="id" ref="TaskComponent"></Task>
        </a-modal>
    </div>
</template>
<script>
import { ref, defineComponent, reactive, watch, } from 'vue';
import Task from './Task.vue';

export default defineComponent({
    props: ['name', 'id'],
    components: { Task },
    setup(props, context) {
        const visible = ref(false);
        const TaskComponent = ref(null);

        const showModalForm = () => {
            visible.value = true;
            const journeyDays = TaskComponent.value.queryTask()
            // setTimeout(() => {
            // }, 1000);
        };

        const handleOk = () => {
            // 调用增加或编辑接口

            visible.value = false;
        };

        return {
            showModalForm,
            visible,
            handleOk,
            TaskComponent,
        };
    },
});
</script>