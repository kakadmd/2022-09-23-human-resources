<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <TreeTools
        :tree-node="company"
        :is-show="false"
        @addDept="handleAddDept"
      />
    </el-card>
    <el-tree
      :data="departs"
      :props="defaultProps"
      :default-expand-all="true"
    >
      <TreeTools
        slot-scope="{data}"
        :tree-node="data"
        @addDept="handleAddDept"
        @editDept="editDept"
        @refreshList="getDepartments"
      />
    </el-tree>
    <AddDepts
      ref="addDept"
      :dialog-visible.sync="disVisable"
      :tree-node="currentNode"
    />
  </div>
  <!-- 子组件的抽取 -->
</template>

<script>
import TreeTools from './components/TreeTools.vue'
import { getDepartments } from '@/api/departments'
import { getTreeData } from '@/utils/index'
import AddDepts from './components/AddDepts.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    TreeTools, AddDepts
  },
  data() {
    return {
      company: {
        // name: '江苏传智播客教育科技股份有限公司',
        // manager: '负责人'
      },
      departs: [],
      defaultProps: {
        // label 	指定节点标签为节点对象的某个属性值
        label: 'name'
        // childen 指定子树为节点对象的某个属性值
        // children: 'children'
      },
      disVisable: false,
      currentNode: {},
      loading: false
    }
  },

  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        // 一级部门的pid为空
        this.departs = getTreeData(depts, '')
        // 传一个id 可以把一级部门名字传过去，因为一级部门的id是空的
        this.company = { manager: companyManage, name: companyName, id: '' }
      } finally {
        this.loading = false
      }
    },
    handleAddDept(a) {
      // console.log(111)
      this.disVisable = true
      // 子组件TReeNode发送给父组件 ，父组件再发送给子组件AddDepts
      this.currentNode = a
    },
    editDept(node) {
      // currentNode 存放的是当前操作的节点
      console.log(node)
      this.disVisable = true
      this.currentNode = node
      // 回显数据
      // node复制给addDept formData

      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss" scoped>

.departments-container {
  width: 900px;
  margin: 20px auto;
}

</style>
