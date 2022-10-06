<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="dialogVisible" @close="close">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      ref="formDate"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item
        label="部门名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
          @focus="getEmployeeSimpleList"
        >
          <el-option
            v-for="item in peopleList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button
          v-loading="loading"
          type="primary"
          size="small"
          @click="submit"
        >确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getDepartments, addDepartments, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'HrsaasAddDepts',
  // 通过属性控制组件显示隐藏
  // 父子
  // 子到父 用.sync 去触发 关闭弹窗的时候update:dialogVisible
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 部门编码 在整个模块中都不允许重复出现
    // 拿到所有的部门数据 一个个的去对比
    // 如果出现重复，则校验不通过，否则校验通过
    const codeCheck = async(rule, value, callback) => {
      // value传进来的值
      // code部门编码
      // name部门名称
      const { depts } = await getDepartments()
      //  console.log(depts)
      let flag = true
      // const flag = depts.some(item => item.code === value)
      // flag ? callback(new Error(`${value}编码已经存在`)) : callback()
      // 编辑模式下 自己和自己校验了？？
      // 解决方案 在对比的过程中，把自己排除掉，然后再去对比
      if (this.formData.id) {
        // flag = depts.some(ele => 排除我自己 && ele.code === value)
        // some遍历数组 判断数组中是否存在某个满足条件的元素
        flag = depts.some(ele => ele.id !== this.formData.id && ele.code === value)
      } else {
        flag = depts.some(item => item.code === value)
      }
      flag ? callback(new Error(`${value}编码已经存在`)) : callback()
    }

    // 部门名称 同级部门中禁止出现重复部门
    // 重点是 同级部门 如何从所有部门中 把同级部门的刷新出来
    // 先确定父ID
    // 先从 TreeTools 拿到数据
    // 把数据传到父组件 父组件再把数据给AddDepts子组件
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let flag = true
      // 找同级部门
      // 编辑模式下存在的问题，无法校验同级部门数据，（同级的列表找的不对）
      // 解决方案：先找到所有与自己处于同级的列表，然后再排除自己，然后判断
      if (this.formData.id) {
        // 编辑
        // 找对同级部门
        // depts ==》找到真正的同级部门
        // filter满足条件的筛选出来
        // 把部门的pid和treeNode的pid如果一致就筛选出来 属于它的同级部门
        // 排除自己，再判断名称是否重复

        const deptstj1 = depts.filter(item => item.pid === this.treeNode.pid &&
        item.id !== this.treeNode.id)

        console.log(deptstj1)
        flag = deptstj1.some(item => item.name === value)
        console.log(flag)
      } else {
        const deptstj = depts.filter(item => item.pid === this.treeNode.id)
        flag = deptstj.some(item => item.name === value)
      }
      flag ? callback(new Error(`该部门下已经存在${value}`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: ''// 部门介绍
      },
      rules: {
        name: [
          {
            required: true,
            message: '部门名称必填',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '必须是一到五十个字符',
            trigger: 'blur'
          },
          {
            validator: nameCheck,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码必填',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '部门编码必须是一到五十个字符',
            trigger: 'blur'
          },
          {
            validator: codeCheck,
            trigger: 'blur'
          }
        ],
        manager: [
          {
            required: true,
            message: '部门负责人必填'
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍必填',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 300,
            message: '部门介绍必须是一到三百个字符',
            trigger: 'blur'
          }
        ]
      },
      peopleList: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑模式' : '新增模式'
    }
  },
  methods: {
    close() {
      this.$emit('update:dialogVisible', false)
      // form 表单自带的方法，关闭表单之后表单内容清空
      this.$refs.formDate.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async getEmployeeSimpleList() {
      const res = await getEmployeeSimple()
      // console.log(res)
      this.peopleList = res
    },
    async submit() {
      try {
        // 表单校验通过 validate（）
        await this.$refs.formDate.validate()

        // 按钮的loading状态
        this.loading = true

        if (this.formData.id) {
          // 编辑模式
          await updateDepartments(this.formData)
        } else {
          // 调用接口
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
        }

        // 接口成功之后 消息提醒
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功`)

        // 刷新父组件的组织架构列表(父组件重新调用一下部门列表)
        this.$parent.getDepartments()

        // 关闭弹窗
        this.close()
      } catch (error) {
        console.log(error)
      } finally {
        // 按钮的loading状态
        this.loading = false
      }
    }
  }

}
</script>

<style>

</style>
