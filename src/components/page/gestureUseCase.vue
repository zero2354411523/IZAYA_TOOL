<template>
  <!--<div class="data-show" @touchstart="gestureForPage.touchStart($event)" @touchmove="gestureForPage.touchMoving($event)" @touchend="gestureForPage.touchEnd($event)">-->
  <div class="data-show">
    <div style="width: 100%;word-break: break-word; word-wrap:break-spaces;overflow: hidden;">
      <!--<div v-html="gestureMD" class="markdown"></div>-->
      <div class="data-show-box">
        {{userAgent}}
      </div>
      <div class="data-show-box">
        {{JSON.stringify(gestureForPage)}}
      </div>
      <div class="markdown">
        <pre>
          <code>
            {{template1}}
          </code>
        </pre>
      </div>
      <div class="user-test-area" ref="testPage">
        可在此区域滑动测试
      </div>
    </div>
    <!--<div class="pie" style=""></div>-->
  </div>
</template>

<script lang="js">
  import showdown from 'showdown'
  import readme from '../../../static/markdown/INTERVAL.md'
  // import readme from '../../../README.md'
  import {gesture} from "../../tools/gesture"
  export default {
    name: 'gestureUseCase',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        gestureForPage: null,
        userAgent: navigator.userAgent,
        gestureMD: readme,
        gestureMDH: '',
        template1: ''
      }
    },
    methods: {
    },
    components: {
      showdown
    },
    created() {

    },
    mounted() {
      let gestureForPage = new gesture(this.$refs.testPage)
      gestureForPage.swipeRight = () => alert('右划了')
      gestureForPage.swipeLeft = () => alert('左滑了')
      gestureForPage.longSwipeRight = () => alert('long右划了')
      gestureForPage.longSwipeLeft = () => alert('long左滑了')

      this.gestureForPage = gestureForPage
      // this.$refs.userAgent.addEventListener('touchstart',(e) => e.stopPropagation())
      // this.$refs.userAgent.addEventListener('touchmove',(e) => e.stopPropagation())
      // this.$refs.userAgent.addEventListener('touchend',(e) => e.stopPropagation())
      let converter = new showdown.Converter()
      let text = this.gestureMD.toString()
      this.gestureMDH = converter.makeHtml(text)

      this.template1 = `let gestureForPage = new gesture(this.$refs.testPage)
          gestureForPage.swipeRight = () => alert('右划了')
          gestureForPage.swipeLeft = () => alert('左滑了')
          gestureForPage.longSwipeRight = () => alert('long右划了')
          gestureForPage.longSwipeLeft = () => alert('long左滑了')`
    }
  }
</script>

<style scoped lang="less">
  @import '../../../static/css/method.less';
  .data-show{
    height: 100%;
    width: 100%;
  }
  /*.pie{*/
    /*width: 50px;*/
    /*height: 50px;*/
    /*border-radius: 50%;*/
    /*background-color: #6F9FD8;*/
    /*border-bottom: 50px solid #FC766A;*/
    /*border-top: 50px solid #F1DD61;*/
    /*border-right: 50px solid #A7CEB9;*/
    /*border-left: 50px solid #B9B7D4;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translateX(-50%) translateY(-50%) scale(1);*/
  /*}*/

  .user-test-area{
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    font-size: 24px;
    color: #ccc;
    .text-center-height(150px)
  }
</style>
