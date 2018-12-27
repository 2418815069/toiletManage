<template>
  <div class="container">
    <hr/>
    <div class="left">
      打印日期：{{ printData }}
    </div>
    <div class="right">
      <slot class="barcode" name="barcode"></slot>
    </div>
    <div class="middle">
      第{{ page }}頁/共{{ totelPage }}頁
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'page', 'totelPage', 'printData' ]
  }
</script>

<style scoped>
  .left {
    display: inline;
    float: left;
  }
  .right {
    display: inline;
    float: right;
  }
  .container {
    padding: 0;
  }
  .middle {
    text-align: center;
    width: 100%;
  }
</style>
