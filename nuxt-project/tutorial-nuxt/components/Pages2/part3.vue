<template>
    <div class="baodan">
        <table>
            <thead>
                <tr>
                <th>受益顺序</th>
                <th>受益人姓名</th>
                <th>证件号码</th>
                <th>是被保险人的(关系)</th>
                <th>受益份额</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in table3" :key="index">
                <td >{{item.order}}</td>
                <td >{{item.name}}</td>
                <td >{{item.id}}</td>
                <td >{{item.relate}}</td>
                <td >{{item.promise}}</td>
                </tr>
                
            </tbody>
            
        </table>
        <div class="tip">特别约定:{{table3.tip}}</div>
    </div>
</template>
<script>
export default {
    props: {
        table3: {
            type: Object,
            default: () => ({})
        }
    }, 
    
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
