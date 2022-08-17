<template>
  <div>
    <el-container style="height: 100%" v-if="$route.meta.show">
      <el-header v-if="$route.meta.show">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="$route.meta.show">
          <SideBar></SideBar>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer v-if="$route.meta.show">
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <Login v-if="!$route.meta.show"></Login>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import SideBar from "./components/SideBar/index.vue";
import Footer from "./components/Footer/index.vue";
import Login from "@/pages/Login";

export default {
  name: "App",
  components: { Header, SideBar, Footer, Login },
  mounted() {},
};
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0px;
}
.el-header {
  min-width: 1290px;
}
.el-footer {
  min-width: 1090px;
}

.el-aside {
  background-color: #d3dce6;
  min-width: 200px;
  height: calc(100vh - 60px);
}
.el-main {
  min-width: 1090px;
  padding: 0px;
  height: calc(100vh - 120px);
}
</style>
