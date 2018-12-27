<template>
    <div class="bottomright letterfont">
        <div>{{company}}</div>
        <div>{{service}}</div>
        <div>{{date}}</div>
    </div>
</template>
<script>
export default {
    props:['company','service','date']
}
</script>
<style scoped>
.bottomright{
    text-align: right;
}
</style>
