<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>在线IDE</el-breadcrumb-item>
        <el-breadcrumb-item>IDE列表</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '0px' }"
      style="height: calc(100vh - 170px); overflow: auto"
    >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-row style="margin-left: 10px; width: 400px">
          <el-button-group>
            <el-button
              :type="type == 1 ? 'success' : 'primary'"
              size="small"
              @click="getDataSet(1)"
              >模型数据</el-button
            >
            <el-button
              @click="getDataSet(2)"
              :type="type != 1 ? 'success' : 'primary'"
              size="small"
              >模型结果</el-button
            >
          </el-button-group></el-row
        ></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-table
          :data="data"
          highlight-current-row
          max-height="600"
          style="font-size: 16px"
        >
          <el-table-column
            property="name"
            :label="type == 1 ? '模型数据' : '模型结果'"
          ></el-table-column>
          <el-table-column property="catalog" label="路径"></el-table-column
          ><el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                type="success"
                @click="createIDE(scope.row.catalog)"
                >创建IDE</el-button
              > -->
              <el-button
                size="mini"
                type="primary"
                @click="openIDE(scope.row.catalog)"
                >打开IDE</el-button
              >
            </template>
          </el-table-column>
        </el-table></Transition
      >
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      fullscreen
      class="dialogClass"
      :show-close="false"
    >
      <span style="width: 100%; height: 60px; font-size: 16px" slot="title"
        >在线IDE<el-button
          type="danger"
          size="mini"
          @click="handleClose"
          style="float: right; margin-right: 10px; margin-bottom: 10px"
          >退出</el-button
        ></span
      >
      <iframe
        name="iframe"
        src="http://202.195.239.146:92/ide/my/?folder=%2Fhome%2Fcoder%2Fworkspace%2F"
        style="width: 100%; height: calc(100vh - 58px)"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Loading } from "element-ui";
import { delCookie } from "@/utils/cookie";
import {
  reqDataSet,
  reqIdeLogin,
  reqIdeRegister,
  reqIdeStop,
  reqIdeStart,
  reqCreateIDE,
} from "@/api";
import qs from "qs";
export default {
  name: "Ide",
  data() {
    return {
      type: 1,
      dialogVisible: false,
      name: "",
    };
  },
  computed: {
    ...mapState("CreateJob", ["data"]),
  },
  methods: {
    // createIDE(name) {
    //   reqIdeRegister({ name: name, password: name });
    //   reqIdeLogin({ name: name, password: name });
    //   setTimeout(() => {
    //     reqCreateIDE();
    //   }, 3000);
    // },
    openIDE(name) {
      // let names = name.split("/");
      // this.name = names[names.length - 1];
      this.name = name;
      //reqIdeRegister({ name: this.name, password: this.name });
      reqIdeLogin({ name: name, password: name });
      let _this = this;
      let loading = Loading.service({
        fullscreen: true,
        text: "在线IDE加载中...",
      });
      setTimeout(() => {
        _this
          .axios({
            url: "http://202.195.239.146:92/node-manager/user/register",
            method: "post",
            data: qs.stringify({
              name: name,
              password: name,
            }),
          })
          .then((res) => {});
      }, 100);

      setTimeout(() => {
        _this
          .axios({
            url: "http://202.195.239.146:92/node-manager/user/login",
            method: "post",
            data: qs.stringify({
              name: name,
              password: name,
            }),
          })
          .then((res) => {
            reqCreateIDE();
          });
      }, 200);
      setTimeout(() => {
        reqIdeStart();
      }, 900);
      setTimeout(() => {
        loading.close();
        _this.dialogVisible = true;
      }, 3000);
    },
    stopIDE(name) {
      reqIdeLogin({ name: name, password: name });
      reqIdeStop();
      this.$message({
        type: "success",
        message: "关闭成功!",
      });
    },
    async getDataSet(type) {
      this.type = type;
      let result = await reqDataSet(this.type);
      if (result.code == 200) {
        this.$store.dispatch("CreateJob/getDataSet", result.data);
      }
      let _this = this;
      for (let i = 0; i < this.data.length; i++) {
        setTimeout(() => {
          _this
            .axios({
              url: "http://202.195.239.146:92/node-manager/user/register",
              method: "post",
              data: qs.stringify({
                name: _this.data[i].catalog,
                password: _this.data[i].catalog,
              }),
            })
            .then((res) => {});
        }, (i + 1) * 100);
      }
    },
    handleClose() {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          delCookie();
          _this.stopIDE(this.name);
          location.reload();
        })
        .catch((_) => {});
    },
  },
  mounted() {
    this.getDataSet(this.type);
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.card-style {
  margin: 10px;
  height: 650px;
}
.el-row {
  margin-top: 10px;
  width: 100%;
}
.el-select {
  width: 340px;
}

.el-form {
  align-items: flex-start;
}
.h3 {
  margin-top: 10px;
  margin-left: 10px;
}
.size {
  font-size: 16px;
}
.el-form-item >>> .el-form-item__error {
  padding: 0px;
}
.dialogClass .el-dialog__body {
  padding: 0px;
  margin: 0px;
  overflow-y: auto;
}
</style>
