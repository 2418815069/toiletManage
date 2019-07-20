<template>
	<div class="index">
		<div class="mask"><h4><b v-on:click="headline()">智慧评价</b> &nbsp;>&nbsp; 评价详情</h4></div>
		<div class="userinfo">
			<img :src="data[0].headphoto"  style="border-radius: 50%;"/>
			<span>来自微信用户 {{data[0].useranme}}</span>
			<span>{{data[0].time}}</span>
		</div>
		<div class="main">
			<div class="site">
				<span>评价地点 ：</span>
				<div>
					<b>{{data[0].site=='undefined'?' ':data[0].site}}</b>
				</div>
			</div>
			<div class="site">
				<span>评价选项 ：</span>
				<div>
					<b v-for="(item,key,index) in data[0].HealthStar">
						{{key}} : {{item}}
					</b>
				</div>
			</div>
			<div class="site">
				<span>用户评价 ：</span>
				<div>
					<b>{{data[0].evaluate}}</b>
				</div>
			</div>
		</div>
		<el-button type="primary" plain class="save" v-on:click="getBack">返 &nbsp; &nbsp; &nbsp; 回</el-button>
	</div>
	
</template>

<script>
export default {
	name: 'index5Details',
  	data () {
    	return {
    		data:[{
	 			ID:'1',
	 			useranme :'心',
	 			nameID : '',
	 			HealthStar:{
	 				'卫生':3,
	 				'气味':5
	 			},
	 			time:'2018',
	 			evaluate:'测试',
	 			headphoto:'',
	 			site:'北化航天工业学院',
	 			name:'卫生间'
	 		}]
    	}
	},
	methods:{
		getBack(){
			this.$router.push({
		         name: 'index5',
		         query: {
		         }
		     });
		},
		headline(){
			this.$router.push({
		         name: 'index5',
		         query: {
		         }
		     });
		}
	},
	created:function(){
   		var self=this;
		 this.axios.post('admin/index5Details',{
		 	ID : this.$route.query.ID
		 })
	  	.then(function (res) {
	  	   if(res.data.result==1&&res.data.data!=[]){
	  	   		self.data = res.data.data;
	  	  	}
	  })
	  .catch(function (error) {
	   	 	console.log(error);
	  });
  	}
}
</script>

<style>
	.index{
		padding:50px;
		color:#8048eb;
	}
	.mask{
		text-align: left;
		background-color:#fff;
		height:50px;
	}
	.mask b{
		font-weight: normal;
		cursor: pointer;
	}
	.mask h4{
		margin:0px;
	}
	.userinfo{
		height:80px;
		overflow: hidden;
		text-align: right;
	}
	.userinfo img{
		height:80px;
		margin-right: 100px;
		margin-left: 10px;
		float: right;
	}
	.userinfo span{
		height:80px;
		line-height: 80px;
		float: right;
		padding-right: 10px;
	}
	.main{
		text-align: left;
		padding-left:120px ;
		padding-bottom: 30px;
	}
	.main>div{
		overflow: hidden;
		font-size:18px;
		padding-bottom:10px;
	}
	.main>div span{
		float: left;
		width:200px;
	}
	.main>div>div{
		float: left;
	}
	.main>div>div b{
		font-weight: normal;
		padding-bottom:5px;
		height:24px;
		display: block;
	}
	.picture span{
		margin-bottom:20px ;
	}
	.picture b{
		height:150px !important;
		overflow: auto;
	}
	.picture img{
		height:140px;
		padding:0 10px;
	}
	.save{
		padding: 20px 30px;
		border-radius: 10px;
		font-size: 20px;
	}
	/*点击图片显示全图*/
	.pictureZZC{
		position: fixed;
		width:100%;
		height: 100%;
		background-color:rgba(0,0,0,0.5);
		top:0;
		left: 0;
	}
	.pictureZZC img{
		max-height: 80%;
		max-width: 80%;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.pictureZZC button{
		position: absolute;
		height: 50%;
		background-color:rgba(0,0,0,0.2);
		color:rgba(255,255,255,0.5);
		width:80px;
		text-align: center;
		top:50%;
		transform: translateY(-50%);
		border:0;
		font-size: 50px;
	}
	.pictureZZC button:hover{
		background-color:rgba(0,0,0,0.5);
		color:#fff;
	}
	.pictureZZC i{
		position: absolute;
		top:2%;
		right: 2%;
		font-size: 50px;
		color:#fff;
	}
	.pictureZZC i:hover{
		color:#c00;
	}
	.el-table thead{
		color: white !important;
	}
</style>