<template>
    <div>
        <a @click="showModalForm">{{ name }}</a>
        <a-modal v-model:visible="visible" :title="name" @ok="handleOk">
            <Form v-if="name === '编辑日程'" :id="id" ref="FormComponent"></Form>
        </a-modal>
    </div>
</template>
<script>
    import { ref, defineComponent, reactive, watch, } from 'vue';
    import Form from './Form.vue';

    export default defineComponent({
        props: ['name', 'id'],
        components: { Form },
        setup(props, context) {
            const visible = ref(false);
            const FormComponent = ref(null);

            const showModalForm = () => {
                visible.value = true;
            };

            const handleOk = () => {
                if (props.name === '编辑日程') {
                    // 子组件数据传给数据库
                    FormComponent.value.add()
                } else {
                    // pass
                }
                visible.value = false;
            };

            watch(visible, () => {
                if (!visible.value) {
                    if (props.name === '编辑日程') {
                        // 清空子组件数据
                        FormComponent.value.clear();
                    } else {
                        // pass
                    }
                }
            })

            return {
                showModalForm,
                visible,
                handleOk,
                FormComponent,
            };
        },
    });
</script>