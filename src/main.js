// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// @ts-ignore
import App from './App';
import router from './router';
import axios from 'axios';
import { requestData, requestBlob } from './myAxios/axios';
import store from './store/store';
import common from '../static/js/common';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '../static/css/main.css';
import '../static/css/common.css';
import '../static/css/font.css';
import '../static/css/markdown.css';
Vue.use(ElementUI);
Vue.use(Antd);
Vue.prototype.$common = common; // 共用方法
Vue.prototype.$requestData = requestData; // 共用方法
Vue.prototype.$requestBlob = requestBlob; // 共用方法
Vue.config.productionTip = false;
/* 请求开始设置loading状态，阻止同一用户瞬间多次请求 */
axios.interceptors.request.use(config => {
    store.commit('startLoading');
    setTimeout(function () {
        store.commit('finishLoading');
    }, 30000);
    return config;
});
/* 请求结束取消loading状态，可以继续访问 */
axios.interceptors.response.use(config => {
    store.commit('finishLoading');
    return config;
}, error => {
    store.commit('finishLoading');
    let str = error + '';
    if (str.search('timeout') !== -1) { // 超时error捕获
        alert('请求超时');
    }
    else {
        alert('系统或网络错误');
    }
});
/* 未匹配到路由跳转到404 */
router.beforeEach((to, from, next) => {
    let path = to.path;
    if (to.matched.length === 0 && path !== '/notFound') {
        next('/notFound');
    }
    // if (sessionStorage.getItem('isLogin') === 'false' && path !== '/login') {
    //   next('/login')
    // }
    else {
        next();
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});
//# sourceMappingURL=main.js.map