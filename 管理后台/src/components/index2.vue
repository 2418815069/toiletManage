<template>
	<div class="index">
		<div class="amount">
			<el-button type="primary" v-on:click="history" v-if="cut" style="float: left; margin:0 0px 0 20px;">历史记录</el-button>
			<el-button type="primary" v-on:click="unfinished" v-if="!cut" style="float: left; margin:0 0px 0 20px;">未完成记录</el-button>
			<el-button type="primary" v-on:click="aTag" style="float: left; margin:0 0px 0 20px;">更改已选状态</el-button>
			<el-button type="primary" v-on:click="alltag" v-if="cut" style="float: left; margin:0 0px 0 30px;">全部更改为已修</el-button>
			<el-autocomplete 
			  v-model="chaxun" 
			  :fetch-suggestions="querySearchAsync" 
			  @select="handleSelect"
			  placeholder="请输入内容"
			></el-autocomplete>
			<el-button type="primary" v-on:click="SouSuo" style="margin:0 20px 0 0px;">搜索</el-button>
		</div>
		<div style="margin:15px;" class="index2main">
			<el-table
		    :data="tableData.slice(0,10)"
		    border
		    ref="multipleTable"
		    @selection-change="change"
		    style="width: 100%; font-size:16px;color:#404040;">
		    <el-table-column
		      type="selection"
		      width="40">
		    </el-table-column>
		    <el-table-column
		      prop="headphoto"
		      label="来源"
		      width="100">
		      <template  slot-scope="scope">
		      	<img :src="scope.row.headphoto" style="width:60px;height:60px; border-radius: 50%;background-color:#ddd;"/>
		      </template>
		    </el-table-column>
		     <el-table-column
		      prop="time"
		      label="时间"
		      width="200"
		      >
		      </el-table-column>
		      <el-table-column
		      prop="site"
		      label="地址"
		      >
		      <template  slot-scope="scope">
		   			{{scope.row.site=='undefined'?" ":scope.row.site}}
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="RepairsPart"
		      label="报修选项"
		      >
		      <template  slot-scope="scope">
		      		<span v-for="item in scopes(scope)" style="border: 1px solid rgba(64,158,255,.2);color:#409eff;display:inline-block;line-height:30px; padding:5px 8px;background-color:rgba(64,158,255,.1);margin-right: 10px;margin-bottom: 10px; border-radius: 5px;">{{item}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="description"
		      label="文字"
		      width="70">
		      <template slot-scope="scope">
		        <div>
		         {{scope.row.description==null||scope.row.description==""||scope.row.description==undefined?'无':'有'}}
		        </div>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="picture"
		      label="图片"
		      width="70">
		      <template slot-scope="scope">
		        <div>
		         {{scope.row.picture==null||scope.row.picture==""||scope.row.picture==undefined?'无':'有'}}
		        </div>
		      </template>
		    </el-table-column>
		    
		    <el-table-column
		      prop="tag"
		      label="状态"
		      width="70"
		      >
		      <template slot-scope="scope">
		        <el-tag
		          :type="scope.row.tag === '未' ? 'primary' : 'success'"
		          disable-transitions>{{scope.row.tag}}</el-tag>
		      </template>
		    </el-table-column>
			  <el-table-column
			  	label="详情"
			  	 width="70">
			  	<template slot-scope="scope">
		        <el-button
		          @click.native.prevent="deleteRow(scope.$index)"
		          type="text"
		          size="small">
		          	详情
		        </el-button>
		      </template>
		    </el-table-column>
	    </el-table>
		</div>
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
import axios from 'axios'
export default {
  name: 'index2',
  data () {
    return {
    	page:1,
    	cut:true,
    	multipleSelection: [],	//表头点击改变
    	num:1,
    	sousuo:[], //搜索
    	chaxun:"",
    	tableData: [{
            RepairsPart: '地板损坏',
            name: '卫生间',
            time:'2018-09-08',
            site: '上海市普陀区金沙江路 1518 弄',
            tag:'未',
            description:'损坏严重',
            picture:''
          }]
    }
  },
  methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
//    头部点击椒改变
      change(selection){   
      	var self=this;
      	self.multipleSelection = selection;
      	self.multipleSelection.sort(function(a1,a2){
      		var x = a1.ID;
      		var y = a2.ID;
      		return y-x;
      	});
//    	console.log(self.multipleSelection);
      },
      aTag(){
      	var self = this;
      	if(self.multipleSelection.length!=0){
      		this.tableData.forEach((row,index) => {
			this.multipleSelection.forEach((r,i) => {
				if(self.tableData[index]===self.multipleSelection[i]){
					if(self.tableData[index].tag == "未"){
						self.tableData[index].tag = "已";
						self.multipleSelection[i].tag = "已";
					}else{
						self.tableData[index].tag = "未";
						self.multipleSelection[i].tag = "未";
					}
						self.tableData.splice(index,1);
		      	}
			});
		    });
	      	this.axios.post('admin/atag',{
	      		atag :self.multipleSelection
	      	})
	      	.then(function(res){
	  	  	 	if(res.data.result==1){
			  	  alert("成功");
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      	}else{
      		alert("请选择后在点击");	
      	}
      },
      pageLoad(nums){
      	var self = this;
      	this.num = nums;	
      	var time =[];
      	if(self.cut){
      		 this.axios.post('admin/index1',{
		  		page : self.num
			  })
			  .then(function (res) {
			  	   if(res.data.result==1&&res.data.data!=""){
			  	   		self.tableData = res.data.data;
			  	   		self.page = res.data.page;
			  	   		//暂时使用
			  	   		for(var i=0;i<self.tableData.length;i++){
			  	   			time = self.tableData[i].time.split("-");
			  	   			self.tableData[i].time = time[0]+"年"+time[1]+"月"+time[2].split("*/*")[0]+"日 "+time[2].split("*/*")[1];
			  	   		}
			  	   		
			  	   }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      	}else{
      		this.axios.post('admin/history',{
      			page : self.num
      		})
      		.then(function (res) {
	  	  	 	if(res.data.result==1&&res.data.data!=[]){
			  	   	self.tableData = res.data.data;
	  	   			self.page = res.data.page;
	  	   			self.num = 1;
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      	}
      	
      },
      history(){
      	var self=this;
      	var time = [];
      		this.axios.post('admin/history',{
      			page : self.num
      		})
      		.then(function (res) {
	  	  	 	if(res.data.result==1&&res.data.data!=[]){
			  	   	self.tableData = res.data.data;
	  	   			self.page = res.data.page;
	  	   			self.cut = !self.cut;
	  	   			self.num = 1;
  	   				//暂时使用
		  	   		for(var i=0;i<self.tableData.length;i++){
		  	   			time = self.tableData[i].time.split("-");
		  	   			self.tableData[i].time = time[0]+"年"+time[1]+"月"+time[2].split("*/*")[0]+"日 "+time[2].split("*/*")[1];
		  	   		}
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      },
      unfinished(){
      		var self=this;
      		var time = [];
			  this.axios.get('admin/index1')
			  .then(function (res) {
			  	   if(res.data.result==1&&res.data.data!=[]){
				  	   	self.tableData = res.data.data;
				  	   	self.page = res.data.page;
				  	   	self.cut = !self.cut;
				  	   	self.num = 1;
				  	   	//暂时使用
			  	   		for(var i=0;i<self.tableData.length;i++){
			  	   			time = self.tableData[i].time.split("-");
			  	   			self.tableData[i].time = time[0]+"年"+time[1]+"月"+time[2].split("*/*")[0]+"日 "+time[2].split("*/*")[1];
			  	   		}
			  	   }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      },
      alltag(){
      		var self=this;
	        this.$confirm('是否执行此操作？', '提示', {
	          confirmButtonText: '是',
	          cancelButtonText: '否',
	          type: 'warning'
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '操作成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消操作'
	          });          
	        });
		     
      		this.axios.post('admin/alltag')
      		.then(function (res) {
	  	  	 	if(res.data.result==1){
	  	  	 		self.tableData.forEach(row=>{
	  	  	 			row.tag = "已";
	  	  	 		});
			        this.$alert('更改成功', '通知', {
			          confirmButtonText: '确定',
			          callback: action => {
			            this.$message({
			              type: 'info',
			              message: `action: ${ action }`
			            });
			          }
			        });
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      },
      deleteRow(index, rows) {
      		var self = this;
	     this.$router.push({
	         name: 'index2Details',
	         query: {
	         	ID : self.tableData[index+(self.num-1)*10].ID
	         }
		 });
      },
      
		//queryString 为在框中输入的值
		//callback 回调函数,将处理好的数据推回
		querySearchAsync(queryString, callback) {
		    var list = [{}];	
		    this.sousuo = queryString;
		    var flag=0;//标志位
		     //从后台获取到对象数组
		     //正则检测输入的是时间还是地址还是保修事项 ，如何是时间flag=1,地址是=2,保修事项是3
		    this.axios.post('admin/sousuo',{
		    	data : queryString
		    }).then((response)=>{
		        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
		        for(let i=0;i<response.data.data.length;i++){
		        	if(response.data.data[i].time.indexOf(queryString)!=-1&&queryString!=''){
		        		flag=1;
		        		break;
		        	}else if(response.data.data[i].site.indexOf(queryString)!=-1&&queryString!=''){
		        		flag=2;
		        		break;
		        	}else if(response.data.data[i].RepairsPart.indexOf(queryString)!=-1&&queryString!=''){
		        		flag=3;
		        		break;
		        	}else{
		        		flag=0;
		        		break;
		        	}
		        }
		        if(flag==1){
		        	for(var i of response.data.data){
			            i.value = i.time;  //将想要展示的数据作为value
			        }
			        list = response.data.data;
		        }else if(flag==2){
		        	for(var i of response.data.data){
			            i.value = i.site;  //将想要展示的数据作为value
			        }
			        list = response.data.data;
		        }else if(flag==3){
		        	for(var i of response.data.data){
			            i.value = i.RepairsPart;  //将想要展示的数据作为value
			        }
			        list = response.data.data;
		        }
		        
        		callback(list);
		    }).catch((error)=>{
		    	console.log(error);
		    });
		},
		handleSelect(item) {
		    this.sousuo = item.value;
    		//do something
		},
		SouSuo(){
			 var self=this;
			 this.axios.post('admin/sousuo',{
		    	data : self.sousuo
		  }).then((response)=>{
		       self.tableData = response.data.data;
		    }).catch((error)=>{
		    	console.log(error);
		    });
		},
		scopes(item){
			if(item.row.RepairsPart==""||item.row.RepairsPart==null){
				return 0;
			}else{
				if(item.row.RepairsPart.indexOf("*/*")==-1){
					return  [item.row.RepairsPart];
				}else{
					return  item.row.RepairsPart.split("*/*");
				}
			}	
		}
   },
   beforeMount:function(){
   	var self=this;
   	var time=[];
   	var defaultUrl= window.location.href.split('#/index2?page=');
   	this.page = this.tableData.length;
	  axios.get('admin/index1?page='+defaultUrl[1])
	  .then(function (res) {
	  		console.log(res.data.data);
	  	   if(res.data.result==1&&res.data.data!=""){
	  	   		self.tableData = res.data.data;
	  	   		self.page = res.data.page;
	  	   		for(var i=0;i<self.tableData.length;i++){
	  	   			time = self.tableData[i].time.split("-");
	  	   			self.tableData[i].time = time[0]+"年"+time[1]+"月"+time[2].split("*/*")[0]+"日 "+time[2].split("*/*")[1];
	  	   		}
	  	   }
	  })
	  .catch(function (error) {	
	    console.log(error);
	  });
  	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.index{
		padding:50px;
	}
	.mask{
		width:100%;
		height: 40px;
		background-color: #85d3ff;
	}
	.mask h4{
		margin:0;
		height:100%;
		text-align: left;
		line-height: 40px;
		padding-left:30px ;
		font-weight: normal;
		color: #3286db;
		font-size: 16px;
	}
	/*数量*/
	.amount{
		height:45px;
	}
	.amount p{
		height: 30px;
		line-height: 30px;
		padding:2px 10px;
		color:#fff;
		background-color: #85d3ff;
	}
	/*表格*/
	.paging{
		margin:15px;
	}
	/*分页*/
	.el-pagination.is-background .el-pager li{
		color: #85d3ff !important;
	}
	.el-pagination.is-background .btn-prev{
		color: #85d3ff !important;
	}
	.el-pagination.is-background .btn-next{
		color: #85d3ff !important;
	}
	.el-pagination.is-background .btn-prev:disabled{
		color:#c0c4cc !important;
	}
	.el-pagination.is-background .btn-next:disabled{
		color:#c0c4cc !important; 
	}
	/*表头背景颜色的改变*/
	.index2main .el-table th{
		background-color:rgb(89, 165, 254) !important;
	}
	
	/*水平居中*/
	.el-table td, .el-table th{
		text-align: center !important;
	}
	.el-button--small{
		font-size: 16px !important;
	}
	.el-tag{
		font-size: 16px !important;
	}
</style>
