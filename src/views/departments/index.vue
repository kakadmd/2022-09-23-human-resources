<template>
  <div class="departments-container">
    <el-card>
      <TreeTools :tree-node="company" :is-show="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <TreeTools slot-scope="{data}" :tree-node="data" />
    </el-tree>
  </div>
</template>

<script>
import TreeTools from './components/TreeTools.vue'
import { getDepartments } from '@/api/departments'
export default {
  name: 'HrsaasIndex',
  components: {
    TreeTools
  },
  data() {
    return {
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [
            {
              name: '董事会',
              manager: '曹丕'
            }
          ]
        },
        {
          name: '行政部',
          manager: '刘备'
        },
        {
          name: '人事部',
          manager: '孙权'
        }
      ],
      defaultProps: {
        // label 	指定节点标签为节点对象的某个属性值
        label: 'name'
        // childen 指定子树为节点对象的某个属性值
        // children: 'children'
      }
    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
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
