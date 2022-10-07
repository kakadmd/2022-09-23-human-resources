<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col v-if="showBefore">
        <div :class="`before ${type}`">
          <i :class="`el-icon-${type}`" />
          <!-- <span>共25条记录</span> -->
          <!-- 使用插槽 -->

          <!-- 使用具名插槽 用name属性 -->
          <!-- before 前面 after 后面 -->
          <slot name="before" />

          <!-- <slot name="before" aa="作用域插槽">111</slot> -->

          <!-- 默认插槽 -->
          <!-- <slot>
            这里可以写默认值，当使用者没有传递具体结构时，会显示此内容
          </slot> -->

        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
          <!-- 取插槽这里面的id -->
          <!-- <slot id="12312" name="after" /> -->
          <!-- <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button> -->
        </el-row>
      </el-col>
    </el-row>
  </el-card>
  <!-- 组件封装 -->
  <!-- 只可以支持四种类型 -->
  <!-- ['info', 'success', 'warning', 'error'] -->
  <!-- 前半部分可以通过showBefore来控制显隐 -->
</template>

<script>
export default {
  name: 'PageTools',
  //   name: 'Qqq' // 要是改名称的话这个写不写都行
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        if (['info', 'success', 'warning', 'error'].includes(value)) {
          return true
        }
        return false
      }
    },
    showBefore: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss'>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
      display: inline-block;
      border-radius: 3px;
      i {
        margin-right: 5px;
      }
      &.info {
        padding: 0px 10px;
        border: 1px solid rgba(145, 213, 255, 1);
        background: rgba(230, 247, 255, 1);
        i {
          color: #409eff;
        }
      }
       &.success {
        padding: 0px 10px;
        border: 1px solid #c2e7b0;
        background: #f0f9eb;
        i {
          color: #67c23a;
        }
      }

      &.warning {
        padding: 0px 10px;
        border: 1px solid #f5dab1;
        background: #fdf6ec;
        i {
          color: #e6a23c;
        }
      }

      &.error {
        padding: 0px 10px;
        border: #fbc4c4;
        background: #fef0f0;
        i {
          color: #f56c6c;
        }
      }
    }
 }
</style>
