<template>
  <el-row>
    <el-menu mode="horizontal" background-color="#ADB6CA" text-color="black">
      <el-col :span="20">
        <div style="text-align: center; height: 60px">
          <img src="@/assets/images/titleicon.jpg" style="height: 60px; width: 210px; margin-left: 10px; float: left" />
          <span class="font">雷达回波分析系统</span>
        </div>
      </el-col>
    </el-menu>
  </el-row>
</template>
<script>

export default {
  name: "Header",
  data() {

    return {


    };
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },
};
</script>
<style>
@import url("../../../fontsize.css");

.font {
  /* float: right; */
  font-size: 50px;
  font-style: oblique;
  color: #409eff;
  text-align: center;
}

.size {
  font-size: 16px;
}

.el-form {
  align-items: flex-start;
}

.dialogClass .el-dialog__body {
  padding: 0px;
  font-size: 16px;
}
</style>
