<template>
    <div class="container">
    <a4-page>
      <template slot="main1" style="position: relative;">
        <pages3>
        </pages3>
      </template>
      <template slot="footer">
        <my-footer page="4" totelPage="30" printData="2017/09/23">
          <template slot="barcode">
            <h1>BarCode</h1>
          </template>
        </my-footer>
      </template>
    </a4-page>
  </div>
</template>

<script>
    import a4Page from '@/components/a4Page.vue'
    import myFooter from '@/components/Myfooter.vue'
    import pages3 from '@/components/Pages3/index.vue'
    import myMixin from '../../static/myMixin.js'
    export default {
        components: {
            a4Page,
            myFooter,
            pages3
        },
        mixins: [myMixin]
    }
</script>

<style>

</style>