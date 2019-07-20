<template>
	<div class="index">
		<div class="name"><h2>参数名称</h2><h2 style="width:80%;">参数设置</h2></div>
		<div id="content">
			<p>
				<b >软件名称</b>
				<em>
				<span v-if="!firmNameBloo" style="border: 0;color:#999999;" >{{firmName}}</span>
				<input v-if="firmNameBloo" v-model="firmName" style="color:#999999;">
				<el-button type="info" v-if="firmNameBloo" v-on:click="add4">保存</el-button> 
				<el-button type="info" v-if="!firmNameBloo" v-on:click="amend">修改</el-button>
				</em>
			</p>
			<p>
				<b>报修选项</b>
				<em>
					<span v-for="(item,index) in repairs" style="background-color: #EDF5FF;color:#3399ff;">
						{{item}}
						<i class="el-icon-circle-close" v-if="repairsBloo" v-on:click="delet(index)"></i>
					</span>
					<input v-if="repairsBloo" v-model="add" >
					<el-button type="info" v-if="repairsBloo" v-on:click="add1">保存</el-button>
					<el-button type="info" v-if="!repairsBloo" v-on:click="amend1">修改</el-button> 
				</em>
			</p>
			<p>
				<b>评价选项</b>
				<em>
					<span v-for="(item,index) in evaluate" style="background-color: #fdedf3;color:#ff99cc; border-color:#ffcccc ;">
						{{item}}
						<i class="el-icon-circle-close" v-if="evaluateBloo" v-on:click="delet1(index)"></i>
					</span>
					<input v-if="evaluateBloo" v-model="addl">
					<el-button type="info" v-if="evaluateBloo" v-on:click="add2">保存</el-button>
					<el-button type="info" v-if="!evaluateBloo" v-on:click="amend2">修改</el-button> 
				</em>
			</p>
			<!--<p style="border: 0;">
				<b>吐槽选项</b>
				<em>
					<span v-for="(item,index) in shits" style="background-color: #f5effb;color:#9966cc; border-color:#ccccff ;">
						{{item}}
						<i class="el-icon-circle-close" v-if="shitsBloo" v-on:click="delet2(index)"></i>
					</span>
					<input v-if="shitsBloo" v-model="addi">
					<el-button type="info" v-if="shitsBloo" v-on:click="add3">保存</el-button>
					<el-button type="info" v-if="!shitsBloo" v-on:click="amend3">修改</el-button> 
				</em>
			</p>-->
			<!--<el-button type="primary" plain v-if="!allBloo" v-on:click="save"> 保 &nbsp;存 </el-button>
			<el-button type="primary" plain v-if="allBloo" v-on:click="allsave"> 修 &nbsp;改 </el-button>-->
		</div>
	</div>
</template>

<script>
export default {
  name: 'index4',
  data () {
    return {
    	allBloo:true,
    	firmName:"智慧城市",
    	firmNameBloo:false,
    	repairs:["地板破损","窗户损坏"],
    	add:"",
    	addl:"",
    	addi:"",
    	repairsBloo:false,
    	evaluate:["很满意","非常满意"],
    	evaluateBloo:false,
    	shits  : ["地板破损","窗户损坏"],
    	shitsBloo:false
    }
  },
  beforeMount:function(){
  		var self=this;
	  this.axios.get('admin/index4')
	  .then(function (res) {
	  	if(res.data.result==1){
	  		self.firmName = res.data.data[0].name;
	  		self.repairs = res.data.data[0].repairs.split("*/*");
	  		self.evaluate = res.data.data[0].evaluate.split("*/*");
	  		self.shits = res.data.data[0].shits.split("*/*");
	  	}
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  },
  methods:{
  	amend(){
  		 this.firmNameBloo= !this.firmNameBloo; 
  	},
  	amend1(){
  		 this.repairsBloo= !this.repairsBloo;
  	},
  	amend2(){
  		 this.evaluateBloo= !this.evaluateBloo;
  	},
  	amend3(){
  		 this.shitsBloo= !this.shitsBloo;
  	},
  	delet(i){
  		this.repairs.splice(i,1);
  	},
  	delet1(i){
  		this.evaluate.splice(i,1);
  	},
  	delet2(i){
  		this.shits.splice(i,1);
  	},
  	deleted(){
  		this.repairsBloo1= !this.repairsBloo1;
  	},
  	add1(){
  		var self=this;
  		if(this.add!=""&&this.add!=" "&&this.add!="  "){
  			this.repairs.push(this.add);
  			
  		}
  		this.axios.post('admin/index4',{
	  			type : 2,
	  			repairs:self.repairs.join("*/*")
	  		})
	  		.then(function (res) {
		  	if(res.data.result==1){
		  	}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
  		this.repairsBloo= !this.repairsBloo;
  		this.add="";
  	},
  	add2(){
  		var self=this;
  		if(this.addl!=""&&this.addl!=" "&&this.addl!="  "){
  			this.evaluate.push(this.addl);
  		}
  		this.axios.post('admin/index4',{
	  			type : 3,
	  			evaluate:self.evaluate.join("*/*")
	  		})
	  		.then(function (res) {
		  	if(res.data.result==1){
		  	}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
  		this.evaluateBloo=!this.evaluateBloo;
  		this.addl="";
  	},
  	add3(){
  		var self=this;
  		if(this.addi!=""&&this.addi!=" "&&this.addi!="  "){
  			this.shits.push(this.addi);
  		}
  		this.axios.post('admin/index4',{
	  			type : 4,
	  			shits:self.shits.join("*/*")
	  		})
	  		.then(function (res) {
		  	if(res.data.result==1){
		  	}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
  		this.shitsBloo=!this.shitsBloo;
  		this.addi="";
  	},
  	add4(){
  		var self=this;
  			this.axios.post('admin/index4',{
	  			type : 1,
	  			name:self.firmName
	  		})
	  		.then(function (res) {
		  	if(res.data.result==1){
		  	}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
  		 this.firmNameBloo= !this.firmNameBloo; 
  	},
  	save(){
  		var self=this;
  		this.axios.post('admin/index4',{
  			name:self.firmName,
  			repairs:self.repairs.join("*/*"),
  			evaluate:self.evaluate.join("*/*"),
  			shits:self.shits.join("*/*")
  		})
  		.then(function (res) {
	  	if(res.data.result==1){
	  		alert("成功");
	  		self.allBloo = !self.allBloo;
	  	}
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  	},
  	allsave(){
  		this.allBloo = !this.allBloo;
  	}
  }
}
</script>

<style>
	/*name*/
	.name{
		background-color:rgb(89, 165, 254) !important;
		padding:10px 0px;
		text-align: left;
	}
	.name h2{
		width:20%;
		font-size: 16px;
		color:#85d3ff;
		margin:80px 0 0px;
		margin: 0;
		display: inline-block;
		text-align: center;
		color:#999;
		font-weight: normal;
	}
	/*内容*/
	#content{
		border:1px solid #ddd;
	}
	#content p{
		line-height:80px;
		color:#85d3ff;
		font-size: 16px;
		text-align: left;
		overflow: hidden;
		margin: 0;
		border-bottom:1px solid #ddd;
	}
	#content p em{
		width:77%;
		font-style: normal;
		display: inline-block;
		padding-left:20px ;
		border-left: 1px solid #ddd;
	}
	#content p em input{
		border:1px solid #ddd;
		padding-left:10px;
		font-size: 18px;
	}
	#content p em>span{
		padding:7px;
		border:1px solid #85d3ff;
		line-height: 30px;
		margin-right: 20px;
		font-size: 18px;
		margin-bottom: 5px;
		display: inline-block;
		position: relative;
		border-radius: 7px;
	}
	#content p em>span i{
		position: absolute;
		right:-12px;
		top:-12px;
	}
	#content p em>span i:hover{
		color:#c00;
	}
	#content p b{
		width:20%;
		display: inline-block;
		text-align: center;
		height: 100%;
		font-weight: normal;
		color:#999;
	}
	#content button{
		font-size: 30px;
		margin-top:30px;
	}
	#content p button{
		font-size: 16px;
		height: 46px;
		width:80px;
		padding:0 10px;
		line-height:30px;
		margin:0;
		background-color: #3399ff;
	}
	#content p button span{
		padding: 10px;
	}
	#content p input{
		height:30px;
		font-size:16px;
		border-color:#85d3ff;
		color:#85d3ff;
	}
</style>