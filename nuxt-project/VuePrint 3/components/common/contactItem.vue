<template>
    <div class="contactItem">
            <div class="sewm"></div>
            <div class="contact">
                <div>{{num}}</div>
                <div>{{address}}</div>
                <div>{{username}}</div>
            </div>
    </div>
</template>
<script>
export default {
    props:['address','num','username']
}
</script>

<style scoped>
.contactItem{
    height: 4.6cm;
    display: inline-block;
    width: 12cm;
    padding-left: 0.7cm;
    /* display: table-cell;
    vertical-align: middle; */
    display: flex;
    align-items: center;
}
.sewm{
    display: inline-block;
    width: 1.75cm;
    height: 1.75cm;
    background-color: yellowgreen;
}
.contact{
    display: inline-block;
    margin-left: 0.4cm;
    width: 7cm;
}

</style>
