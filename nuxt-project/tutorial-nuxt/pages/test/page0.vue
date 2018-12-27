<template>
    <div class="container">
    <a4-page>
      <template slot="main1">
        <pages0>
        </pages0>
      </template>
      <template slot="footer">
        <my-footer page="1" totelPage="30" printData="2016/09/27">
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
    import myFooter from '../../components/MyFooter.vue'
    import pages0 from '../../components/Pages0/index.vue'
    import myMixin from '../../static/myMixin.js'
    export default {
        components: {
            a4Page,
            myFooter,
            pages0
        },
        mixins: [myMixin]
    }
</script>

<style>

</style>