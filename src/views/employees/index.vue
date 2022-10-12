t
<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button
          size="small"
          type="warning"
          @click="$router.push('/import')"
        >
          导入</el-button>
        <el-button
          size="small"
          type="danger"
          @click="exportExcel"
        >导出</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleRole"
        >新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column
          label="序号"
          sortable=""
          width="80"
          type="index"
        />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          :formatter="formatterFn"
        />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <!-- {{value | 过滤器名字}} -->
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState === 1"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="delEmployee(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row
        type="flex"
        justify="end"
        align="middle"
        style="height: 60px"
      >
        <el-pagination
          layout="prev, pager, next,total,sizes"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
        <!-- current-page page-size
        加上 . sync 修饰符可以实时监测页数的改变 页数一改变就调用函数-->
      </el-row>
    </el-card>
    <AddEmployee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import AddEmployee from './components/AddEmployee.vue'
import EnumHirType from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employees'
export default {
  name: 'HrsaasIndex',
  components: {
    AddEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHirType.hireType,
      dialogVisible: false
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {

    async getEmployeeList() {
      try {
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
        this.loading = true
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      // console.log(cellValue)
      const res = this.hireType.find(item => item.id === cellValue)
      return res && res.value || '非正式'
    },
    handleRole() {
      // 点击的时候要弹出新增员工的弹窗
      // 新增员工的弹窗 封装成一个组件
      this.dialogVisible = true
    },
    async delEmployee(id) {
      // console.log(id)
      try {
        this.$confirm('确定删除该员工吗？', '提示', {
          type: 'warning'
        })
        // 调用删除接口 =》借口封装 接口引入
        await delEmployee(id)
        // 删除成功 刷新页面
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportExcel() {
      // 实现文件懒加载
      // import {export_json_to_excel} from '@/vendor/Export2Excel.js'
      // 但是这里我们import当作函数来用所以不用上面按需引入的方法
      // 是个函数 最后是promise 所以用. then或者async await都可以
      /* import('@/vendor/Export2Excel.js').then(res => {
        代表文件加载成功
        console.log(res)
      }) */
      const res = await import('@/vendor/Export2Excel.js')
      const { export_json_to_excel } = res
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)
      const exportExcelMapparh = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const header = Object.keys(exportExcelMapparh)
      // header = [
      //     '姓名',
      //     '手机号',
      //     '入职日期',
      //     '聘用形式',
      //     '转正日期',
      //     '工号',
      //     '部门'
      // ]
      const data = rows.map(item => {
        // item 就是每一项数据是一个对象
        // return 1
        // return []
        return header.map(val => {
          if (val === '聘用形式') {
            // 如果header循环出的名字是聘用形式
            // 就在hireType进行寻找 找到了对应的id如果等于item[exportExcelMapparh[val]]
            // 就把对应的value名字显示出来
            // 如果没有找到 就显示未知
            const findName = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapparh[val]]
            })
            return findName ? findName.value : '未知'
          }
          return item[exportExcelMapparh[val]]
        })
      })
      export_json_to_excel({
        header, // 表头必填
        data,
        // data里面的是二维数组，每一个数组是一行的数据，具体数据必填
        filename: '黑马员工列表', // 文件名称 非必填项
        autoWidth: true, // 宽度自适应
        bookType: 'xlsx' // 文件类型
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
