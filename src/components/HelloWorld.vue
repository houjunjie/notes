<template>
  <div class="hello">
    <div v-html='mdHtml' class="markdown-body" v-show='mdHtml.length>0'></div>
  </div>
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
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mdHtml: []
    }
  },
  created: function () {
    this.getmdHtml()
  },
  methods: {
    getmdHtml: function () {
      const url = '/static/md/wutheringHeights/day-one.md'
      axios.get(url).then(res => {
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
