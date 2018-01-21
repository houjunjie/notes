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
              <router-link :to="'/WutheringHeights/'+subItem.filename">
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
    this.getJson()

    this.handleClick(this.$route.params.filename)
  },
  methods: {
    getJson: function () {
      const url = '/static/json/wutheringHeights.json';
      axios.get(url).then(res => {
        this.navList = res.data
        console.log(res.data,'1', this.navList);
      })
      .catch(err => {
        console.log(err);
      })
    },
    getmdHtml: function (filename) {
      const url = `/static/md/wutheringHeights/${filename}`
      axios.get(url).then(res => {
        console.log(res,'2');
        this.mdHtml = md.render(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleClick: function (filename) {
      this.getmdHtml(filename)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
