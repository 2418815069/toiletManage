<template>
    <div class="container">
    <a4-page>
      <template slot="main1">
        <div class="blank">本页空白</div>
      </template>
      <template slot="footer">
        <my-footer page="6" totelPage="30" printData="2018/09/27">
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
    import myMixin from '../../static/myMixin.js'
    export default {
        components: {
            a4Page,
            myFooter,
        },
        mixins: [myMixin]
    }
</script>

<style scoped>
.blank{
    font-size: 32px;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;

}
</style>
