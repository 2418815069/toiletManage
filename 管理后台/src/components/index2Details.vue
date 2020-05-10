<template>
	<div class="index">
		<div class="mask"><h4><b v-on:click="headline()">智慧报修</b> &nbsp;>&nbsp; 报修详情</h4></div>
		<div class="userinfo">
			<img :src="data[0].headphoto"  style="border-radius: 50%;"/>
			<span>来自微信用户 {{data[0].weixinName}}</span>
			<span>{{data[0].time}}</span>
		</div>
		<div class="main">
			<div class="site">
				<span>报修地点 ：</span>
				<div>
					<b>{{data[0].site=='undefined'?' ':data[0].site}}</b>
					<b>{{data[0].longitude}}，{{data[0].latitude}}</b>
				</div>
			</div>
			<div class="site">
				<span>报修选项 ：</span>
				<div>
					<b>{{data[0].RepairsPart.indexOf("*/*")==-1?data[0].RepairsPart:data[0].RepairsPart.split("*/*").join(" , ")}}</b>
				</div>
			</div>
			<div class="site">
				<span>文字描述 ：</span>
				<div>
					<b>{{data[0].description}}</b>
				</div>
			</div>
			<div class="picture">
				<span>图 &nbsp; &nbsp; &nbsp; 片 ：</span>
				<div>
					<b>
						<img  v-for="(item,index) in pictures"  v-on:click="picturesZZc(index)" :src='item'>
					</b>
				</div>
			</div>
			<div class="site">
				<span>状 &nbsp; &nbsp; &nbsp; 态 ：</span>
				<div>
					<b>{{data[0].tag=="未"?'未处理':'已处理'}}</b>
				</div>
			</div>
			
		</div>
		<el-button type="primary" plain class="save" v-on:click="save">更改状态</el-button>
		<el-button type="primary" plain class="save" v-on:click="getBack">返 &nbsp; &nbsp; &nbsp; 回</el-button>
		<div class="pictureZZC" v-show="pictureZZc">
				<p v-on:mouseover="leftFocus"  v-on:mouseout="leftFocus" style="position: absolute; height: 100%;width: 50%; left: 0;">
					<button v-on:click="prev" v-if="prevBloo" style="left: 0;"> 
						<span v-if="leftBloo" style="background: url(assets/arrow.png) no-repeat 0px 0px;"></span>
						<span  v-if="!leftBloo" style="background: url(assets/arrow.png) no-repeat -200px 0px;"></span>
					</button>
				</p>
				<img :src="pictures[pictureSrc]">
				<p v-on:mouseover="rightFocus" v-on:mouseout="rightFocus" style="position: absolute; height: 100%;width: 50%; right: 0;">
					<button v-on:click="next" v-if="nextBloo" style="right: 0;">
						<span v-if="rightBloo" style="background: url(assets/arrow.png) no-repeat -100px 0px;"></span>
						<span v-if="!rightBloo" style="background: url(assets/arrow.png) no-repeat -300px 0px;"></span>
					</button>
				</p>
				
				<i class="el-icon-circle-close" v-show="pictureZZc" v-on:click="delet()"></i>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'index2Details',
  	data () {
    	return {
    		data:[{
			    ID: 4,
			    RepairsPart: '坏',
			    time: '2018-12-01',
			    tag: '未',
			    name: '卫生间',
			    nameID: '49785',
			    site: '阿达速回复爱上',
			    description: '法国首都是愤怒是的符合',
			    picture: null,
			    headphoto: null,
			    weixinName: '军训',
			    longitude: '0213568624100',
			    latitude: '78565982210' 
    		} ],
    		pictures:[],
    		pictureSrc:1,
    		pictureZZc:false,
    		prevBloo: false,
    		nextBloo: false,
    		leftBloo:true,		//左显示
    		rightBloo:true		//右显示
    	}
	},
	methods:{
		getBack(){
			this.$router.push({
		         name: 'index2',
		         query: {
		         }
		     });
		},
		headline(){
			this.$router.push({
		         name: 'index2',
		         query: {
		         }
		     });
		},
		save(){
			var self =this;
			this.$confirm('确定更改状态', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	var selfL = this;
	          
	          if(self.data[0].tag=="未"){
					self.data[0].tag = "已";
				}else{
					self.data[0].tag = "未";
				}
		
			this.axios.post('admin/index2/save',{
      			save :self.data[0]
	      	})
	      	.then(function(res){
		  	  	 if(res.data.result==1){
				    selfL.$message({
			            type: 'success',
			            message: '更改成功!'
			          });
				  }
			  })
			  .catch(function (error) {
			   	 console.log(error);
			  });
			  
			  
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消更改'
	          });          
	        });
			
		},
		picturesZZc(item){
			  this.pictureSrc = parseInt(item);
			 if(this.pictureSrc == 0){
			 	this.prevBloo = false;
			 }else{
			 	this.prevBloo = true;
			 }
			 if(this.pictureSrc == this.pictures.length-1){
			 	this.nextBloo = false;
			 }else{
			 	this.nextBloo = true;
			 }
			 	this.pictureZZc = !this.pictureZZc;
		},
		prev(){
			var self = this;
			self.pictureSrc--;
			 if(self.pictureSrc == 0){
			 	self.prevBloo = false; 	
			 }else{
			 	self.prevBloo = true;
			 }
			 if(self.pictureSrc == self.pictures.length-1){
			 	self.nextBloo = false
			 }else{
			 	self.nextBloo = true;
			 }
			 
		},
		next(){
			var self = this;
			self.pictureSrc++;
			 if(self.pictureSrc == 0){
			 	self.prevBloo = false;
			 }else{
			 	self.prevBloo = true;
			 }
			 if(self.pictureSrc == this.pictures.length-1){
			 	self.nextBloo = false
			 }else{
			 	self.nextBloo = true;
			 }
			 
		},
		delet(){
  			this.pictureZZc = !this.pictureZZc;
  		},
  		leftFocus(){
  			this.leftBloo = !this.leftBloo;
  		},
  		rightFocus(){
  			this.rightBloo = !this.rightBloo;
  		}
	},
	created:function(){
   			var self=this;
   			
		 this.axios.post('admin/index2Details',{
		 	ID : this.$route.query.ID
		 })
	  	.then(function (res) {
	  	   if(res.data.result==1&&res.data.data!=[]){
	  	   		self.data = res.data.data;
	  	   		if(self.data[0].picture!=undefined&&self.data[0].picture!=""&&self.data[0].picture!=null){
	  	   			if(self.data[0].picture.indexOf("*/*")!=-1){
	  	   				self.pictures = self.data[0].picture.split("*/*");
	  	   			}else{
	  	   				self.pictures[0] = self.data[0].picture;
	  	   			}
	  	   			for(var i=0;i<self.pictures.length;i++){
	  	   				self.pictures[i]="assets/upimage/"+self.pictures[i];
	  	   			}
	  	   		}
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
</style>