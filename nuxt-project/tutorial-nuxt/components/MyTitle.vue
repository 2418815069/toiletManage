<template>
  <div class="container">
    <div class="right">
      <h2>{{ subtitle }}</h2>
    </div>
    <div class="middle">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'subtitle']
  }
</script>

<style scoped>
  .container {
    padding: 0;
    background-color: #00D1D1;
    color: white;
  }
  .right {
    float: right;
  }
  .middle {
    text-align: center;
  }
</style>