import Vue from 'vue'

// 样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引进的语言包——英语
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 全局注册组件
import components from './components'
Vue.use(components)
// 全局注册自定义指令（这样是用一个引一个 比较麻烦）
// import { imgerror } from '@/directives'
// Vue.directive('imgerror', imgerror)

import * as directives from '@/directives'
// console.log(directives)
// console.log(Object.keys(directives)) // 名字
Object.keys(directives).forEach(ele => {
  Vue.directive(ele, directives[ele])
})

// 全局注册自定义指令

/**
 * 全都是不需要的 注释掉或者删掉 下面模拟数据的也要删掉或者注释掉
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// 用于模拟数据的
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// 这个是英文
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// 这个是中文
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
