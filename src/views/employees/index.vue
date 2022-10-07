<template>
  <div>
    <!--PageTools在全局注册过了 不用引入了 可以直接使用  -->
    <!-- <PageTools type="error" :show-before="false"> -->
    <PageTools type="error">
      <!-- <Qqq> -->
      <!-- 旧语法 -->
      <!-- <template slot="before">
        <span>共25条记录</span>
      </template> -->

      <!-- 默认插槽 -->
      <!-- <template>
        <span>共25条记录</span>
      </template> -->

      <!-- 新语法 v-slot: = # -->
      <!-- <template v-slot:before>
        <span>共25条记录</span>
      </template> -->
      <template #before>
        <span>共25条记录</span>
      </template>

      <!-- 作用域插槽 取子组件里面的值 帮你进入组件内部把数据拿出来 -->
      <!-- <template v-slot:before="scope">
        <span>共25条记录{{ scope }}</span>
      </template> -->

      <!-- 放按钮 -->
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>

      <!-- 取到放置的id -->
      <!-- <template v-slot:after="scope">
        <el-button size="small" type="warning" @click="dianji(scope.id)">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template> -->
    <!-- </Qqq> -->
    </PageTools>
  </div>
</template>

<script>
export default {
  name: 'HrsaasIndex',
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {
    // 作用域插槽举的例子
    // dianji(a) {
    //   console.log(a)
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
