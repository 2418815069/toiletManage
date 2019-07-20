<template>
	<div class="index">
		<el-table
	      :data="tableData.slice(0,10)"
	      border
	      style="width: 100%; font-size:16px;color:#404040;">
	       <el-table-column
	        prop="picture"
	        label="图片"
	        width="200">
	        <template  slot-scope="scope">
		      	<img :src="scope.row.picture" style="width:144px;height:81px; text-align: center;"/>
		     </template>
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="厕所名称">
	      </el-table-column>
	      <el-table-column
	        prop="site"
	        label="地址">
	      </el-table-column>
	      <el-table-column
	        prop="HealthStar"
	        label="综合测评"
	        width="130">
	        <template  slot-scope="scope">
	        		<img v-for="item in scope.row.HealthStar" src="../../static/assets/star1.png" style="height:20px;float:left; "/>
					<img v-for="item in 5-scope.row.HealthStar" src="../../static/assets/star0.png" style="height:20px;float: left;" />
		     </template>
	      </el-table-column>
	      <el-table-column
	        label="尿斗位"
	        width="100">
	        <template  slot-scope="scope">
		      	  <p style="margin: 0;">男：{{scope.row.nameID==0?"--":scope.row.male.extension.urinal_id.length}}</p>
		      	  <p style="margin: 0;">女：-- </p>
		    </template>
	      </el-table-column>
	      <el-table-column
	        label="坑位数"
	        width="100">
	        <template  slot-scope="scope">
		      	  <p style="margin: 0;">男：{{scope.row.nameID==0?"--":scope.row.male.extension.pit_id.length}}</p>
		      	  <p style="margin: 0;">女：{{scope.row.nameID==0?"--":scope.row.female.extension.pit_id.length}}</p>
		    </template>
	      </el-table-column>
	      <el-table-column
	        label="驻留人数"
	        width="100">
	        <template  slot-scope="scope">
		      	  <p style="margin: 0;">男：{{scope.row.nameID==0?"--":(scope.row.male.staya==null?"--":scope.row.male.staya)}}</p>
		      	  <p style="margin: 0;">女：{{scope.row.nameID==0?"--":(scope.row.female.staya==null?"--":scope.row.female.staya)}}</p>
		    </template>
	      </el-table-column>
	       <el-table-column
	        label="NH3"
	        width="90">
	        <template  slot-scope="scope">
		      	  <p style="margin: 0;">男：{{scope.row.nameID==0?"--":(scope.row.male.extension.NH3==null?"--":scope.row.male.extension.NH3)}}</p>
		      	  <p style="margin: 0;">女：{{scope.row.nameID==0?"--":(scope.row.female.extension.NH3==null?"--":scope.row.female.extension.NH3)}}</p>
		     </template>
	      </el-table-column>
	      <el-table-column
	        label="湿度"
	        width="90">
	        <template  slot-scope="scope">
		      	  <p style="margin: 0;">男：{{scope.row.nameID==0?"--":(scope.row.male.extension.humidity==null?"--":scope.row.male.extension.humidity)}}</p>
		      	  <p style="margin: 0;">女：{{scope.row.nameID==0?"--":(scope.row.female.extension.humidity==null?"--":scope.row.female.extension.humidity)}}</p>
		     </template>
	      </el-table-column>
	      <el-table-column
	        label="温度"
	        width="90">
	        <template  slot-scope="scope">
		      	  <p style="margin: 0;">男：{{scope.row.nameID==0?"--":(scope.row.male.extension.temperature==null?"--":scope.row.male.extension.temperature)}}</p>
		      	  <p style="margin: 0;">女：{{scope.row.nameID==0?"--":(scope.row.female.extension.temperature==null?"--":scope.row.female.extension.temperature)}}</p>
		     </template>
	      </el-table-column>
	      
	      <el-table-column
		  	label="详情"
		  	 width="70">
		  	<template slot-scope="scope">
	        <el-button
	          @click.native.prevent="deleteRow(scope.$index)"
	          type="text"
	          size="small"
	          v-if='scope.row.nameID==0?false:true'>
	          	详情
	        </el-button>
	        <el-button
	          @click.native.prevent="deleteRow(scope.$index)"
	          type="text"
	          size="small"
	          disabled
	          v-if='scope.row.nameID==0?true:false'>
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
			  :total="page"
			 >
			</el-pagination>
		 </div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'index3',
   data () {
    return {
    	page:1,
    	num:1,
		tableData: [{
			ID : 2,
			nameID : "",
			picture : "",
	        name: '洗手间',
	        HealthStar: 0,
	        site: '上海市普陀区金沙江路 1518 弄',
//	        leisure :[1,2],
//			allLeisure:[10,10],
//	        wait  :  0,
	        warrantyNumber : 5,
	        LikeNumber	: 10 ,
	        tauntNumber	: 1
	      }]
    }
  },
  methods :{
  	pageLoad(nums){
  		var self= this;
      	this.num = nums;	
      axios.get('admin/index3?page='+nums)
	  .then(function (res) {
	   	if(res.data.result==1){
			self.tableData = res.data.data;
			self.page = res.data.pageAll;
			console.log(self.tableData);
			for(var i=0;i<self.tableData.length;i++){
	  	   		self.tableData[i].picture="headerPicture/"+self.tableData[i].picture;
	  	   	}

	  	}
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
      },
  	deleteRow(index, rows) {
      	var self = this;
	     this.$router.push({
	         name: 'index3Details',
	         query: {
	         	ID : self.tableData[index].ID
	         }
		 });
      }
  },
  beforeCreate:function(){
  	var self = this;
	  axios.get('admin/index3')
	  .then(function (res) {
	   	if(res.data.result==1){
			self.tableData = res.data.data;
			self.page = res.data.pageAll;
			console.log(self.tableData);
			for(var i=0;i<self.tableData.length;i++){
	  	   		self.tableData[i].picture="headerPicture/"+self.tableData[i].picture;
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
	.index .el-table th{
		background-color:rgb(89, 165, 254) !important;
	}
</style>