<template>
    <div class="baodan">
        <table>
            <thead>
                <tr>
                <th>保险合同号码:{{table1.bxhthm}}</th>
                <th>保险合同生效日:{{table1.bxhtsxr}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td >被保险人:{{people1.name}}</td>
                <td >投保年龄:{{people1.age}}</td>
                <td >性别:{{people1.sex}}</td>
                </tr>
                <tr>
                <td >证件号码:{{people1.id}}</td>
                <td >出生日期:{{people1.birth}}</td>
                </tr>
                <tr>
                <td >投保人:{{people2.name}}</td>
                <td >投保年龄:{{people2.age}}</td>
                <td >性别:{{people2.sex}}</td>
                </tr>
                <tr>
                <td >证件号码:{{people2.id}}</td>
                <td>table1</td>
                </tr>
            </tbody>
            
        </table>
        <div class="tip">温馨提醒:{{table1.tip}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            people1: this.table1.people1,
            people2: this.table1.people2,
        }
    },
    props: ['table1'],
    // props: {
    //     table1: null
    // }, 
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
