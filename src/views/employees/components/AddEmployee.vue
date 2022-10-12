<template>
  <el-dialog
    title="新增员工"
    :visible="dialogVisible"
    @close="handleClose"
  >
    <!-- 表单 -->
    <el-form
      ref="AddEmployee"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width:80%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width:80%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width:80%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width:80%"
          placeholder="请选择"
        >
          <!-- <el-option label="正式" :value="1" /> -->
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width:80%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:80%"
          placeholder="请选择部门"
          @focus="getDepartments()"
        />
        <el-tree
          v-show="showTree"
          v-loading="loading"
          style="width:80%"
          :data="treeData"
          default-expand-all
          :props="{label:'name'}"
          @node-click="selectNode"
        />
      </el-form-item>

      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width:80%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="makeSure">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employeesEnum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { getTreeData } from '@/utils'
import { addEmployee } from '@/api/employees'
// 实现弹窗组件的显示与隐藏
// 其实是看el-dialog的显示与隐藏 visible
// 父组件传过来 props
// 点击关闭按钮 close $emit 去改父组件里的值
export default {
  name: 'HrsaasAddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hireType: employeesEnum.hireType,
      showTree: false,
      loading: false,
      // treeData: [{ name: '行政部', manager: '刘备' }],
      treeData: [],
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名必填',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 2,
            message: '名字在1~4个字之间',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号必填',
            trigger: 'blur'
          },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号码格式不对',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          {
            required: true,
            message: '聘用形式不能为空' }
        ],
        workNumber: [
          {
            required: true,
            message: '工号不能为空',
            trigger: 'blur' }
        ],
        departmentName: [
          {
            required: true,
            message: '部门不能为空',
            trigger: 'change'
          }
        ],
        timeOfEntry: [
          {
            required: true,
            message: '入职时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      // 重置校验结果
      this.$refs.AddEmployee.resetFields()

      // 给表单重新赋值
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }

      // 关闭弹窗
      this.$emit('update:dialogVisible', false)

      // 控制树的显示与隐藏
      // 树状图隐藏
      this.showTree = false
    },
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      //   console.log(depts)
      this.treeData = getTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
    //   console.log(node)
    // 选中树的节点 把节点对应的数据赋值到页面
      this.formData.departmentName = node.name

      //   细节优化
      // 控制树的显示与隐藏
      this.showTree = false
    },
    async makeSure() {
      try {
        // 点击确定调用接口
        // 表单校验通过之后才去调用
        // 1.接口封装 复制
        // 2.确定按钮 点击事件 form表单通过校验之后去调用接口
        await this.$refs.AddEmployee.validate()
        // 调用接口
        await addEmployee(this.formData)
        // 关闭弹窗
        this.handleClose()
        // 通知父组件去刷新列表
        this.$parent.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style>

</style>
