<template>
    <div>
        <a4-page>
            <template slot="main1">
                <contact-item :username="dataJsonStr.username" :num="dataJsonStr.num"  :address="dataJsonStr.address"></contact-item>
                <div class="letter">
                    <letter></letter>
                    <letter-foot :company="dataJsonStr.company" :service="dataJsonStr.service"  :date="dataJsonStr.date"></letter-foot>
                    <div class="letterfont" style="padding: 0.5cm 0;">以下为您保单的信息：</div>
                </div>
                <inform-foot :username="dataJsonStr.username" :id="dataJsonStr.id"></inform-foot>
                <div class="letterfont tailnum">HO-POS-700-1665</div>
            </template>
        </a4-page>
         
    </div>
</template>
<script>
import letter from './letter'
import a4Page from '@/components/common/a4Page.vue'
import informFoot from '@/components/common/informFoot.vue'
import contactItem from '@/components/common/contactItem.vue'
import letterFoot from '@/components/common/letterFoot.vue'
import letter1 from '@/data/inform.json'
export default {
    data(){
        return{
            dataJsonStr: letter1[0].inform
        }
    },
    components: {
        a4Page,
        contactItem,
        letter,
        informFoot,
        letterFoot
    }
}
</script>
<style scoped>
.letter{
    padding-top: 1.15cm;
    border-top: 0.02cm dashed black;
    border-bottom: 0.02cm dashed black;
}
.tailnum{
    text-align:right;
    margin-top: 1.13cm;
}
</style>
