<template>
  <div>
    <div class="box">
      <!-- <div class="current" v-if="file !== null">
        <img :src="file.url" />
      </div>-->

      <div class="demo-upload-list" v-for="item in uploadimgList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url" />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        v-if="file == null"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        action="http://babyroom.hecy.top/babyroom/file/uploadFile"
      >
        <Button class="btn" type="dashed">上传文件</Button>
      </Upload>
      <!-- <div class="cancel"
      @click="cancel">取消</div>-->
      <!-- <Button v-if="file !== null" class="canbtn" type="dashed">取消</Button> -->
    </div>
    <!-- <Button
      style="display:none"
      type="text"
      @click="upload"
      :loading="loadingStatus"
    >{{ loadingStatus ? '未提交' : '点击提交' }}</Button>-->
  </div>
</template>
<script>
export default {
  name: "Uploads",
  props: [],
  data() {
    return {
      file: null,
      currentFile: {},
      loadingStatus: false,
      formData: [],
      uploadimgList: []
    };
  },
  methods: {
    cancel(list) {
      console.log("点击取消了");
      this.file = null;
      console.log(list);
      this.$emit("cancelUploadsFile", list);
    },
    handleBeforeUpload(file) {
      console.log("当前选中====", file.name);
      this.file = file;
      this.formData.push(file.name);
     
      this.$emit("addUploads", this.formData);
      console.log("自定义事件this.formData===", this.formData);
      return false;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleSuccess(res, file) {
      console.log("自定义事件this.formData===", JSON.stringify(file));
      var dateStr = this.formatDate(new Date(), "YY-MM-DD");
      if (res.code == "0000") {
        var fileName = "compress_" + res.attachment + "-" + file.name;
        file.url =
          "http://babyroom.hecy.top//hecy/upload/image/compress/" +
          dateStr +
          "/" +
          fileName;
        file.name = fileName;
        console.log("fileName: " + fileName);
        this.uploadimgList.push({
        status: "finished",
        url:
          file.url,
        name: fileName
      });
      }
    },
    upload() {
      console.log("运行了upload方法 ", file.name);
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
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>