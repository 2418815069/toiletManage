<template>
    <div class="baodan" v-if="tableright">
        <table>
            <thead>
                <tr>
                <th>保险</th>
                <th>保险年度末</th>
                <th>当年度基本</th>
                <th>减额交清</th>
                </tr>
                <tr>
                <th>年度/年龄</th>
                <th>现金价值</th>
                <th>保险金额</th>
                <th>基本保险金额</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in tableright" :key="index">
                <td >{{item.year}}/{{item.age}}</td>
                <td >{{item.xmoney}}</td>
                <td >{{item.bmoney}}</td>
                <td >{{item.fit}}</td>
                </tr>
                
            </tbody>
            
        </table>
    </div>
</template>
<script>
export default {
    props: {
        tableright: {
            type: Object,
            default: () => ({})
        }
    }, 
    mounted() {
        // console.log(this.table1)
    },
}
</script>

<style scoped>
.baodan{
    display: inline-block;
}
table{
    width: 290px;
    border: 1px solid black;
}
table th,td{
    text-align: left;
    font-size: 14px;
    font-weight: 400;
}
</style>
