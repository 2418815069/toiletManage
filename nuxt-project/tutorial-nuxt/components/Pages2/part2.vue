<template>
    <div class="baodan">
        <table>
            <thead>
                <tr>
                <th>险种名称</th>
                <th>基本保险金额</th>
                <th>每期保险费</th>
                <th>交费期满日</th>
                <th>合同期满日</th>
                <th>产品其他约定</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in table2" :key="index">
                <td >{{item.name}}</td>
                <td >{{item.jbmony}}</td>
                <td >{{item.mqmony}}</td>
                <td >{{item.id}}</td>
                <td >{{item.date1}}</td>
                <td >{{item.date2}}</td>
                <td >{{item.promise}}</td>
                </tr>
                
            </tbody>
            
        </table>
        <div class="tip">备注:{{table2.tip}}</div>
    </div>
</template>
<script>
export default {
    props: ['table2'], 
}
</script>

<style scoped>
table{
    border: 1px solid black;
}
table tr{
    padding: 0;
}
table th,td{
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    width: 300px;
}
.tip{
    margin-top: 10px;
    width: 100%;
    font-size: 14px;
}
</style>
