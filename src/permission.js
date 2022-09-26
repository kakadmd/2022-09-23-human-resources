// 权限相关的写在这个里面

// 全局前置守卫
import router from '@/router'
import store from './store'

// 定义一个白名单数组
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  /* to 即将要进入的目标
  from 当前导航要离开的路由
  next 是一个方法
  next()意味着 当前的钩子结束，进入下一个
  next(false) 意味着中断当前的导航
  next('/') 或者 next({path:'/'}) 跳转到不同的地址 当前导航结束 进行一个新的导航

    token 存在 说明 处于登录状态
    判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页
    token 不存在 说明 不处于登录状态
    判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页

  如果存在token（就是处于登录状态） */

  if (store.getters.token) {
    // 如果token存在并且唯一值不存在的话就直接去调用getInfo那个方法
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }

    // 如果即将要进入的目标的路径是login
    if (to.path === '/login') {
      // 那么让他进入首页（token存在了还在登录页干嘛，应该直接去主页）
      next('/')
    } else {
      // 如果即将要进入的目标路径不是login，想去哪去哪
      next()
    }
  } else {
    //   如果token不存在，判断是不是在白名单里面,在白名单 你随便去哪
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 不在白名单 就去登录页面
      next('/login')
    }
  }
})
