<template>
  <div>
    <div class="title">Catalogue</div>
    <div class="catalog-box">
      <div class="catalog-item" v-for="(item,index) in bgColorList" :style="'background-color: #' + item" @click="goUseCase(routerList[index])">{{routerList[index]}}</div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "catalog",
      data () {
        return {
          bgColorList: ['F4E0E9','CE93C3','FDF4CD','FFCEBF','80E5F7','EB505E','F7C4A7','EAECA1','DDE0E7','CEE1EF','A0C9E9','D1D7E5'],
          routerList: ['gesture'],
          userAgent: navigator.userAgent
        }
      },
      methods: {
        goUseCase(name) {
          this.$router.push(name)
        }
      },
      created() {

      },
      mounted() {

      }
    }
</script>

<style scoped lang="less">
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
  .catalog-box{
    display: flex;
    flex-flow: row wrap;
  }
  .catalog-item{
    width: calc(50% - 4px);
    height: 100px;
    color: BLACK;
    font-family: ichi-mira;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    line-height: 100px;
    margin: 2px;
  }
</style>
