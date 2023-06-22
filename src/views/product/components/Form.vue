<template>
    <a-form :model="formDate" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="Day" name="date">
            <a-input v-model:value="formDate.date" type="Number" min="1" />
        </a-form-item>
        <a-form-item label="描述" name="journeyDayDec">
            <a-input v-model:value="formDate.journeyDayDec" />
        </a-form-item>
        <a-form-item label="标题" name="title">
            <a-input v-model:value="formDate.title" />
        </a-form-item>
    </a-form>
</template>
<script>
    import { defineComponent, reactive, ref } from 'vue';
    import { saveOrUpdate } from '../../journey_day/JourneyDay.api'
    export default defineComponent({
        props: ['id'],
        setup(props) {
            // console.log(props.id)
            let formDate = reactive({
                date: '',
                journeyDayDec: '',
                title: ''
            });
            const clear = () => {
                formDate.productId = ''
                formDate.date = ''
                formDate.journeyDayDec = ''
                formDate.title = ''
            }

            const add = () => {
                formDate.productId = props.id
                formDate.date = 'day' + formDate.date
                saveOrUpdate(formDate)
            }

            return {
                formDate,
                clear,
                add
            };
        },
    });
</script>