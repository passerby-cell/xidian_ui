<template>
  <div style="height: 100%;width: 100%;overflow: hidden">
    <!-- <dv-full-screen-container> -->
    <!-- <el-row style="height: 5px;">
                                                                              <el-col :span="8"><dv-decoration-2 style="width:100%;height:5px;" :color="['#1541c2', '#5089da']" /></el-col>
                                                                              <el-col :span="8"><dv-decoration-2 style="width:100%;height:5px;" :color="['#1541c2', '#5089da']" /></el-col>
                                                                              <el-col :span="8"><dv-decoration-2 style="width:100%;height:5px;" :color="['#1541c2', '#5089da']" /></el-col>
                                                                            </el-row> -->
    <dv-border-box-11 title="雷达回波分析系统" :titleWidth="380" class="hearder" :color="['#1541c2', '#5089da']">
      <el-row style="top: 50px; height: 30px;">
        <el-col :span="8"><dv-decoration-6 style="width:100%;height:30px;" :color="['#1541c2', '#5089da']" /></el-col>
        <el-col :span="8"><dv-decoration-5 :reverse="true" style="width:100%;height:30px;" :dur="Number(3)"
            :color="['#6987d6', '#5089da']" /></el-col>
        <el-col :span="8"><dv-decoration-6 style="width:100%;height:30px;" :color="['#1541c2', '#5089da']" /></el-col>
      </el-row>
      <el-row>

        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-row>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </dv-border-box-11>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>

import SideBar from "./components/SideBar/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: { SideBar, Footer },
  mounted() { },
};
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.hearder>>>.dv-border-box-11-title {
  font-size: 35px !important;
  fill: #1541c2 !important;
}

.hearder {
  overflow: hidden
}

.el-footer {
  min-width: 1090px;
  height: 60px !important;
}

.el-aside {
  min-width: 200px;
  float: left;
  margin-top: 50px;
  margin-left: 15px;
  /* background-color: #8bacff; */
}

.el-main {
  width: calc(100vw - 250px);
  padding: 0px;
  height: calc(100vh - 150px);
  margin-top: 50px;
  min-width: 1600px !important;
  overflow: hidden;
  background-color: #aecaffac;
  border-radius: 1.5%;
}
</style>
