import Layout from '@/layout'

export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: {
        icon: 'money',
        title: '工资' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      }
    }
  ]
}
