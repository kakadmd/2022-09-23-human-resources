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
            style="width: 100%"
            :data="roleList"
          >
            <el-table-column
              label="序号"
              width="180"
              type="index"
            />
            <el-table-column
              label="角色名称"
              width="180"
              prop="name"
            />
            <el-table-column
              label="描述"
              width="180"
              prop="description"
            />
            <el-table-column
              label="操作"
            >
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
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
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
      </el-tabs>
    </el-card>
    <AddRole :disvisible.sync="disvisible" />
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import AddRole from './compoents/AddRoles.vue'
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
      disvisible: false
    }
  },

  mounted() {
    this.getRoleList()
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
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      // 点击之后变为true，把他传给子组件
      this.disvisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
