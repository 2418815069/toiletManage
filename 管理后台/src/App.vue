<template>
  <div id="app">
  	<el-container>
		  <el-header style="height:100px;">
		  		<my-header></my-header>
		  </el-header>
		  <el-container :style="curHeight">
		    <el-aside width="200px" >
		    		<el-row class="tac">
		    			<el-col :span="24">
						    <el-menu
						      :default-active="defaultUrl[1]"
						      class="el-menu-vertical-demo"
						      background-color="#333"
						      text-color="#fff"
						      active-text-color="#7fff81"
						      >
						    	<!--<el-menu-item index="index1"  v-on:click="RouTer1">
						        <span slot="title" 	>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
						      </el-menu-item>-->
						      <el-menu-item index="index3" v-on:click="RouTer3">
						        <span slot="title" style="letter-spacing: 2px;">厕所管理</span>
						      </el-menu-item>
						      <el-menu-item index="index2"  v-on:click="RouTer2">
						        <span slot="title" style="letter-spacing: 2px;">智慧报修</span>
						      </el-menu-item>
						      <el-menu-item index="index5"  v-on:click="RouTer5">
						        <span slot="title" style="letter-spacing: 2px;">智慧评价</span>
						      </el-menu-item>
						      <el-menu-item index="index4" v-on:click="RouTer4">
						        <span slot="title" style="letter-spacing: 2px;">参数设置</span>
						      </el-menu-item>
						    </el-menu>
						  </el-col>
						</el-row>
		    </el-aside>
		    <el-main style="padding:0;"><router-view></router-view></el-main>
		  </el-container>
		</el-container>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
  //引入axios
import axios from 'axios'
export default {
  name: 'App',
  data (){
  	return{
  		defaultUrl:'',
  		curHeight:{
　　　　　　height:''
　　　　}
  	}
  },
  mounted (){
  	this.defaultUrl = window.location.href.split('#/');
//	console.log(this.defaultUrl);
  	if(this.defaultUrl[1]==""){	
  		this.defaultUrl[1]="index3";
  	}
  },
  methods: {
//    RouTer1(){
//	      	this.$router.push({
//		         name: 'index1',
//		         query: {
//		         }
//		     });
//    },
      RouTer2(){
	      	this.$router.push({
		         name: 'index2',	
		         query: {
		         }
		     });
      },
      RouTer3(){
	      	this.$router.push({
		         name: 'index3',
		         query: {
		         }
		     });
      },
      RouTer4(){
	      	this.$router.push({
		         name: 'index4',
		         query: {
		         }
		     });
      },
       RouTer5(){
	      	this.$router.push({
		         name: 'index5',
		         query: {
		         }
		     });
      },
  	},
  components: { 
    	MyHeader
  },
   beforeMount(height) {
				this.curHeight.height=window.innerHeight-100+'px';
//				console.log(this.curHeight);
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}
 .el-header {
    background-color: #308bbf;
    color: #fff;
    line-height: 90px;
    font-size: 30px;
    padding:0 !important;			
    /*!autoprefixer:off*/
    background: #3396fB;
  }
  .el-aside {
    text-align: center;
    line-height: 200px;
    background-color:#333;
  }
  
  .el-main {
    color: #333;
    text-align: center;
    padding: 0;	
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-menu-item{
  	font-size: 18px !important;
  }
 /*//背景颜色*/
  .el-menu-item.is-active {
   background-color: #404040 !important;
}

.el-menu{
	border:0 !important;
}
</style>
