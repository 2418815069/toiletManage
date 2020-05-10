<template>
	<div>
		
	</div>
</template>

<script>
	import axios from 'axios'
export default {
  name: 'index1',
   data () {
    return {
    	tableData: [{
            date: '洗手间',
            name: '3',
            age:'19',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '公共厕所',
            name: '5',
            age:'25',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '公共厕所',
            name: '4',
            age:'12',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '肯德基洗手间',
            name: '5',
            age:'36',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    	}
    },
    beforeCreate:function(){
	  axios.get('admin/index3')
	  .then(function (response) {
	   	if(response.result==1){
	  		console.log(response.data);
	  	}
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  }
}
</script>

<style>
</style>