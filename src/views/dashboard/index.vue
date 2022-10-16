<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

    <svg-icon icon-class="user" />
    <UploadExcel
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
    />
    <UploadImg @onSuccess="onSuccess1" />
    <UploadImg @onSuccess="onSuccess2" />
  </div>
  <!-- 开发环境的接口前缀 /api
       线上环境handleSuccess的接口前缀 /prod-api -->
  <!-- 如果想更改.env.development 的名字，例如改成 .env.dev
       那么需要在package.json里面的 "scripts" 里面的"dev": "vue-cli-service serve",
       里面添加东西 写成 "dev": "vue-cli-service serve --mode dev", -->
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel'
export default {
  name: 'Dashboard',
  components: { UploadExcel },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log(123)
      console.log('data', data)
      // 做具体的业务逻辑
    },
    beforeUpload(file) {
      // 这里面写自定义的校验规则
      console.log(file)
      if (file.size > 1024) {
        this.$message.error('文件过大')
        return false
      }
      return true
    },
    onSuccess1(a) {
      console.log('第一次', a)
    },
    onSuccess2() {
      console.log('第二次')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
