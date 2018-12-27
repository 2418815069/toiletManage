<template>
  <div>
    <div class="container">
      <div class="left">
        <p>{{ title }}</p>
      </div>
      <div class="right">
        <slot name="company"></slot>
      </div>
    </div>
    <hr/>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style scoped>
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .container {
    padding: 0;
    overflow: hidden;
  }
</style>
