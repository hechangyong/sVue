<template>
  <div>
    <div class="box">
      <div class="current" v-if="file !== null">
        <img :src="file.url" />
        <!-- {{file.name }} -->
      </div>
      <Upload
        v-if="file == null"
        :before-upload="handleUpload"
        action="http://babyroom.hecy.top/babyroom/file/uploadFile"
      >
        <Button class="btn" type="dashed">上传文件</Button>
      </Upload>
      <!-- <div class="cancel"
      @click="cancel">取消</div>-->
      <Button v-if="file !== null" class="canbtn" type="dashed">取消</Button>
    </div>
    <Button
      style="display:none"
      type="text"
      @click="upload"
      :loading="loadingStatus"
    >{{ loadingStatus ? '未提交' : '点击提交' }}</Button>
  </div>
</template>
<script>
export default {
  name: "Uploads",
  props: [],
  data() {
    return {
      file: null,
      loadingStatus: false,
      formData: []
    };
  },
  methods: {
    cancel(list) {
      console.log("点击取消了");
      this.file = null;
      console.log(list);
      this.$emit("cancelUploadsFile", list);
    },
    handleUpload(file) {
      console.log("当前选中====", file.name);
      this.file = file;
      this.formData.push(file.name);
      this.$emit("addUploads", this.formData);
      console.log("自定义事件this.formData===", this.formData);
      return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  margin-top: 8px;
  /*border: 1px solid red;*/
}

.current {
  width: 50%;
  height: 100%;
  color: #bbb;
//   float: left;
//   white-space: nowrap; /*文本不换行*/
//   overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*显示省略号*/
  background-color: rgb(248, 248, 248);
  border: 1px solid rgb(204, 204, 204);
}
.canbtn {
  width: 50%;
}

.btn {
  //   padding: 2px 2px;
  //   width: 40px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid rgb(204, 204, 204);
}
.cancel {
  width: 40px;
  height: 30px;
  color: #999;
  margin: -50px 145px;
  line-height: 30px;
  cursor: pointer;
}
</style>