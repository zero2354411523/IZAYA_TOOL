<template>
    <div id="image-box" :class="boxStyle">
      <img :class="imageStyle" :src="isLoadStart ? src : ''" :alt="alt" ref="theImg">
    </div>
</template>

<script lang="js">
export default {
  name: 'izImage',
  data () {
    return {
      boxStyle: 'aspectFill',
      cMode: 'aspectFill',
      cLazyLoad: false,
      imageStyle: '',
      scaleModeList: ['scaleToFill', 'aspectFit', 'aspectFill', 'widthFix'],
      naturalHeight: null,
      naturalWidth: null,
      isLoadStart: false
    }
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.initData()
    this.modeChangeClass()
    this.initImageStyle()
  },
  mounted () {
    this.checkLazyLoad()
    if (this.cLazyLoad) {
      this.checkLazyLoad()
      this.addScrollListener()
    }
  },
  methods: {
    initData () {
      if (this.mode === '') {
        this.cMode = 'aspectFill'
      }else {
        this.cMode = this.mode
      }
      if (this.lazyLoad === '' || this.lazyLoad === true || this.lazyLoad === 'true'){
        this.cLazyLoad = true
      } else {
        this.isLoadStart = true
      }
    },
    modeChangeClass () {
      let self = this
      if (self.scaleModeList.indexOf(self.cMode) === -1) {
        this.boxStyle = this.$common.replaceAll(self.cMode, ' ', '-')
      }
    },
    initImageStyle () {
      let self = this
      if (self.scaleModeList.indexOf(self.cMode) === -1) {
        return ''
      }
      if (self.scaleModeList.indexOf(self.cMode) === 0) {
        self.imageStyle = 'hw100'
      } else if (self.scaleModeList.indexOf(self.cMode) === 3) {
        self.imageStyle = 'w100'
      } else {
        let img = new Image()
        img.src = self.src
        img.onload = () => {
          let naturalHeight = img.naturalHeight
          let naturalWidth = img.naturalWidth
          if (self.scaleModeList.indexOf(self.cMode) === 1) {
            if (naturalHeight > naturalWidth) {
              self.imageStyle = 'h100'
            } else {
              self.imageStyle = 'w100'
            }
          } else if (self.scaleModeList.indexOf(self.cMode) === 2) {
            if (naturalHeight > naturalWidth) {
              self.imageStyle = 'w100'
            } else {
              self.imageStyle = 'h100'
            }
          }
        }
      }
    },
    checkLazyLoad () {
      let toTop = this.$refs.theImg.offsetTop
      let clientHeight = document.documentElement.clientHeight
      let scrollTop = document.documentElement.scrollTop
      if(toTop - scrollTop - clientHeight <= 100){
        this.isLoadStart = true
      }
    },
    addScrollListener () {
      let self  = this
      document.addEventListener('scroll', self.checkLazyLoad)
    }
  }
}
</script>

<style scoped>
#image-box{
  overflow: hidden;
}
.scaleToFill,
.aspectFit,
.aspectFill,
.widthFix{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.top{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}
.bottom{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
}
.center{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.left{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
}
.right{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: center;
}
.top-left{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.top-right{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-start;
}
.bottom-left{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-end;
}
.bottom-right{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
