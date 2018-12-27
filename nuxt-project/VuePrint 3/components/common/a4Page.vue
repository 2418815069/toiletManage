<template>
  <section class="page" size="A4">
    <div class="content">
      <slot name="main1"></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: "a4Page"
  }
</script>

<style scoped>
  .page {
    background: white;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.1cm rgba(0,0,0,0.5);
    padding-right: 1.30cm;
    padding-left: 1.30cm;
    padding-top: 1.12cm;
  }
  .page[size="A4"] {
    width: 21cm;
    height: 29.7cm;
  }
  .content {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  @media print {
    body, .page {
      margin: 0;
      box-shadow: 0;
    }
  }
</style>
