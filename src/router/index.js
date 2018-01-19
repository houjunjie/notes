import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import WutheringHeights from '@/page/wutheringHeights'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/wutheringHeights'
    },
    {
      path: '/wutheringHeights',
      component: WutheringHeights,
      children: [{
        path: '/WutheringHeights/:md',
        component: WutheringHeights
      }]
    }
  ]
})
