<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList">
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
      ref="upload"
      v-if="uploadList.length == 0"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="5124"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="http://babyroom.hecy.top/babyroom/file/uploadFile"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img
        :src="imgName"
        v-if="visible"
        style="width: 100%"
      />
    </Modal>
  </div>
</template>
<script>
export default {
  name: "Uploads",
  data() {
    return {
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    handleView(name) {
        var dateStr = this.formatDate(new Date(), "YY-MM-DD");
        this.imgName =
          "http://babyroom.hecy.top//hecy/upload/image/compress/" +
          dateStr +
          "/" +
          name;
      // this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      console.log("this.$refs.upload:" + JSON.stringify(this.$refs.upload));
      const fileList = this.uploadList;
      this.uploadList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
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
      }
    },
    handleFormatError(file) { 
      this.$Notice.warning({
        title: "文件格式有误",
        desc:
          "文件名： " +
          file.name +
          " 类型不支持,请选择jpg或者png格式的文件."
      });
    },
    formatDate(time, format = "YY-MM-DD hh:mm:ss") {
      var date = new Date(time);

      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
      var preArr = Array.apply(null, Array(10)).map(function(elem, index) {
        return "0" + index;
      }); ////开个长度为10的数组 格式为 00 01 02 03

      var newTime = format
        .replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

      return newTime;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  },
  mounted() {
    console.log("mounted: "+　this.$refs.upload);
     this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style>
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