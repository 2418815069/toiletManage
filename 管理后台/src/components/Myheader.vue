<template>
	<div class="myhead">
		<div class="logo">
			<div><img src="../assets/logo.png" /></div>
			<h1>廊坊旅游公厕小程序管理后台6666</h1>
		</div>
		<div class="information">
			<span>管理员 <b>{{name}}</b> 欢迎你</span>
			<p class="exti">
				<img  src="../../static/assets/exit.png">
				<span v-on:click="exit">退出</span>
			</p>
		</div>   <!--个人信息-->
	</div>
</template>

<script>
export default {
  name: 'Myheader',
   data () {
    return {
    	name:"管理员"		
    }
   },
   methods:{
	exit(){
		this.axios.get('admin/exit')
		  .then(function (res) {
		  		if(res.data.result==1){
		  			window.location.href="/admin";
		  		}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		}
   }, 
   beforeMount:function(){
   		var self = this;
   		this.axios.get('admin/session')
		  .then(function (res) {
		  		if(res.data.result==1){
		  			self.name = res.data.name;
		  		}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
   }
}
</script>

<style>
.myhead{
	overflow: hidden;
}
.logo{
	float: left;
	
}
.logo div{
	float: left;
	text-align: center;
	width:200px;
	height:100px;
}
.logo img{
	height:100px;
}
 h1{
 	float: left;	
 	height: 100px;
 	line-height: 100px;
 	color:#fff;
 	letter-spacing: 1px;
 	margin: 0px;
 	font-weight: normal;
 	font-size:35px;
 }
 .information{
 	float: right;
 	height:100px;
 	font-size: 20px;
 }
 .information b{
 	font-size: 25px;
 	padding:0 5px;
 }
 .information .exti img{
 	width: 22px;
 	height:25px;
 	position: relative;
 	top:5px;
 	margin-right: 5px;
 }
 .information .exti{
 	display: inline-block;
 	margin: 0;
 	font-size: 20px;
 	height:100px;
 	margin-left: 20px;
 	margin-right: 30px;
 	line-height: 100px;
 }
  .information .exti span{
  	cursor: pointer;
  }
  .information .exti span:hover{
  	color:#c00;
  }
</style>