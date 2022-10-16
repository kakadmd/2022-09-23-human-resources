<template>
  <div>
    <!-- action 远程服务器线上接口地址 -->
    <!-- list-type 文件列表的类型 -->
    <!-- on-preview 点击文件列表中已上传的文件时的钩子 -->
    <!-- on-remove 文件列表移除文件时的钩子 -->
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="httpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <!-- 预览图片的弹层 -->

    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img style="width:100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDTr6B4mLlAWo6ua7QYVEi9PSHtHa6RwHQ',
  SecretKey: '1rYCh06NXemmjUF2hM1hEc3QfmgLmz54'
})
console.log(COS)
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'food.gif', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      dialogVisible: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default',
        url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
    //   console.log('点击预览')
      this.previewImgUrl = file.url
      this.dialogVisible = true
    },
    onRemove(file, fileList) {
      // 点击删除图片
      this.fileList = fileList
    },
    onChange(file, fileList) {
      // 第一次触发：本地上传触发一次
      // 第二次触发：成功或失败都会再触发一次
      console.log(file)
      //   this.fileList.push(file)
      this.fileList = fileList
    },
    httpRequest({ file }) {
      this.loading = true
      // el-upload默认会本地上传 :http-request是把上传覆盖掉
      console.log('等一下 再上传')
      cos.putObject({
        Bucket: 'kaka-heima-1314348502', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        this.loading = false
        console.log(data)
        if (err) return this.$message.error('图片上传失败')
        this.$emit('onSuccess', {
          imgUrl: 'http://' + data.Location
        })
      })
    },
    beforeUpload(file) {
      const allType = ['image/jpeg', 'image/gif']
      const isHas = allType.includes(file.type)
      if (!isHas) {
        this.$message.error('只能上传' + allType.join('、') + '类型文件')
        return false
      }

      // 限制上传图片的大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过5MB')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>
