<template>
    <div class="container">
    <a4-page>
      <template slot="main1">
        <pages4>
        </pages4>
      </template>
      <template slot="footer">
        <my-footer page="5" totelPage="30" printData="2017/09/27">
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
    import pages4 from '../../components/Pages4/index.vue'
    import myMixin from '../../static/myMixin.js'
    export default {
        components: {
            a4Page,
            myFooter,
            pages4
        },
        mixins: [myMixin]
    }
</script>

<style>

</style>