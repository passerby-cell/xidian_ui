<template>
  <el-row>
    <el-col :span="24">
      <el-menu :default-active="$route.path" :unique-opened="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-cpu"></i>
            <span class="bigsize">数据分析</span>
          </template>

          <el-menu-item @click="toZaBo()" index="/zabo" key="zabo">
            <span slot="title" class="middlesize">&nbsp;&nbsp;&nbsp;&nbsp;杂波模型</span>
          </el-menu-item>
          <el-menu-item @click="toMuBiao()" index="/mubiao" key="mubiao">
            <span slot="title" class="middlesize">&nbsp;&nbsp;&nbsp;&nbsp;目标检测</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span class="bigsize">系统配置</span>
          </template>
          <el-menu-item @click="toConfig()" index="/config" key="config">
            <span slot="title" class="middlesize">&nbsp;&nbsp;&nbsp;&nbsp;文件配置</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {

    toMuBiao() {
      this.$router.push({ name: "mubiao" });
    },
    toZaBo() {
      this.$router.push({ name: "zabo" });
    },
    toConfig() {
      this.$router.push({ name: "config" });
    },
  },
};
</script>

<style scoped>
@import url("../../../fontsize.css");

.el-menu {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.size {
  font-size: 18px;
}

.subsize {
  font-size: 16px;
}
</style>
