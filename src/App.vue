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
        <el-menu-item index="1">呼啸山庄</el-menu-item>
        <el-menu-item index="2">呼啸山庄</el-menu-item>
        <el-menu-item index="3">呼啸山庄</el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex:'1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, );
    }
  }
}
</script>

<style>
.el-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
}
.el-main{
  padding-top: 70px;
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
@import 'github-markdown-css'
</style>
