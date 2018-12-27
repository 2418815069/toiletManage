<template>
    <div class="insurance">
        <part1 :table1="alldata[0].table1" class="part"></part1> 
        <my-title  title="保险项目" subtitle="(货币单位:人民币元)"></my-title>
        <part2 :table2="alldata[0].table2" class="part"></part2>
        <my-title  title="身故保险金受益人资料"></my-title>
        <part3 :table3="alldata[0].table3" class="part"></part3>
    </div>
</template>
<script>
import part1 from './part1'
import part2 from './part2'
import part3 from './part3'
import myTitle from '../myTitle.vue' 
import alldata from '@/data/baodan.json'
export default {
    data(){
        return {
            alldata
        }
    },
    components: {
        part1,
        part2,
        part3,
        myTitle
    },
    mounted() {
        console.log(this.alldata);
    },
}
</script>
<style scoped>
/* .part{
    margin: 20px 0;
} */
</style>
