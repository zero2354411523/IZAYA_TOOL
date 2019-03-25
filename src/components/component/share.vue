<template>
  <div id="share-template">
    <el-popover
      placement="top"
      width="250"
      v-model="visible2">
      <div class="flex-row-around">
        <svg class="icon pointer" aria-hidden="true" @click="share('QQ')">
          <use xlink:href="#icon-QQ"></use>
        </svg>
        <svg class="icon pointer" aria-hidden="true" @click="share('weibo')">
          <use xlink:href="#icon-weibo"></use>
        </svg>
        <svg class="icon pointer" aria-hidden="true" @click="share('QZ')">
          <use xlink:href="#icon-kongjian"></use>
        </svg>
        <el-popover
          placement="top"
          v-model="displayQR">
          <!--<div><img :src="'http://qr.liantu.com/api.php?text=' + url" alt="" style="width: 150px;"></div>-->
          <p style="width: 150px;font-family: ichi-mira;">手机打开微信扫描上方二维码，进入微信后使用右上角菜单栏分享</p>
          <svg class="icon pointer" aria-hidden="true" slot="reference">
            <use xlink:href="#icon-weixin"></use>
          </svg>
        </el-popover>
      </div>
      <el-button slot="reference">分享</el-button>
    </el-popover>

  </div>
</template>

<script lang="js">
export default {
  name: 'share',
  data () {
    return {
      displayQR: false,
      visible2: false,
      visible3: false
    }
  },
  props: {
    url: {
      type: [String],
      default: 'https://www.jianshu.com/u/42be3945a3bd'
    },
    title: {
      type: [String],
      default: '推荐阅读，vue分享组件-简书，作者：亚泽伊'
    },
    summary: {
      type: [String],
      default: '亚泽伊的简书个人主页，包含Vue项目工程化，前端豆知识等'
    },
    pic: {
      type: [String],
      default: 'http://pic-oskysolo.oss-cn-hangzhou.aliyuncs.com/181214164417236410.jpg?Expires=1860137057&OSSAccessKeyId=LTAIrCkSyf7SgQND&Signature=EII74rn4a7YjtFvIgFOSxpa38Ig%3D'
    },
    site: {
      type: [String],
      default: '亚泽伊'
    }
  },
  methods: {
    share (target) {
      let map = {
        url: this.url, /*  获取URL，可加上来自分享到QQ标识，方便统计 */
        desc: this.summary, /*  分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔  */
        title: this.title, /*  分享标题(可选)  */
        summary: this.summary, /*  分享描述(可选)  */
        pics: this.pic, /*  分享图片(可选)  */
        flash: '', /*  视频地址(可选)  */
        site: this.site, /*  分享来源 (可选) */
        appkey: '', /* 新浪微博参数，您申请的应用appkey,显示分享来源(可选) */
        ralateUid: '', /* 关联用户的UID，分享微博会@该用户(可选) */
        rnd: new Date().valueOf(), /* 微博用参数 */
        showcount: '1' /* QQ空间，是否显示分享总数,显示：'1'，不显示：'0' */
      }
      let list = []
      for (let index in map) {
        list.push(index + '=' + encodeURIComponent(map[index] || ''))
      }
      let targetUrl = 'http://connect.qq.com/widget/shareqq/index.html?' + list.join('&')
      if (target === 'WX') {
        this.displayQR = true
      }
      if (target === 'QQ') {
        targetUrl = 'http://connect.qq.com/widget/shareqq/index.html?' + list.join('&')
      }
      if (target === 'weibo') {
        targetUrl = 'http://service.weibo.com/share/share.php?' + list.join('&')
      }
      if (target === 'QZ') {
        targetUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + list.join('&')
      }
      window.open(targetUrl)
    }
  }
}
</script>

<style scoped>
.icon{
  width: 3em;
  height: 3em;
}
</style>
