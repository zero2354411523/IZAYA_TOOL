import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: config.routerMode,
  routes: [
    {
      path: '/',
      redirect: '/catalog'
    },
    {
      path: '/notFound',
      component: resolve => require(['../components/page/notFound.vue'], resolve),
      meta: { title: 'notFound' }
    },
    {
      path: '/catalog',
      component: resolve => require(['../components/page/catalog.vue'], resolve),
      meta: { title: 'catalog' }
    },
    {
      path: '/',
      component: resolve => require(['../components/masterPage/detailBox.vue'], resolve),
      meta: { title: '' },
      children: [
        {
          path: '/gesture',
          component: resolve => require(['../components/page/gestureUseCase.vue'], resolve),
          meta: { title: 'gesture' }
        }
      ]
    }
  ]
})
