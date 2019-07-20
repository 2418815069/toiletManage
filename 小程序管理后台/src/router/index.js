import Vue from 'vue'
import Router from 'vue-router'


//路由路径
import Myheader from '@/components/Myheader'
import index1 from '@/components/index1'
import index3 from '@/components/index3'
import index4 from '@/components/index4'
import index2 from '@/components/index2'
import index5 from '@/components/index5'
import index2Details from '@/components/index2Details'
import index3Details from '@/components/index3Details'
import index5Details from '@/components/index5Details'
import index3Shits from '@/components/index3Shits'
import index3Like from '@/components/index3Like'
import index3repair from '@/components/index3repair'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index2',
      name: 'index2',
      component: index2
    },
    {
    	path: '/index2Details',
      name: 'index2Details',
      component: index2Details
    },
//  {
//    path: '/',
//    name: 'index1',
//    component: index1
//  },
    {
      path: '/',
      name: 'index3',
      component: index3
    },
    {
    	path: '/index3Details',
      name: 'index3Details',
      component: index3Details,
      children:[
      	{path:'Like',component:index3Like,name:'Like'},
      	{path:'Shits',component:index3Shits,name:'Shits'},
      	{path:'',component:index3repair,name:'repair'}
      ]
    },
    {
      path: '/index4',
      name: 'index4',
      component: index4
    },
    {
      path: '/index5',
      name: 'index5',
      component: index5
    },
    {
    	path: '/index5Details',
      name: 'index5Details',
      component: index5Details
    },
  ]
})
