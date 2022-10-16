import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        icon: 'people',
        title: '员工管理' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      }
    },
    {
      path: '/employees/detail/:id',
      hidden: true,
      component: () => import('@/views/employees/detail')
    },
    {
      path: 'print/:id',
      hidden: true,
      component: () => import('@/views/employees/print')
    }
  ]
}
