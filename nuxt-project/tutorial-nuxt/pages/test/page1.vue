<template>
    <div class="container">
    <a4-page>
      <template slot="header">
        <my-header title="百星安康宝年金保险条款">
          <template slot="company">
            <h1>Company</h1>
          </template>
          <my-title title="title" ></my-title>
        </my-header>
      </template>
      <template slot="footer">
        <my-footer page="2" totelPage="30" printData="2017/10/31">
          <template slot="barcode">
            <h1>BarCode</h1>
          </template>
        </my-footer>
      </template>
    </a4-page>
  </div>
</template>

<script>
    import a4Page from '../../components/a4Page.vue'
    import myFooter from '../../components/Myfooter.vue'
    import myHeader from '../../components/MyHeader.vue'
    import myTitle from '../../components/myTitle.vue'
    import myMixin from '../../static/myMixin.js'
    export default {
        components: {
            a4Page,
            myFooter,
            myHeader,
            myTitle
        },
        mixins: [myMixin]
  }
</script>

<style>

</style>