<template>
	<div>
		<div class="amount">
			<el-button type="primary" v-on:click="history" style="float: left; margin:0 0px 0 20px;">历史记录</el-button>
			<el-button type="primary" v-on:click="aTag" style="float: left; margin:0 0px 0 20px;">更改已选状态</el-button>
			<el-button type="primary" v-on:click="alltag" style="float: left; margin:0 0px 0 30px;">全部更改为已修</el-button>
		</div>
		<div style="margin:15px; border: 1px solid #85d3ff;">
			<el-table
		    :data="tableData.slice((num-1)*10,num*10)"
		    border
		    ref="multipleTable"
		    @selection-change="change"
		    style="width: 100%;">
		    <el-table-column
		      type="selection"
		      width="40">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="厕所名称"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="RepairsPart"
		      label="报修事项"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="time"
		      label="时间"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="site"
		      label="地址">
		    </el-table-column>
		    <el-table-column
		      prop="tag"
		      label="状态"
		      width="100"
		      :filters="[{ text: '未', value: '未' }, { text: '已', value: '已' }]"
		      :filter-method="filterTag"
		      filter-placement="bottom-end">
		      <template slot-scope="scope">
		        <el-tag
		          :type="scope.row.tag === '未' ? 'primary' : 'success'"
		          disable-transitions>{{scope.row.tag}}</el-tag>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
 		uncomplete:5,	//未完成
    	page:100,
    	multipleSelection: [],	//表头点击改变
    	num:1,
    	tableData: [{
            event: '地板损坏',
            name: '卫生间',
            time:'2018-09-08',
            address: '上海市普陀区金沙江路 1518 弄',
            tag:'未'
          }, {
            event: '地板损坏',
            name: '卫生间',
            time:'2018-09-04',
            address: '上海市普陀区金沙江路 1518 弄',
            tag:'未',
          }, {
            event: '地板损坏',
            name: '卫生间',
            time:'2018-09-06',
            address: '上海市普陀区金沙江路 1518 弄',
            tag:'未'
          }, {
            event: '地板损坏',
            name: '卫生间',
            time:'2018-09-02',
            address: '上海市普陀区金沙江路 1518 弄',
            tag:'已'
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
      change(selection){
      	var self=this;
      	self.multipleSelection = selection;
      },
      aTag(){
      	var self = this;
      	this.tableData.forEach((row,index) => {
			this.tableData.forEach((r,i) => {
				if(self.tableData[index]===self.multipleSelection[i]){
					if(self.tableData[index].tag == "未"){
						self.tableData[index].tag = "已";
					}else{
						self.tableData[index].tag = "未";
					}
      			}
			});
      	});
      },
      pageLoad(nums){
      	this.num = nums;
      },
      history(){
      	var self=this;
      		this.axios.post('admin/history')
      		.then(function (res) {
	  	  	 	if(res.data.result==1){
			  	   	alert("成功");
			  	   	self.uncomplete=0;
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      },
      alltag(){
      		var self=this;
      		this.axios.post('admin/alltag')
      		.then(function (res) {
	  	  	 	if(res.data.result==1){
			  	   	alert("成功");
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
      }
   },
   beforeMount:function(){
   	var self=this;
   		
	  this.axios.get('admin/index1')
	  .then(function (res) {
	  	   if(res.data.result==1){
	  	   	self.uncomplete=res.data.data.length;
	  	   	self.tableData = res.data.data;
	  	   	self.page = res.data.data.length;
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
		margin-top:20px;
	}
	.amount p{
		height: 30px;
		line-height: 30px;
		padding:2px 10px;
		color:#fff;
		background-color: #85d3ff;
	}
	/*表格*/
	.el-table th, .el-table tr{
		background-color:#f5f5f5;
	}
	.el-table__body-wrapper td,.el-table__header-wrapper th{
		border-color: #85d3ff;
		color:#85d3ff;
	}
	.el-table__body-wrapper{
		border-top:1px solid #85d3ff;
	}
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
	
</style>
