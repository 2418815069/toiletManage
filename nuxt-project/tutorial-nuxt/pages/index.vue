<template>
  <section class="container">
    <div>
      <span class="test">宋体字型</span>
      <h1 class="title">
        users!
      </h1>
      <h2 class="subtitle">
        A web application to see users
      </h2>
    </div>
    {{users}}
    <div>
      <h2>Users</h2>
      <my-test :user="users"></my-test>
    </div>
    <div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import AppLogo from '../components/AppLogo.vue';
  import MyTest from  '../components/MyTest.vue';
  import { mapGetters } from 'vuex';

  export default {
    data:() => {
      return {

      }
    },
    components: {
      AppLogo,
      MyTest
    },
    computed: {
      users() {
        return this.$store.state.list;
      }
    },
    methods: {
      paintFixedWaterMark(workId) {
        let wrap = document.createElement("div");
        wrap.className = 'fixed-water-mark';
        let wm = document.createElement('canvas');
        wm.id = 'watermark';
        wm.width = 100;
        wm.height = 80;
        wm.style.display = 'none';
        wrap.appendChild(wm);
        var rwm = document.createElement('canvas');
        rwm.id = 'repeat-watermark';
        wrap.appendChild(rwm);
        document.body.appendChild(wrap);

        let cw = document.getElementById('watermark');
        let ctx = cw.getContext('2d');
        ctx.clearRect(0, 0, 100, 80);
        ctx.font = "15px 黑体";
        ctx.rotate(-20 * Math.PI / 180);
        ctx.fillStyle = "rgba(100, 100, 100, 0.2)";
        ctx.fillText(workId, -10, 60);

        let crw = document.getElementById('repeat-watermark');
        crw.width = window.innerWidth;
        crw.height = window.innerHeight;

        let ctxr = crw.getContext('2d');
        ctxr.clearRect(0, 0, crw.width, crw.height);

        let pat = ctxr.createPattern(cw, 'repeat');
        ctxr.fillStyle = pat;
        ctxr.fillRect(0, 0, crw.width, crw.height);
      }
    },
    async fetch({ store }) {
      return store.dispatch('fetchUsers');
    },
    mounted() {
      this.paintFixedWaterMark('test');
    }
  }
</script>

<style>
  .fixed-water-mark {
     position: fixed;
     pointer-events: none;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     z-index: 1600;
  }
  .fixed-water-mark #watermark {
     text-align: center;
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     opacity: 0.4;
     margin: 0 auto;
  }
</style>
