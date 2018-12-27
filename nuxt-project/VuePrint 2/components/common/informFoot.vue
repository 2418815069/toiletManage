<template>
    <div class="footdiv">
        <div>投保人姓名：{{username}}</div>
        <div>保单编号：{{id}}</div>
    </div>
</template>
<script>
export default {
    props:['username','id']
}
</script>

<style scoped>
.footdiv{
    margin-top: 0.08cm;
    border-top: 0.02cm dashed black;
    padding-top: 0.5cm;
}
.footdiv>div{
    display: inline-block;
    margin-right: 4cm;
}
</style>
