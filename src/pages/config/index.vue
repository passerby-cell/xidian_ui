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
      style="height: calc(100vh - 200px); overflow: auto;">
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-tag type="primary" effect="dark" size="medium " class="middlesize">算法输出目录</el-tag>
      </Transition>
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-table :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style=" margin-top: 10px;"
          row-class-name="rowColor" header-row-class-name="rowColor" :data="SuanFaConfigList" :border="true"
          max-height="700">

          <el-table-column prop="algName" label="算法名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="savePath" label="输出目录" show-overflow-tooltip></el-table-column>

        </el-table>
      </Transition>
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-tag type="primary" effect="dark" size="medium " style="margin-top: 10px;" class="middlesize">脉冲压缩算法列表</el-tag>
      </Transition>
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-table :row-style="{ height: 40 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style=" margin-top: 10px;"
          :row-class-name="rowColor" :data="SuanFaList" :border="true" max-height="700">

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

  methods: {
    rowColor({ row, rowIndex }) {
      return "rowColor"
    }
  },

  mounted() {
    this.$store.dispatch("Suanfa/getSuanFaConfigList")
    this.$store.dispatch("Suanfa/getSuanFaList")
  },
};
</script>

<style>
@import url("../../../fontsize.css");

.el-loading-spinner .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #160090;
  stroke-linecap: round;
}

.el-loading-spinner .el-loading-text {
  color: #160090;
  margin: 3px 0;
  font-size: 20px;
}

.el-table .rowColor {
  background: #9eb2cc;
}

.el-dialog__body {
  padding: 0px;
}

::v-deep .el-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: #9eb2cc !important;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  height: 370px !important;
  width: 500px !important;
  overflow: hidden;
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
  background-color: transparent;
  border: 0px;
  min-width: 1600px !important;
  overflow: hidden;
}

.el-breadcrumb__inner {
  color: #40537a !important;
}

.el-breadcrumb__separator {
  margin: 0 9px;
  font-weight: 700;
  color: #40537a !important;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: #40537a !important;
  cursor: text;
}

.el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
  border-bottom: 0px solid #40537a;
}

.el-table {
  color: #40537a;
}

.el-table th.el-table__cell {
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #9eb2cc;
}

.el-table thead {
  color: #40537a;
  font-weight: 500;
  height: 50px !important;
}

.el-table--border .el-table__cell,
.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: 0px solid #EBEEF5;
}

el-table .cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 34px;
  padding-left: 10px;
  padding-right: 10px;
}

.el-input-number__decrease,
.el-input-number__increase {
  position: absolute;
  z-index: 1;
  top: 1px;
  width: 40px;
  height: auto;
  text-align: center;
  background: #40537a;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
}

[class*=" el-icon-"],
[class^=el-icon-] {
  font-family: element-icons !important;
  speak: none;
  font-style: normal;
  font-weight: 900;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-input__inner {
  background-color: #40537a;
  background-image: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #9eb2cc;
  font-size: 20px !important;
  font-weight: 500;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}


.el-select-dropdown {
  border: none;
  background-color: rgba(1, 28, 82, 0.8);
}

.el-input__inner {
  color: #eee;
  border-color: #0F3360;
  background-color: rgba(1, 28, 82, 0.8);
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #0B61AA;
  background-color: rgba(1, 28, 82, 0.8);
  color: #0F3360;
}

.el-select-dropdown__item {
  color: #eee;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #00D3E9;
  background-color: #0F3360;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #40537a;
  border-color: #40537a;
  color: #FFF;
}

.el-button--primary {
  color: #FFF;
  background-color: #6987d6;
  border-color: #6987d6;
}
</style>
