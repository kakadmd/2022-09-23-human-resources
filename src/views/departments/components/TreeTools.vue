<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height:40px;width:100%;"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <span style="margin-right:8px;">{{ treeNode.manager }}</span>
        <el-dropdown @command="handleCommand">
          <span>
            操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isShow" command="edit">编辑子部门</el-dropdown-item>
            <el-dropdown-item v-if="isShow" command="del">删除子部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'HrsaasTreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      // console.log(type)
      if (type === 'add') {
        // 添加子部门
        // 现在treeTools和AddDepts是兄弟组件，
        // 在treeTools里面控制AddDepts的显示与隐藏
        this.$emit('addDept') // this指向的是这个组件
        this.$emit('addDept', this.treeNode) // 把他传给父组件
      } else if (type === 'edit') {
        // 编辑子部门
      } else {
        // 删除子部门
      }
    }
  }
}
</script>

<style>

</style>
