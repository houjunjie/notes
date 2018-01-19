// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false
// 设置路由跳转至其他页面时默认在顶部位置
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
