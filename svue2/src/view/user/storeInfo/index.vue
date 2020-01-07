<template>
  <div class="item_desc" v-if="desc != ''">
    <div class="item_desc_title">店铺资质</div>
    <div class="item_desc_wrap">
      <img style="width: 100%;" alt src="../../../assets/images/a.jpg" />
      <img style="width: 100%;" alt src="../../../assets/images/b.jpg" />
    </div>
  </div>
</template>
<script  >
export default {
  data() {
    return {
      desc:
        '<img style="width: 100%;" alt="" src="../../assets/images/a.jpg">' +
        '<img style="width: 100%;" alt="" src="../../assets/images/b.jpg">'
    };
  }
};
</script>
<style lang="less">
.item_desc {
  background-color: #fff;
  p {
    padding: 0 10px;
  }
  /deep/ img {
    max-width: 100%;
    display: block;
    height: 8.4rem;
  }
}

.item_desc_title {
  font-size: 18px;
  // @include one-border;
  padding: 10px 0;
  text-align: center;
  font-weight: 600;
}
</style>
