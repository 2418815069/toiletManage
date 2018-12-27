<template>
    <div>
        <div class="content">
        <my-title  title=" 保证价值表(百星安康宝年金保险)" subtitle="(货币单位:人民币元)"></my-title>
        <table-left :tableleft="alldata[0].tableLeft"></table-left>
        <table-right :tableright="alldata[0].tableRight"></table-right>
        </div>
        <div class="tip"> 备注:{{alldata[0].tip}}</div>
    </div>
</template>
<script>
import tableLeft from './tableLeft'
import tableRight from './tableRight'
import myTitle from '../myTitle.vue' 
import alldata from '@/data/baodan.json'
export default {
    data(){
        return {
            alldata
        }
    },
    components: {
        tableLeft,
        tableRight,
        myTitle
    }
}
</script>
<style scoped>
.content{
    overflow: hidden;
}
.tip{
    font-size: 12px;
    font-weight: bold;
    padding: 0 5px;
    width: 100%;
}
</style>
