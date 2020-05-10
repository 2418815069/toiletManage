<template>
	<div>
		<div class="index3Repair" v-for="item in data.slice(0,10)">
			<div class="RepairHead">
				<div class="RepairUser">
					<span>{{item.time}}</span>
					<span>来自微信用户  {{item.weixinName}}</span>
					<img :src="item.headphoto" />
				</div>
			</div>
			<p class="RepairMiaoshu">{{item.evaluate}}</p>
			<div class="RepairPictures">
				<p v-for="ite in Like(item.HealthStar)">{{ite}}</p>
			</div>
		</div>
		<!--<div class="pictureZZC" v-show="pictureZZc">
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
		</div>-->
		<div class="paging">
		 	<el-pagination
			  background
			  layout="prev, pager, next"
			  @current-change="pageLoad"
			  :total="page">
			</el-pagination>
		 </div>
	</div>
</template>

<script>
export default {
 	 name: 'Like',
 	 data (){
 	 	return{
 	 		page:1,
    		num:1,
 	 		data :[{
 	 			ID: 4,
//			    RepairsPart: '坏*/*哈哈',
			    HealthStar: '坏*/*哈哈',
			    time: '2018-12-01',
//			    tag: '未',
			    name: '卫生间',
			    nameID: '49785',
			    site: '阿达速回复爱上',
//			    description: '法国首都是愤怒是的符合',
			    evaluate: '法国首都是愤怒是的符合',
//			    picture: null,
			    headphoto: null,
			    weixinName: '军训',
//			    longitude: '0213568624100',
//			    latitude: '78565982210' 
 	 		}],
 	 		pictures:[],
 	 		pictureSrc:[],
 	 		pictureZZc:false,	//放大图片显示（遮罩层）
    		prevBloo: false,		//上一张显示
    		nextBloo: false,		//下一张显示
    		leftBloo:true,		//左显示
    		rightBloo:true		//右显示
 	 	}
 	 },
	   methods: {
	   		Like(item){
	   			var ite = [];
	   			var itm = JSON.parse(item);
	   			for(var p in itm){
	   				ite.push(p + ":" + itm[p]);
	   			}
	   			return ite ;
	   		},
	   		Part(item){
	   			var items=[];
	   			if(item==""||item==null){
	   				return 0;
	   			}else{
	   				items = item.split("*/*");
	   				return items;
	   			}
	   		},
	   		Pictu(item){
	   			var pictu=[];
	   			
	   			if(item==""||item==null){
	   				return 0;
	   			}else{
	   			   pictu = item.split("*/*");
	   			  for(var i=0;i<pictu.length;i++){
	   			  	pictu[i]="assets/upimage/"+pictu[i];
	   			  }
	   			  return pictu;
	   			}
	   		},
	   		picturesZZc(item,index){
				this.pictures=this.$options.methods.Pictu(item);
				this.pictureSrc = parseInt(index);
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
 	  beforeCreate:function(){
    	var self = this;
    		var time=[];
    	 this.axios.post('admin/index3Like',{
		 	ID : this.$route.query.ID
		 })
	  	.then(function (res) {
	  	   if(res.data.result==1){
	  	   		self.data = res.data.data;
	  	   		self.page = res.data.data.length;
	  	   		self.data = JSON.parse(self.data);
	  	   		//暂时使用
	  	   		for(var i=0;i<self.data.length;i++){
	  	   			time = self.data[i].time.split("-");
	  	   			self.data[i].time = time[0]+"年"+time[1]+"月"+time[2].split("*/*")[0]+"日 "+time[2].split("*/*")[1];
	  	   		}
	  	  }
	  })
	  .catch(function (error) {
	   	 	console.log(error);
	  });
    },
    pageLoad(nums){
      	this.num = nums;	
      }
}
</script>

<style>
	.index3Repair{
		padding-bottom: 20px;
		border-bottom: 1px solid #ddd;
		margin-bottom: 10px;
	}
	.RepairHead{
		height:80px;
		line-height: 80px;
		text-align: left;
		overflow: hidden;
	
	}
	.RepairHead>span{
		color:#3399ff;
		font-size: 20px;
		padding:15px;
		border:1px solid #ccffff;
		background-color:#edf5ff;
		border-radius: 10px;
		margin-right:10px;
	}
	.RepairUser{
		height:80px;
		line-height: 80px;
		float: right;
		text-align: left;
	}
	.RepairUser span{
		font-size: 18px;
		padding-right: 15px;
		letter-spacing: 1px;
	}
	.RepairUser img{
		height:100%;
		border-radius: 50%;
		float: right;
	}
	.index3Repair p.RepairMiaoshu{
		font-size: 18px;
		text-align: left;
		color:#999;
	}
	.RepairPictures{
		
		overflow: hidden;
		text-align: left;
	}
	.RepairPictures img{
		height:100%;
		margin:0 10px;
	}
	.RepairPictures p{
		padding:0;
		margin:0;
		padding:5px 0;
		padding-left: 20px;
		color:#999;
		font-weight: bold;
		font-size: 25px;
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
		height:100%;
		background-color:rgba(0,0,0,0);
		width:100px;
		text-align: center;
		/*top:50%;
		transform: translateY(-50%);*/
		top:48%;
		border:0;
		font-size: 80px;
	}
	.pictureZZC button span{
		width:40px;
		height:70px;
		display: inline-block;
	}
	.pictureZZC button:hover{
		background-color:rgba(0,0,0,0.8);
		color:#fff;
	}
	.pictureZZC i{
		position: absolute;
		top:1%;
		right: 7%;
		font-size: 60px;
		color:#FFF;
	}
	.pictureZZC i:hover{
		color:#c00;
	}
	
</style>