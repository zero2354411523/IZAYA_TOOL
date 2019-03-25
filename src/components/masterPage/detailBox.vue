<template>
  <div id="detail-box" class="h100 w100">
    <div class="title">{{$route.meta.title}}</div>
    <div class="context w100">
      <transition name="move" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="tab-bar" @click="goCatalog">
      <div class="icon-catalog">
        <a-icon type="menu-fold"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "detailBox",
        methods: {
          goCatalog() {
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>
  .title{
    width: 100%;
    height: 50px;
    color: white;
    font-family: ichi-mira;
    font-size: 26px;
    text-align: center;
    line-height: 50px;
    background-color: #4E5055;
  }
  .context{
    height: calc(100% - 50px);
  }
  .tab-bar{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
  }
  .icon-catalog{
    font-size: 36px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 10px;
  }
</style>
