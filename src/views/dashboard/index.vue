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
  }/* ,
  async created() {
    // const res = await this.$store.dispatch('user/getUserInfo')
    // 这个样子是和modules里面getUserInfo  return出来的值是一样的
    // 如果想修改的话，要深拷贝一下可以用JSON.parse(JSON.stringify())来深拷贝
    const res = JSON.parse(JSON.stringify(await this.$store.dispatch('user/getUserInfo')))
    console.log(res)
    // 深拷贝之后修改不会影响vuex里面的数据
    // 但是如果是const res = await this.$store.dispatch('user/getUserInfo')会影响vuex里面的数据
    res.mobile = 1234567890
  } */
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
