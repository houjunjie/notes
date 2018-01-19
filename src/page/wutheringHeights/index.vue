<template>
  <el-container>
    <el-aside width="200px">
      <ul>
        <li v-for='(Item,key) in navList' :key='key'>
          <router-link :to="'/WutheringHeights/'+Item.filename">
            {{Item.title}}
          </router-link>
        </li>
      </ul>
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
    this.getmdHtml()
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
    getmdHtml: function () {
      const url = '/static/md/wutheringHeights/day-one.md'
      axios.get(url).then(res => {
        console.log(res,'2');
        this.mdHtml = md.render(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
