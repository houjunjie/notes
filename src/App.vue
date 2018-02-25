<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          呼啸山庄
        </el-menu-item>
        <el-menu-item index="2">
          你不知道的JavaScript
        </el-menu-item>
        <el-menu-item index="3">傲慢与偏见</el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </el-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { CHANGE_ACTIVE } from './store'
export default {
  name: 'App',
  data() {
    return {
      activeIndex:'1'
    }
  },
  methods: {
    ...mapMutations([CHANGE_ACTIVE]),
    handleSelect(key, keyPath) {
      const keyArr = ['wutheringHeights', 'ydnj']
      // console.log(this.$store)
      this.CHANGE_ACTIVE(keyArr[key-1])
      this.$router.push({path: `/${keyArr[key-1]}`})
    }
  }
}
</script>

<style>
@import 'github-markdown-css';
.el-menu{
  padding: 0;
}
.el-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  z-index: 100001;
}

.active a {
    color: #039be5;
}

.aside-inner::-webkit-scrollbar {
    width: 4px;
}

.aside-inner::-webkit-scrollbar-track {
    height: 30px;
}

.aside-inner::-webkit-scrollbar-button {
    display: none;
}

.aside-inner::-webkit-scrollbar-thumb {
    background: #B7B7B7;
    border-radius: 4px;
}
.el-aside{
  padding-top: 70px;
  position: relative;
}
.aside-inner {
  position: fixed;
  width: 168px;
  height: 85%;
  padding: 16px;
  margin: 0;
  background-color: #F7F7F7;
  overflow-y: auto;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
a{
  text-decoration: none;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
/*路由跳转触发被选中元素  */

.router-link-active {
    color: #039be5!important;
}

.el-aside ul li {
    line-height: 16px;
    margin: 8px 0 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.el-aside ul a {
    font-size: 13px;
    color: #212121;
    line-height: 16px;
}

.el-aside ul li:hover a {
    color: #039be5;
    font-weight: 500;
}

.el-aside span {
    font-size: 14px;
    font-weight: bold;
    color: gray;
}

</style>
