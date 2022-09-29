<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="20">
            <el-button
              type="primary"
              style="margin-left:10px"
              size="small"
              icon="el-icon-plus"
              @click="addRole"
            >
              新增角色
            </el-button>
          </el-row>
          <el-table
            v-loading="loading"
            style="width:100%"
            :data="roleList"
          >
            <el-table-column
              label="序号"
              width="180"
              type="index"
            />
            <el-table-column
              label="角色名称"
              width="300"
              prop="name"
            />
            <el-table-column
              label="描述"
              prop="description"
            />
            <el-table-column
              label="操作"
              width="300"
            >
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row
            :gutter="10"
            type="flex"
            justify="center"
            align="middle"
            style="height:60px;"
          >
            <!--  background   添加背景
             current-page 当前的页面
             page-size    每一页展示的条数
             page-sizes   每页显示个数选择器的选项设置
             total        总共多少条数据
             layout       布局
             current-change 改变当前页码的触发（current-page 值改变的时候触发）
             size-change 改变页面的数据条数的时候 触发（page-size 值改变的时候触发） -->
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-sizes="[2,5,10]"
              :page-size.sync="page.pagesize"
              @size-change="getRoleList"
              @current-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <AddRole ref="addRole" :disvisible.sync="disvisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import AddRole from './compoents/AddRoles.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'HrsaasIndex',
  components: {
    AddRole
  },

  data() {
    return {
      activeName: 'first', // 默认给第一个高亮效果
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      disvisible: false,
      companyInfo: {}
    }
  },

  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const res = await getRoleList(this.page)
        // console.log(res)
        const { rows, total } = res
        this.total = total
        this.roleList = rows
        // 如果total大于0 并且rows.length === 0
        // 这种情况下并不是真正的没有的数据，是有数据 只是要重新发起请求
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      // 点击之后变为true，把他传给子组件
      this.disvisible = true
    },
    editRole(i) {
      // 1.给编辑按钮绑定点击事件
      // 2.通过table表格的插槽拿到点击到的那一行的数据
      // 3.这条数据回显到新增角色的弹窗上
      // console.log(123)

      // slot-scope="scope" 自定义列的内容，
      // 参数为 { row（行）, column（列）, $index（点击的索引号） }
      // 通过slot-scope="{row}" 把row解构出来
      // 把点击传过来的数据赋值给addRole（就是子组件）里面的formDate
      // ? this.$refs.addRole.formDate = i
      // ? this.disvisible = true

      // 优化 数据是引用类型 带来的问题
      // 引用数据类型地址是一样的 本质上指的是同一个对象
      // 解决方法 要么深拷贝要么浅拷贝
      this.$refs.addRole.formDate = { ...i }
      this.disvisible = true
    },
    // delRole(id) {
    //   this.$confirm('确认删除该角色吗？', '提示', {
    //     confirmButtonText: '确认',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(success => {
    //     console.log(success)
    //   }, cancel => {
    //     console.log(cancel)
    //   })
    // }
    async delRole(id) {
      try {
        await this.$confirm('确认删除该角色吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log('success')
        // 删除接口文档
        // 调用删除接口
        await deleteRole(id)
        // 刷新列表
        this.getRoleList()
      } catch {
        console.log('cancel')
      }
    },
    async getCompanyInfo() {
      // 封装获取公司信息的接口
      // 拿到公司companyId 去获取信息
      // this.$store.state.user.userInfo.companyId
      // this.$store.getters.companyId
      // ...mapGetters(['companyId'])
      // console.log(await getCompanyInfo(this.companyId))
      this.companyInfo = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
