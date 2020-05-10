<template>
	<div class="index">
		<el-table
			:data="tableData.slice(0,10)"
			border
			style="width: 100%; font-size:16px;color:#404040;">
	    </el-table-column>
		<el-table-column
			label="来源"
			width='100'>
			<template  slot-scope="scope">
		      <img :src="scope.row.headphoto" style="width:60px;height:60px; border-radius: 50%;background-color:#ddd;"/>
		    </template>
		</el-table-column>
		<el-table-column
			prop='name'
			label="厕所名称">
		</el-table-column>
		<el-table-column
			prop='site'
			label="地址">
		</el-table-column>
		<el-table-column
			prop='time'
			label="时间">
		</el-table-column>
		<el-table-column
			prop='evaluate'
			label="评价">
		</el-table-column>
		<el-table-column
			v-for='(item,key,index) in evaluationSet'
			:label='item'
			width="130">
		    <template  slot-scope="scope">
	        		<img v-for="ite in Zmethodnum(item,scope.row)" src="../../static/assets/star1.png" style="height:20px;float:left; "/>
					<img v-for="ite in Fmethodnum(item,scope.row)" src="../../static/assets/star0.png" style="height:20px;float: left;" />
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
	 name: 'index3',
	 data(){
	 	return{
	 		page:1,
	 		num:1,
	 		tableData:[{
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
	 		}],
	 		evaluationSet:['卫生','气味','地板']
	 	}
	 },
	methods :{
	  	pageLoad(nums){
	      	var self = this;
	      	this.num = nums;	
	      	var time =[];
	  		 this.axios.get('admin/index5?page='+self.num)
			  .then(function (res) {
			  	   if(res.data.result==1&&res.data.data!=""){
				  	   	self.tableData = res.data.data[0];
		   				self.evaluationSet =res.data.data[1].split("*/*");
		   				self.page = res.data.data[2];
		   				console.log(res.data.data);
			  	   }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	    },
	  	deleteRow(index, rows) {
	      	var self = this;
		     this.$router.push({
		         name: 'index5Details',
		         query: {
		         	ID : self.tableData[index].ID
		         }
			 });
	     },
	     Zmethodnum(rows,con){
	     	if(con.HealthStar){
	     		if(con.HealthStar[rows]){
		     		return con.HealthStar[rows];
		     	}else{
		     		return 0;
		     	}
	     	}else{
	     		return 0;
	     	}
	     },
	     Fmethodnum(rows,con){
	     	if(con.HealthStar){
		     	if(con.HealthStar[rows]){
		     		return 5-con.HealthStar[rows];
		     	}else{
		     		return 0;
		     	}	
	     	}else{
	     		return 0;
	     	}
	     	
	     }
	  },
	  beforeCreate:function(){
  		var self = this;
		  axios.get('admin/index5')
		  .then(function (res) {
		   	if(res.data.result==1){
		   		self.tableData = res.data.data[0];
		   		self.evaluationSet =res.data.data[1].split("*/*");
		   		self.page = res.data.data[2];
		  	}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
  }
}
</script>

<style>
	.index .el-table th{
		background-color:rgb(89, 165, 254) !important;
	}
</style>