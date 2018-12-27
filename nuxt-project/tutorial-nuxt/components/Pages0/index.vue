<template>
  <section>
    <div class="title head">
      <h2>{{this.feedback[0].title}}</h2>
    </div>
    <article>
      {{this.feedback[0].greet}}<br>
      <div class="content"  v-for="(item,index) in this.dataJsonStr" :key="`${index}`">{{item}}</div>
    </article>
  </section>
</template>

<script>
import feedback from '../../data/feedback.json'
export default {
  data(){
    return {
      feedback,
      dataJsonStr: null
    }
  },
  methods: {
    dealdata(){
      this.dataJsonStr = this.feedback[0].CHILDREN;
    }
  },
  mounted() {
    this.dealdata();
  },
}
</script>

<style  scoped>
section{
  margin: auto;
  border: 1px solid palegreen;
  position: relative;
}
.head{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: rgb(51, 51, 51);
}
article{
  font-size: 14px;
  padding:0 40px;
}
.content{
text-indent: 24px;
line-height: 30px;
}
.tiaoxma{
  position: absolute;
  bottom: 50px;
  right: 40px;
}

</style>
