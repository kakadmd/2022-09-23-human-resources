import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 第二个参数是子目录 没有子目录所以是false
const req = require.context('./svg', false, /\.svg$/)
// require方法返回的是一个req函数 ——> 根据路径把对应的模块导入进来

// 函数keys属性 是一个方法 这个方法返回一个数组(包括所有svg图片的数组)
// console.log(req.keys())

// map 返回一个和原来数组长度一致的新数组
// 映射
// ['./dashboard.svg'.map(requireContext)] // []
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 先把requireAll封装成一个函数 req去调用这个函数
requireAll(req)

// 这两个是相等的
// console.log(requireAll(req))
// console.log(req.keys().map(req))
