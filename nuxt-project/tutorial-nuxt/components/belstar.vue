<template>
  <div class="belstardiv">
    <div class="title" style="width:3.9cm;background:yellow;">
      <h1>{{ maintitle }}</h1>
      <h3>{{ smalltitle }}</h3>
    </div>
    <div class="middle">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['maintitle', 'smalltitle','title']
  }
</script>

<style scoped>
  .container {
    padding: 20px;
    margin: auto;
    background-color: beige;
  }
  .title>h1{
      font-family: Arial, Helvetica, sans-serif;
      font-size: 32px;
  }
  .title{
      text-align: center;
  }
  .middle{
      text-align: center;
  }
</style>