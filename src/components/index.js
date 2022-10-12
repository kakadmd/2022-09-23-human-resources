// 全局注册组件
// import PageTools from './PageTools/index.vue'
// import Vue from 'Vue'

// 全局自定义指令的组件
// import * as directives from '@/directives'

// Vue.component('PageTools', PageTools)
// Vue.component('PageTools1', PageTools1)
// Vue.component('PageTools2', PageTools2)
// Vue.component('PageTools3', PageTools3)
// 假如说数据有好多好多条
// 一条一条注册有点麻烦
// 可以用一个数组包裹起来

// [PageTools1, PageTools2, PageTools3].forEach
//     (item => { Vue.component(item) })

// const comments = [PageTools]
// export default {
//   install: function(Vue) {
//     comments.forEach(item => {
//       console.log(item)
//        Vue.component(‘组件名称（就是你用的标签名）’, item)
//        Vue.component('Qqq', item)要是写的Qqq 那到时候使用组件就要用Qqq
//       Vue.component(item.name, item)
//     })
//   }
// }

// 注册全局过滤器
import * as filters from '@/filters'

// require.context(路径，是否查看子目录，正则) ==》返回一个函数
// require.context 返回的函数 有一个keys属性，对应也是一个方法，返回值 找到内容的路径
// require.context 返回的函数 的作用 根据路径 找到对应的模块
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())
// console.log(fn('./PageTools/index.vue'))
// fn('./PageTools/index.vue') 就等价于 import PageTools from './PageTools/index.vue'
const comments = fn.keys().map(item => {
  return fn(item)
})

// 精简代码（把自定义指令也放里面了）
export default (Vue) => {
  comments.forEach(item => {
    // console.log(item)
    // Vue.component(item.name, item) // 这个是引入一个
    Vue.component(item.default.name, item.default) // 这个是批量引入
  })
  // 全局自定义指令的组件
  // Object.keys(directives).forEach(ele => {
  //   // console.log(ele)
  //   Vue.directive(ele, directives[ele])
  // })

  // 全局注册过滤器
  Object.keys(filters).forEach(ele => {
    // console.log(ele)
    Vue.filter(ele, filters[ele])
  })
}

