<template>
    <div class="baodan" v-if="tabledata">
        <table>
            <thead>
                <tr>
                <th>保险合同年度</th>
                <th>第一年</th>
                <th>第二年</th>
                <th>第三年</th>
                <th>第四年</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td >部分领取手续费率</td>
                <td >{{tabledata.one}}</td>
                <td >{{tabledata.two}}</td>
                <td >{{tabledata.three}}</td>
                <td >{{tabledata.four}}</td>
                </tr>
            </tbody>
            
        </table>
    </div>
</template>
<script>
export default {
    props: {
        tabledata: {
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
    height: 25px;
    font-size: 14px;
}
</style>
