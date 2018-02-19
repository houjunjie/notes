import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/page/home'
// import youDonNotKnowJavascript from '@page/youDonNotKnowJavascript'

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
      component: Home,
      children: [{
        path: '/wutheringHeights',
        redirect: '/wutheringHeights/wutheringHeights-1.md'
      }, {
        path: '/wutheringHeights/:filename',
        component: Home
      }]
    },
    {
      path: '/ydnj',
      component: Home,
      children: [{
        path: '/ydnj',
        redirect: '/ydnj/ydnj-1.md'
      }, {
        path: '/ydnj/:filename',
        component: Home
      }]
    }
  ]
})
