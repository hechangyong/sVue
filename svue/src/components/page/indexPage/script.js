import item from './compoents/item.vue'

export default {
  name: 'IndexPage',
  isPage: true,
  title: '我的',
  data () {
    return {
      addressDetail: '',
      userDetail: ''
    }
  },
  methods: {
    switchTo (path, obj) {
      var data = {
        'userid': this.userDetail.id
      }
      if (obj) {
        Object.assign(data, obj)
      }
      this.$switchTo('/' + path, data)
    },
    mockUser () {
      console.log('---------------111111111111111111-----------------')
      this.$showLoading()
      this.userDetail.nickName = '何长勇'
      this.userDetail.headImgUrl = 'http://thirdwx.qlogo.cn/mmopen/XpSgr1oanco9VL0FcYgHIkGv6Acu7Lco8jwQmRNScCRrCGRysM1f7ZJ9Z5QZ7a7qgvg90ZDRtRh28dI6OgdEv45QTEE6nkFq/132'
    }
  },
  components: {
    item
  }
}
