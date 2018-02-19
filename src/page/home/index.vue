<template>
  <el-container>
    <el-aside width="200px">
      <div class="aside-inner">
        <div v-for='(item, i) in navList' :key='i'>
          <!--侧边导航  -->
          <span>{{item.title}}</span>
          <ul>
            <li v-for='(subItem,key) in item.subNav' :key='key'
            @click="handleClick(subItem.filename)">
              <router-link :to="'/'+state.active+'/'+subItem.filename">
                {{subItem.title}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div v-html='mdHtml' class="markdown-body" v-show='mdHtml.length>0'></div>
    </el-main>
  </el-container>
</template>

<script>
import MarkdownIt from 'markdown-it'
import axios from 'axios'
import { log } from 'util';
import { mapState, mapMutations } from 'vuex'
import { CHANGE_ACTIVE } from '../../store'
const md = new MarkdownIt({
  html: true,
	linkify: true,
	typographer: true,
	highlight: function(str, lang) {
		// if (lang && hljs.getLanguage(lang)) {
		// 	try {
		// 		return hljs.highlight(lang, str).value;
		// 	} catch (__) { }
		// }

		// return '';
	}
})

export default {
  name: 'wutheringHeights',
  data () {
    return {
      navList: [],
      msg: 'Welcome to Your Vue.js App',
      mdHtml: []
    }
  },
  created: function () {
    // this.getJson(this.$route.params.filename)
    this.handleClick(this.$route.params.filename)
    // console.log(store);
  },
  computed: {
    ...mapState({state: state => state})
  },
  watch: {
    //监听路由，只要路由有变化(路径，参数等变化)都有执行下面的函数，你可以
    $route: {
      handler: function (val, oldVal) {
        this.handleClick(this.$route.params.filename)
      },
      deep: true
    }
  },
  methods: {
    getJson: function (filename) {
      let file = filename.substr(0, filename.indexOf('-'));
      const url = '/static/json/'+file+'.json';
      axios.get(url).then(res => {
        this.navList = res.data
        console.log(res.data,'1', this.navList);
      })
      .catch(err => {
        console.log(err);
      })
    },
    getmdHtml: function (filename) {
      let file = filename.substr(0, filename.indexOf('-'));
      const url = `/static/md/${file}/${filename}`
      axios.get(url).then(res => {
        this.mdHtml = md.render(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleClick: function (filename) {
      this.getmdHtml(filename)
      this.getJson(filename)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
