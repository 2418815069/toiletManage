<template>
	<div class="index3">
			<div class="index3_header">
					<div class="index3_header_img">
						<img :src="data[0].picture" />
					</div>
					<div class="index3_header_wenzi">
						<p>{{data[0].name}}</p>
						<p>{{data[0].site}}</p>
						<p style="overflow: hidden;">
							<img v-for="item in data[0].HealthStar" src="../../static/assets/star1.png" style="height:30px;float:left; "/>
							<img v-for="item in 5-data[0].HealthStar" src="../../static/assets/star0.png" style="height:30px;float: left;" />
						</p>
						<div class="index3_header_table">
							<el-table
							:data = "tableData"
							>
						    <el-table-column
						   	prop="sex"
						    label="性别">
							 </el-table-column>
							 <el-table-column
							 	prop="leisure"
						    	label="尿斗位">
							 </el-table-column>
							 <el-table-column
							 	prop="allLeisure"
						    	label="坑位数">
							 </el-table-column>
							 <el-table-column
							 	prop="staya"
						    	label="驻留人数">
							 </el-table-column>
	    					</el-table>
						</div>
					</div>
			</div>
			<div class="index3_main">
				<div class="index3_main_title">
					<span @click="title(1)" :class='{"click_title":active==1}' >报修  {{data[0].warrantyNumber}}</span>
					<span @click="title(2)" :class='{"click_title":active==2}' >评价   {{data[0].LikeNumber}}</span>
					<!--<span @click="title(3)" :class='{"click_title":active==3}' >吐槽   {{data[0].tauntNumber}}</span>-->
				</div>
				<div class="index3_main_content">
					<router-view></router-view>
				</div>
			</div>
	</div>
</template>

<script>
export default {
 	 name: 'index3Details',
   data () {
    return {
    	tableData: [{
    		sex : "女",
           	leisure :1,
           	allLeisure : 1,
            staya  :  0,
          }, {
          	sex : "男",
           	leisure :1,
           	allLeisure : 1,
            staya:  0,
          }],
          active:1,
          data :[{
    		picture : 1,
            name: '洗手间',
            HealthStar: 2, 
            site: '上海市普陀区金沙江路 1518 弄',
            warrantyNumber : 5,
            LikeNumber	: 10 ,
            tauntNumber	: 1
          }]
    }
   },
   methods: {
   		title(index){
   			this.active = index;
   			var  self=this;
   			if(index==1){
   				this.$router.push({
		         name: 'repair',
		         query: {
		         	ID : this.$route.query.ID
		         }
		 		});
   			}else if(index==2){
   				this.$router.push({
		         name: 'Like',
		         query: {
		         	ID : this.$route.query.ID
		         }
		 		});
   			}
   		}
   },
    beforeCreate:function(){
    	var self = this;
    	 this.axios.post('admin/index3Details',{
		 	ID : this.$route.query.ID
		 })
	  	.then(function (res) {
	  	   if(res.data.result==1){
	  	   		self.data = res.data.data;
	  	   		self.data[0].picture = "headerPicture/" + self.data[0].picture;
	  	   		//女
	  	   		self.tableData[0].leisure = " -- ";												//尿斗位
	  	   		self.tableData[0].staya = self.data[0].female.staya==null?"--":self.data[0].female.staya;//驻留人数
	  	   		self.tableData[0].allLeisure = self.data[0].female.extension.pit_id.length;		//坑位数
	  	   		//男
	  	   		self.tableData[1].leisure = self.data[0].male.extension.urinal_id.length;		//尿斗位
	  	   		self.tableData[1].staya = self.data[0].male.staya==null?"--":self.data[0].male.staya;//驻留人数
	  	   		self.tableData[1].allLeisure = self.data[0].male.extension.pit_id.length;		//坑位数
	  	   }
	  })
	  .catch(function (error) {
	   	 	console.log(error);
	  });
    	this.$router.push({
         name: 'repair',
         query: {
         	ID : this.$route.query.ID
         }
 		});	
    }
 }
</script>

<style>
	.index3{
		padding:60px;
	}
	.index3_header{
		overflow: hidden;
		margin-bottom: 30px;
	}
	.index3_header_img{
		width:39%;
		float: left;
	}
	.index3_header_img img{
		width: 100%;
	}
	.index3_header_wenzi{
		float: right;
		width:58%;
		text-align: left;
		font-size: 20px;
		font-weight: bold;
		
	}
	.index3_header_wenzi p{
		margin: 0;
		padding: 5px 0 20px;
	}
	.index3_header_table{
		font-size: 20px;
	}
	.index3 .el-table__header tr{
		/*!autoprefixer:off*/
  	  background: -webkit-linear-gradient(left,#7fff80,#66ccfe) !important;
		background: -webkit-gradient(left,#7fff80,#66ccfe) !important;
		/*autoprefixer:on*/
		background: -mos-linear-gradient(left,#7fff80,#66ccfe) !important;
		background: -o-linear-gradient(left,#7fff80,#66ccfe) !important;
		background: -moz-linear-gradient(left,#7fff80,#66ccfe) !important ;
		background: linear-gradient(left,#7fff80,#66ccfe) !important;
	}
	.index3 .el-table{
		font-size: 20px !important;
	}
	.index3_header_table .el-table th{
		background-color: inherit !important;
		color:#fff;
		font-weight: normal;
		text-align: center;
	}
	.el-table td{
		text-align: center;
		font-weight: normal;
	}
	
	/*其他  比如保修。吐槽。点赞*/
	.index3_main_title{
		text-align: left;
		font-size: 25px;
		height:50px;
		margin-bottom:30px;
	}
	.index3_main_title span{
		padding: 12px 20px;
		letter-spacing: 2px;
		cursor: pointer;
	}
	.click_title{
		border-bottom: 4px solid #c00;
		color:#c00;
	}
	.index3 .el-table:before{
		height:0 !important;
	}
</style>