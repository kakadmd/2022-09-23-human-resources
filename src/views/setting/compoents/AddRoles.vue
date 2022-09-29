<template>
  <div>
    <!-- :title="formDate.id ? '编辑角色':'新增角色'"
          或者在计算属性里面绑定:title="title"
    -->
    <el-dialog
      :title="title"
      width="30%"
      :visible.sync="disvisible"
      :before-close="cancel"
    >
      <el-form
        ref="roleDialogForm"
        label-width="80px"
        :model="formDate"
      >
        <el-form-item
          prop="name"
          label="角色"
          :rules="[
            {required:true,message:'角色必填',trigger:'blur'}
          ]"
        >
          <el-input v-model="formDate.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formDate.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row
        slot="footer"
        type="flex"
        justify="center"
        align="middle"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="submit">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  name: 'HrsaasAddRole',
  props: {
    // 子组件接收父组件传过来控制弹出层的true或者false
    disvisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formDate: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    cancel() {
      this.$emit('update:disvisible', false)
      this.$refs.roleDialogForm.resetFields()
      // 优化点
      //  当打开新增的时候id会不会混乱
      // 打开弹框标题应该会改变
      this.formDate = {
        name: '',
        description: ''
      }
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        // 如果id存在那就是编辑角色
        this.formDate.id ? await updateRole(this.formDate) : await addRole(this.formDate)
        // await addRole(this.formDate)
        this.$emit('refreshList')
        this.$message.success(this.formDate.id ? '编辑角色成功' : '新增角色成功')
        this.cancel()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
