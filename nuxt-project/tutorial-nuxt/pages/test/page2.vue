<template>
    <div class="container">
    <a4-page>
      <template slot="header">
        <belstar maintitle="百星安康宝年金保险条款" smalltitle="BEIJING BELSTAR" title="保险单">
          <template slot="company">
            <h1>Company</h1>
          </template>
        </belstar>
      </template>
      <template slot="main1">
        <div class="aaa1">
          <insurance></insurance>
        <contact class="contact"></contact>
        </div>
      </template>
      <template slot="footer">
        <my-footer page="3" totelPage="30" printData="2017/05/23">
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
    import belstar from '@/components/belstar.vue'
    import insurance from '@/components/Pages2/Insurance.vue'
    import myMixin from '../../static/myMixin.js'
    import contact from '@/components/contact.vue' 
    export default {
        components: {
            a4Page,
            myFooter,
            belstar,
            insurance,
            contact
        },
        mixins: [myMixin]
    }
</script>
<style scoped>
.contact{
    position: absolute;
    bottom: 5px;
    left: 5px;
    margin-top: 60px;
}
</style>
