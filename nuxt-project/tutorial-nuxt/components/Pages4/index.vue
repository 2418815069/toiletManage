<template>
    <div class="insurance">
        <div class="top">百星附加白金管家A款年金保险(万能型)(2016版)</div>
        <my-title  title="初始费用"></my-title>
        <div class="content">
            <div>投保人自主交纳保险费的初始费用收取比例为{{page4.init.item1}}。</div>
            <div>权益转入保险费的初始费用收取比例为{{page4.init.item2}}。</div>
        </div>
        <my-title  title="保单管理费(货币单位:人民币元)"></my-title>
        <div class="content">
            <div>保单管理费为{{page4.manage.item1}}。</div>
        </div>
        <my-title  title="部分领取手续费率"></my-title>
        <grid :tabledata="page4.table1"></grid> 
        <my-title  title="退保手续费率"></my-title>
        <grid :tabledata="page4.table2"></grid> 
        <div class="content">
            <!-- <div>{{page4}}</div> -->
            <div>本保险合同初始费用、保单管理费、部分领取手续费率及退保手续费率请以条款约定为准。</div>
        </div>
    </div>
</template>
<script>
import grid from './grid'
import myTitle from '../MyTitle.vue' 
import alldata from '../../data/pagedata.json'
export default {
    data(){
        return {
            page4: alldata[0].page4
        }
    },
    components: {
        grid,
        myTitle
    },
    mounted() {
        console.log(this.alldata);
    },
}
</script>
<style scoped>
.top{
    font-size: 14px;
    text-align: center;
    padding-bottom: 20px;
}
.content{
    margin: 20px 10px;
    padding-left: 15px;
}
</style>
