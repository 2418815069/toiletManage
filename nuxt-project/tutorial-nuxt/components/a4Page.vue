<template>
  <section class="page" size="A4">
    <header>
      <slot name="header"></slot>
    </header>

    <div class="content">
      <slot name="main1"></slot>
    </div>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
  export default {
    name: "a4Page"
  }
</script>

<style>
  body {
    background: rgb(204,204,204);
  }
  .page {
    background: white;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    padding-right: 100px;
    padding-left: 100px;
    padding-top: 30px;
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
