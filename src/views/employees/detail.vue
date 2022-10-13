<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">

          <el-tab-pane
            lazy
            label="登陆账户设置"
            name="first"
          >
            <!-- 表单添加校验：
          1.form组件：:model（v-bind:model就是父向子传值跟v-model没有关系）="表单数据" :rules="校验规则"
          2.在el-form-item 添加prop属性
           -->
            <el-form
              ref="form"
              label-width="80px"
              :model="accountInfo"
              :rules="accountInfoRules"
            >
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="accountInfo.password"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="updateUserInfo"
                >
                  更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane
            lazy
            label="个人详情"
            name="second"
          >
            <UserInfo />
          </el-tab-pane>

          <el-tab-pane
            lazy
            label="岗位信息"
            name="third"
          >
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getMoreUserInfoById, saveUserInfoById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    UserInfo, JobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少六位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeeInfo()
  },
  methods: {
    async loadEmployeeInfo() {
      // 在router/modules/employees.js里面配置路由规则的时候 已经传了id
      // 是/:id 所以需要通过params来获取
      // 如果是?=id 就需要query来获取了
      const id = this.$route.params.id
      const res = await getMoreUserInfoById(id)
      this.accountInfo = res
    },
    async updateUserInfo() {
      // 更新用户信息
      // 先校验成功再发请求
      // 表单校验是validate

      // validate第一种写法 传参数
      // this.$refs.form.validate((valid, key) => {
      //   valid: 是否校验成功
      //    key:哪个字段没有校验成功
      // })

      // async await 有什么缺点：
      // 错误可以不捕获 但要是捕获错误必须通过try catch捕获

      try {
        // validate第二种写法 不传参数 用await
        await this.$refs.form.validate()
        console.log('校验成功')
        await saveUserInfoById(this.accountInfo)
        this.$message.success('更改信息成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      console.log(this.activeName)
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
