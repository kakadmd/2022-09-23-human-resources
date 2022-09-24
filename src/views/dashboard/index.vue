<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon icon-class="user" />
  </div>
  <!-- 开发环境的接口前缀 /api
       线上环境的接口前缀 /prod-api -->
  <!-- 如果想更改.env.development 的名字，例如改成 .env.dev
       那么需要在package.json里面的 "scripts" 里面的"dev": "vue-cli-service serve",
       里面添加东西 写成 "dev": "vue-cli-service serve --mode dev", -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
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
