<template>
  <div>
    <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight">
      <el-breadcrumb separator="/" class="bigsize">
        <el-breadcrumb-item class="bigsize">系统配置</el-breadcrumb-item>
        <el-breadcrumb-item class="bigsize">文件配置</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card class="card-style" shadow="hover" :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 180px); overflow: auto">
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-tag type="primary" effect="dark" size="medium " class="middlesize">算法输出目录</el-tag>
      </Transition>
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-table :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style=" margin-top: 10px;"
          :data="SuanFaConfigList" :border="true" max-height="700">

          <el-table-column prop="algName" label="算法名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="savePath" label="输出目录" show-overflow-tooltip></el-table-column>

        </el-table>
      </Transition>
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-tag type="primary" effect="dark" size="medium " style="margin-top: 10px;"
          class="middlesize">脉冲压缩算法列表</el-tag>
      </Transition>
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-table :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style=" margin-top: 10px;"
          :data="SuanFaList" :border="true" max-height="700">

          <el-table-column prop="subAlgName" label="算法名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="paramName" label="算法参数名称" show-overflow-tooltip></el-table-column>

        </el-table>
      </Transition>
    </el-card>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "config",
  data() {
    return {

    };
  },
  computed: {
    ...mapState("Suanfa", ["SuanFaConfigList", "SuanFaList"]),

  },

  mounted() {
    this.$store.dispatch("Suanfa/getSuanFaConfigList")
    this.$store.dispatch("Suanfa/getSuanFaList")
  },
};
</script>

<style scoped>
@import url("../../../fontsize.css");

.el-dialog__body {
  padding: 0px;
}

.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}

.el-table {
  font-style: initial;
  font-size: 24px;
}

.card-style {
  margin: 10px;
}
</style>
