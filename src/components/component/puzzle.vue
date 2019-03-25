<template>
  <div id="puzzle" style="display:inline-block;">
    <div class="puzzle-container">
      <div :style="'position:relative;overflow:hidden;width:'+ dataWidth +'px;'">
        <div :style="'position:relative;width:' + dataWidth + 'px;height:' + dataHeight + 'px;'">
          <img id="scream" ref="scream" :src="imgRandom" :style="'width:' + dataWidth + 'px;height:' + dataHeight + 'px;'">
          <canvas id="puzzle-box" ref="puzzleBox" :width="dataWidth" :height="dataHeight">
          </canvas>
        </div>
        <div class="puzzle-lost-box" :style="'left:' + left_Num + 'px;width:' + dataWidth + 'px;height:' + dataHeight + 'px;'" >
          <canvas id="puzzle-shadow" ref="puzzleShadow" :width="dataWidth" :height="dataHeight"> </canvas>
          <canvas id="puzzle-lost" ref="puzzleLost" :width="dataWidth" :height="dataHeight"></canvas>
        </div>
        <p :class="'ver-tips'+ (displayTips ? ' slider-tips' : '')" ref="verTips">
          <template v-if="verification">
            <i style="background-position:-4px -1207px;"></i>
            <span style="color:#42ca6b;">验证通过</span><span></span>
          </template>
          <template v-if="!verification">
            <i style="background-position:-4px -1229px;"></i>
            <span style="color:red;">验证失败:</span>
            <span style="margin-left:4px;">拖动滑块将悬浮图像正确拼合</span>
          </template>
        </p>
      </div>
      <div class="re-btn" @click="refreshImg"><a></a></div>
    </div><br>
    <div class="slider-container" :style="'width:' + dataWidth + 'px;'">
      <div class="slider-bar">
        <p class="slider-bar-text select-none" onselectstart="return false">按住左边滑块， 拖动完成上方拼图</p>
      </div>
      <div class="slider-btn" ref="sliderBtn" @mousedown="startMove" @touchstart="startMove"></div>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: 'puzzle',
  data () {
    return {
      moveStart: '',
      displayTips: false,
      verification: false,
      randomX: null,
      randomY: null,
      imgRandom: '',
      left_Num: 0,
      dataWidth: 260,
      dataHeight: 120,
      puzzleSize: 48,
      deviation: 4
    }
  },
  props: {
    width: {
      type: [String, Number],
      default: 260
    },
    height: {
      type: [String, Number],
      default: 120
    },
    cropImage: {
      type: [Boolean],
      default: false
    },
    puzzleImgList: {
      type: Array,
      default: () => [
        '../../../static/img/ver.png',
        '../../../static/img/ver-1.png',
        '../../../static/img/ver-2.png',
        '../../../static/img/ver-3.png'
      ]
    },
    PlSize: {
      type: [String, Number],
      default: 48
    },
    Deviation:{
      type: [String, Number],
      default: 4
    },
    padding: {
      type: [Number],
      default: 20
    },
    onSuccess: {
      type: Function,
      default: () => {
        alert('验证成功')
      }
    },
    onError: {
      type: Function,
      default: () => {
        alert('验证失败')
      }
    }
  },
  methods: {
    /* 刷新 */
    refreshImg () {
      let imgRandomNum = this.$common.RandomNum(0, this.puzzleImgList.length)
      this.imgRandom = this.puzzleImgList[imgRandomNum]
      this.initCanvas()
    },
    /* 画布初始化 */
    initCanvas () {
      this.clearCanvas()

      // let self = this
      let w = this.dataWidth
      let h = this.dataHeight
      // let PL_Size = 48
      // 2019-02-12开始PL_Size使用可传递参数
      let PL_Size = this.puzzleSize
      let padding = 20
      let MinN_X = padding + PL_Size
      let MaxN_X = w - padding - PL_Size - PL_Size / 6
      let MaxN_Y = padding
      let MinN_Y = h - padding - PL_Size - PL_Size / 6
      this.randomX = this.$common.RandomNum(MinN_X, MaxN_X)
      this.randomY = this.$common.RandomNum(MinN_Y, MaxN_Y)
      let X = this.randomX
      let Y = this.randomY
      this.left_Num = -X + 10
      let d = PL_Size / 3

      let c = this.$refs.puzzleBox
      let c_l = this.$refs.puzzleLost
      let c_s = this.$refs.puzzleShadow
      let ctx = c.getContext('2d')
      let ctx_l = c_l.getContext('2d')
      let ctx_s = c_s.getContext('2d')
      ctx.globalCompositeOperation = 'xor'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fff'
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.beginPath()
      ctx.lineWidth = '1'
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      ctx.moveTo(X, Y)
      ctx.lineTo(X + d, Y)
      ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctx.lineTo(X + 3 * d, Y)
      ctx.lineTo(X + 3 * d, Y + d)
      ctx.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctx.lineTo(X + 3 * d, Y + 3 * d)
      ctx.lineTo(X, Y + 3 * d)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()

      let img = new Image()
      img.src = this.imgRandom
      img.onload = function () {
        ctx_l.drawImage(img, 0, 0, w, h)
      }
      ctx_l.beginPath()
      ctx_l.strokeStyle = 'rgba(0,0,0,0)'
      ctx_l.moveTo(X, Y)
      ctx_l.lineTo(X + d, Y)
      ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctx_l.lineTo(X + 3 * d, Y)
      ctx_l.lineTo(X + 3 * d, Y + d)
      ctx_l.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctx_l.lineTo(X + 3 * d, Y + 3 * d)
      ctx_l.lineTo(X, Y + 3 * d)
      ctx_l.closePath()
      ctx_l.stroke()
      ctx_l.shadowBlur = 10
      ctx_l.shadowColor = 'black'
      ctx_l.clip()
      ctx_s.beginPath()
      ctx_s.lineWidth = '1'
      ctx_s.strokeStyle = 'rgba(0,0,0,0)'
      ctx_s.moveTo(X, Y)
      ctx_s.lineTo(X + d, Y)
      ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
      ctx_s.lineTo(X + 3 * d, Y)
      ctx_s.lineTo(X + 3 * d, Y + d)
      ctx_s.bezierCurveTo(X + 2 * d, Y + d, X + 2 * d, Y + 2 * d, X + 3 * d, Y + 2 * d)
      ctx_s.lineTo(X + 3 * d, Y + 3 * d)
      ctx_s.lineTo(X, Y + 3 * d)
      ctx_s.closePath()
      ctx_s.stroke()
      ctx_s.shadowBlur = 20
      ctx_s.shadowColor = 'black'
      ctx_s.fill()
    },
    /* 通过重置画布尺寸清空画布，这种方式更彻底 */
    clearCanvas () {
      debugger
      let c = this.$refs.puzzleBox
      let c_l = this.$refs.puzzleLost
      let c_s = this.$refs.puzzleShadow
      c.setAttribute('height', c.getAttribute('height'))
      c_l.setAttribute('height', c.getAttribute('height'))
      c_s.setAttribute('height', c.getAttribute('height'))
      // c.height = c.height
      // c_l.height = c_l.height
      // c_s.height = c_s.height
    },
    /* 按住滑块后初始化移动监听，记录初始位置 */
    startMove (e) {
      console.log(e)
      e = e || window.event
      this.$refs.sliderBtn.style.backgroundPosition = '0 -216px'
      this.moveStart = e.pageX || e.targetTouches[0].pageX
      this.addMouseMoveListener()
    },
    /* 滑块移动 */
    moving (e) {
      debugger
      let self = this
      e = e || window.event
      let moveX = e.pageX || e.targetTouches[0].pageX
      let d = moveX - self.moveStart
      let w = self.dataWidth
      let PL_Size = this.puzzleSize
      let padding = 20
      if (self.moveStart === '') {
        return ''
      }
      if (d < 0 || d > (w - padding - PL_Size)) {
        return ''
      }
      self.$refs.sliderBtn.style.left = d + 'px'
      self.$refs.sliderBtn.style.transition = 'inherit'
      self.$refs.puzzleLost.style.left = d + 'px'
      self.$refs.puzzleLost.style.transition = 'inherit'
      self.$refs.puzzleShadow.style.left = d + 'px'
      self.$refs.puzzleShadow.style.transition = 'inherit'
    },
    /* 移动结束，验证并回调 */
    moveEnd (e) {
      let self = this
      e = e || window.event
      let moveEnd_X = (e.pageX || e.changedTouches[0].pageX) - self.moveStart
      let ver_Num = self.randomX - 10
      let deviation = this.deviation
      let Min_left = ver_Num - deviation
      let Max_left = ver_Num + deviation
      if (self.moveStart !== '') {
        if (Max_left > moveEnd_X && moveEnd_X > Min_left) {
          self.displayTips = true
          self.verification = true
          setTimeout(function () {
            self.displayTips = false
            self.initCanvas()
          }, 1000)
          /* 成功的回调函数 */
          self.onSuccess()
        } else {
          self.displayTips = true
          self.verification = false
          setTimeout(function () {
            self.displayTips = false
          }, 2000)
          /* 失败的回调函数 */
          self.onError()
        }
      }
      if (typeof(self.$refs.sliderBtn) !== 'undefined' && typeof (self.$refs.puzzleLost) !== 'undefined' && typeof (self.$refs.puzzleShadow) !== 'undefined') {
        setTimeout(function () {
          self.$refs.sliderBtn.style.left = 0
          self.$refs.sliderBtn.style.transition = 'left 0.5s'
          self.$refs.puzzleLost.style.left = 0
          self.$refs.puzzleLost.style.transition = 'left 0.5s'
          self.$refs.puzzleShadow.style.left = 0
          self.$refs.puzzleShadow.style.transition = 'left 0.5s'
        }, 1000)
        self.$refs.sliderBtn.style.backgroundPosition = '0 -84px'
      }
      self.moveStart = ''
    },
    /* 全局绑定滑块移动与滑动结束，移动过程中鼠标可在页面任何位置 */
    addMouseMoveListener () {
      let self = this
      document.addEventListener('mousemove', self.moving)
      document.addEventListener('touchmove', self.moving)
      document.addEventListener('mouseup', self.moveEnd)
      document.addEventListener('touchend', self.moveEnd)
    }

  },
  mounted () {
    this.initCanvas()
  },
  created () {
    let imgRandomNum = this.$common.RandomNum(0, this.puzzleImgList.length - 1)
    this.imgRandom = this.puzzleImgList[imgRandomNum]
    this.puzzleSize = Number(this.PlSize)
    this.deviation = Number(this.Deviation)
  },
  watch: {
  }
}
</script>

<style scoped>
.slider-btn{position:absolute;width:44px;height:44px;left:0;top:-7px;z-index:12;cursor:pointer;background-image:url(../../../static/img/sprite.3.2.0.png);background-position:0 -84px;transition:inherit}
.ver-tips {position:absolute;left:0;bottom:-22px;background:rgba(255,255,255,.9);height:22px;line-height:22px;font-size:12px;width:100%;margin:0;text-align:left;padding:0 8px;transition:all .4s}
.slider-tips{bottom:0}
.ver-tips i{display:inline-block;width:22px;height:22px;vertical-align:top;background-image:url(../../../static/img/sprite.3.2.0.png);background-position:-4px -1229px}
.ver-tips span{display:inline-block;vertical-align:top;line-height:22px;color:#455}
.active-tips{display:block}
.hidden{display:none}
.re-btn{position:absolute;left:0;bottom:0;height:28px;padding:0 16px}
.re-btn a{display:inline-block;width:14px;height:14px;margin:7px 0;background-image:url(../../../static/img/sprite.3.2.0.png);background-position:0 -1179px;cursor:pointer}
.re-btn a:hover{background-position:0 -1193px}

.puzzle-container{position:relative;padding:16px 16px 28px;border:1px solid #ddd;background:#f2ece1;border-radius:16px;}
.slider-container{position:relative;margin:auto;}
.slider-bar{border:1px solid #c3c3c3;border-radius:24px;background:#ece4dd;box-shadow:0 1px 1px rgba(12,10,10,0.2) inset;}
.slider-bar-text{font-size:12px;color: #486c80;line-height:28px;margin:0;text-align:right;padding-right:22px;}

#puzzle-box{position:absolute;left:0;top:0;z-index:22;}
#puzzle-shadow{position:absolute;left:0;top:0;z-index:22;}
#puzzle-lost{position:absolute;left:0;top:0;z-index:33;}
.puzzle-lost-box{position:absolute;width:260px;height:116px;left:0;top:0;z-index:111;}

</style>
