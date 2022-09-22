<template>
  <el-row>
    <el-col :span="24">
      <el-menu default-active="1-1">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-cpu"></i>
            <span class="size">我的作业</span>
          </template>

          <el-menu-item @click="toJob()" index="1-1">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;作业列表</span
            >
          </el-menu-item>
          <el-menu-item @click="goStandardJob()" index="1-2">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;新建作业</span
            >
          </el-menu-item>
        </el-submenu>
        <!-- <div @click="toData">
          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-takeaway-box"></i>
              <span class="size">模型管理</span>
            </template> -->
        <!-- <el-menu-item>
            <span slot="title" @click="toImages">镜像管理</span>
          </el-menu-item> -->
        <!-- </el-menu-item>
        </div> -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-takeaway-box"></i>
            <span class="size">模型管理</span>
          </template>
          <el-menu-item @click="toData" index="2-1">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;模型数据上传</span
            >
          </el-menu-item>
          <el-menu-item @click="toResultData" index="2-2">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;模型结果下载</span
            >
          </el-menu-item>
        </el-submenu>

        <div @click="toDataView">
          <el-menu-item index="3">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span class="size">数据集</span>
            </template>
            <!-- <el-menu-item>
            <span slot="title" @click="toImages">镜像管理</span>
          </el-menu-item> -->
          </el-menu-item>
        </div>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-copy-document"></i>
            <span class="size">镜像仓库</span>
          </template>
          <el-menu-item index="4-1" @click="toImages">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;镜像概览</span
            >
          </el-menu-item>
          <el-menu-item index="4-2" @click="toCreateImages">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;镜像制作</span
            >
          </el-menu-item>
        </el-submenu>
        <div @click="toIDE">
          <el-menu-item index="5">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span class="size">在线IDE</span>
            </template>
            <!-- <el-menu-item>
            <span slot="title" @click="toImages">镜像管理</span>
          </el-menu-item> -->
          </el-menu-item>
        </div>
        <div @click="toUserInfo">
          <el-menu-item index="6">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span class="size">个人中心</span>
            </template>
            <!-- <el-menu-item>
            <span slot="title" @click="toImages">镜像管理</span>
          </el-menu-item> -->
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { Loading } from "element-ui";

export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {
    toCreateImages() {
      this.$router.push({ name: "createimage" });
    },
    toProcessView() {
      this.$router.push({ name: "processview" });
    },
    toDataView() {
      this.$router.push({ name: "dataview" });
    },
    toResultView() {
      this.$router.push({ name: "resultview" });
    },
    toJob() {
      this.$router.push({ name: "job" });
    },
    goStandardJob() {
      this.$router.push({ name: "standardjob" });
    },
    toData() {
      this.$router.push({ name: "data" });
    },
    toResultData() {
      this.$router.push({ name: "resultdata" });
    },
    toImages() {
      this.$router.push({ name: "images" });
    },
    toIDE() {
      this.$router.push({ name: "ide" });
    },
    toUserInfo() {
      this.$router.push({ name: "userinfo" });
    },
  },
};
</script>

<style scoped>
.el-menu {
  height: calc(100vh - 60px);
  overflow: auto;
}
.size {
  font-size: 18px;
}
.subsize {
  font-size: 16px;
}
</style>
