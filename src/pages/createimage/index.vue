<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>镜像仓库</el-breadcrumb-item>
        <el-breadcrumb-item>镜像制作</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>

    <el-row>
      <el-col :span="12"
        ><el-card
          shadow="hover"
          :body-style="{ padding: '10px' }"
          style="height: calc(100vh - 170px); overflow: auto; margin-left: 10px"
        >
          <el-row style="padding-top: 0px; margin-top: 0px">
            <h3 class="size">
              <span style="color: #409eff">|</span>&nbsp;新建镜像制作流程
            </h3>
          </el-row>
          <el-row>
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="createDialogVisible = true"
            >
              新建流程
            </el-button>
            <el-dialog
              title="新建流程"
              :visible.sync="createDialogVisible"
              width="400px"
              :before-close="handleClose"
              class="dialogClass"
            >
              <el-row style="padding-left: 20px; padding-right: 20px">
                <el-input
                  size="mini"
                  v-model="newImageName"
                  placeholder="请输入新建的流程名称"
                ></el-input>
              </el-row>

              <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="small">取 消</el-button>
                <el-button
                  type="primary"
                  @click="createNewImageProcess()"
                  size="small"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </el-row>
          <el-row>
            <h3 class="size">
              <span style="color: #409eff">|</span>&nbsp;镜像制作流程列表
            </h3>
          </el-row>
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <div style="height: calc(100vh-150px); overflow: auto">
              <el-table
                :row-style="{ height: 30 + 'px' }"
                :cell-style="{ padding: 0 + 'px' }"
                style="margin-top: 10px"
                :data="imageProcessList"
                :border="true"
                max-height="600"
              >
                <el-table-column
                  prop="name"
                  label="流程名"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="step1"
                  label="选择镜像文件"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="step2"
                  label="选择镜像仓库"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="step3"
                  label="推送远程仓库"
                  show-overflow-tooltip
                >
                  <!-- <template slot-scope="scope">
                    <span
                      v-if="
                        !scope.row.step3 && scope.row.step1 && scope.row.step2
                      "
                      style="color: #568bfa; cursor: pointer"
                      >日志</span
                    >
                    <span v-if="scope.row.step3">{{ scope.row.step3 }}</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  prop="step3"
                  label="流程状态"
                  width="80"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.step3" type="success"
                      >成功</el-tag
                    >
                    <el-tag
                      size="mini"
                      type="danger"
                      v-if="
                        !scope.row.step3 &&
                        scope.row.path != null &&
                        scope.row.step2 &&
                        scope.row.step3logs
                      "
                      >失败</el-tag
                    >
                    <el-tag
                      size="mini"
                      type="success"
                      v-if="scope.row.path != null && !scope.row.step3logs"
                      >进行中</el-tag
                    >
                    <el-tag
                      size="mini"
                      type="warning"
                      v-if="!scope.row.step1 && !scope.row.path"
                      >未开始</el-tag
                    >
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="80" align="center">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-edit"
                      style="cursor: pointer"
                      @click="editImageProcess(scope.$index)"
                    ></i>
                    <i
                      class="el-icon-delete"
                      style="margin-left: 10px; cursor: pointer"
                      @click="deleteImageProcess(scope.row.id)"
                    ></i>
                  </template>
                </el-table-column>
              </el-table></div
          ></Transition>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          style="
            height: calc(100vh - 170px);
            overflow: auto;
            margin-left: 10px;
            margin-right: 10px;
            padding: 10px;
          "
        >
          <el-row>
            <el-col :span="6"
              ><h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;镜像制作流程
              </h3></el-col
            >
            <el-col :span="6" v-if="showSteps"
              ><h3 style="margin-left: 10px" class="size">
                当前流程:
                <el-tag size="mini" type="primary">{{
                  imageProcessList[processIndex].name
                }}</el-tag>
              </h3>
            </el-col>
          </el-row>
          <el-result
            v-if="!showSteps"
            style="height: 100%; margin-top: 150px"
            icon="info"
            title="信息提示"
            subTitle="请新建镜像制作流程或编辑已有流程"
          >
          </el-result>
          <el-steps
            :active="activeIndex"
            style="margin-top: 10px"
            v-if="showSteps"
          >
            <el-step title="选择镜像文件" icon="el-icon-folder-checked">
            </el-step>
            <el-step title="选择镜像仓库" icon="el-icon-edit-outline"></el-step>
            <el-step title="推送远程仓库" icon="el-icon-upload2"></el-step>
          </el-steps>
          <template v-if="activeIndex == 1">
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;模型列表
              </h3>
            </el-row>
            <el-table
              :row-style="{ height: 40 + 'px' }"
              :cell-style="{ padding: 0 + 'px' }"
              style="margin-top: 10px"
              :data="data"
              :border="true"
              max-height="470"
              @row-click="updatePath"
            >
              <el-table-column
                property="name"
                label="模型名称"
              ></el-table-column>
              <el-table-column
                property="catalog"
                label="路径"
              ></el-table-column>
            </el-table>
            <el-row style="margin-top: 10px; font-size: 20px">
              <el-input v-model="path" size="small" style="width: 100%">
                <template slot="prepend">文件路径:</template>
              </el-input>
            </el-row>
            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input v-model="imageName" size="small" style="width: 100%">
                  <template slot="prepend">镜像名称:</template>
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  v-model="imageVersion"
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">镜像版本:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="16">
                <el-button
                  size="small"
                  type="primary"
                  style="float: right"
                  @click="buildImage()"
                  >构建镜像</el-button
                >
              </el-col>
            </el-row>
          </template>
          <template v-if="activeIndex == 2">
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;镜像信息
              </h3>
            </el-row>

            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input
                  v-model="imageNamed"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">镜像名称:</template>
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  disabled
                  v-model="imageVersioned"
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">镜像版本:</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;镜像仓库
              </h3>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-select
                  v-model="repositoryDir"
                  size="small"
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in imageCatalogList"
                    :label="
                      item.envName == 'cluster-default-default'
                        ? 'private'
                        : item.envName
                    "
                    :value="item.pushCatalog"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-button size="small" type="primary" @click="TagImage()"
                  >确定</el-button
                >
              </el-col>
            </el-row>
          </template>
          <template v-if="activeIndex == 3">
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;镜像信息
              </h3>
            </el-row>

            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input
                  v-model="imageNamed"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">镜像名称:</template>
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  disabled
                  v-model="imageVersioned"
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">镜像版本:</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;目标仓库
              </h3>
            </el-row>
            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input
                  v-model="repositoryDired"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">仓库名称:</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;所属类别
              </h3>
            </el-row>
            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col
                :span="11"
                v-if="!imageProcessList[processIndex].imageCatalog"
              >
                <el-select v-model="catalog" size="small" style="width: 100%">
                  <el-option label="城市路网提取" value="城市路网提取">
                  </el-option>
                  <el-option label="水稻长势监测" value="水稻长势监测">
                  </el-option>
                  <el-option label="洪涝灾害监测" value="洪涝灾害监测">
                  </el-option>
                  <el-option label="基础设施识别" value="基础设施识别">
                  </el-option>
                  <el-option label="旱情监测" value="旱情监测"> </el-option>
                  <el-option label="其他" value="其他"> </el-option>
                </el-select>
              </el-col>
              <el-col
                :span="11"
                v-if="imageProcessList[processIndex].imageCatalog"
              >
                <el-input
                  v-model="imageProcessList[processIndex].imageCatalog"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">类别名称:</template>
                </el-input>
              </el-col>
              <el-col :span="3" :offset="2">
                <el-button
                  v-if="!imageProcessList[processIndex].step3"
                  size="small"
                  type="primary"
                  @click="imagePush"
                  >推送</el-button
                >
              </el-col>
              <el-col :span="3" :offset="1">
                <el-button
                  v-if="imageProcessList[processIndex].step3logs"
                  size="small"
                  type="primary"
                  @click="showLogs"
                  >日志</el-button
                >
              </el-col>
            </el-row>
            <div
              v-show="showlogs && imageProcessList[processIndex].step3logs"
              style="margin-top: 10px"
            >
              <pre
                v-highlight
                style="height: 250px; overflow: auto; padding: 0px"
              >
                  <code
                  class="python"
                  style="font-size: 16px; background-color: #20211d;height:100%"
                  id="statusLog"
                  :code="imageProcessList[processIndex].step3logs"
                ></code>
                </pre>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import {
  reqUserInfoCreateImageProcess,
  reqUserInfoDeleteImageProcess,
  reqUserInfoGetImageProcessList,
  reqUserInfoUpdateImageProcessStepOne,
  reqUserInfoUpdateImageProcessStepTwo,
  reqUserInfoUpdateImageProcessStepThree,
  reqDataSet,
  reqQueueList,
  reqWareHouseList,
  reqWareHouseImageList,
} from "@/api";
import { Loading } from "element-ui";
export default {
  name: "CreateImage",
  data() {
    return {
      catalog: "",
      showlogs: false,
      repositoryDir: "lawinbee",
      imageName: "",
      imageVersion: "",
      path: "",
      createDialogVisible: false,
      newImageName: "",
      showSteps: "",
      activeIndex: 0,
      processIndex: 0,
    };
  },
  computed: {
    ...mapState("ImageProcess", ["imageProcessList"]),
    ...mapState("CreateJob", ["data", "imageCatalogList", "warehouseList"]),
    imageNameAndVersion() {
      return this.imageName + ":" + this.imageVersion;
    },
    imageNamed() {
      return this.imageProcessList[this.processIndex].step1.split(":")[0];
    },
    imageVersioned() {
      return this.imageProcessList[this.processIndex].step1.split(":")[1];
    },
    repositoryDired() {
      return this.imageProcessList[this.processIndex].step2.split("/")[0];
    },
    logs() {
      return this.imageProcessList[this.processIndex].step3logs;
    },
  },
  methods: {
    async imagePush() {
      if (this.catalog) {
        let loading = Loading.service({
          fullscreen: true,
          text: "请勿刷新页面或关闭浏览器...",
        });
        let result = await reqUserInfoUpdateImageProcessStepThree({
          id: this.showSteps,
          filepath: this.imageProcessList[this.processIndex].path,
          imageTag:
            this.repositoryDir +
            "/" +
            this.imageProcessList[this.processIndex].step1,
          imageCatalog: this.catalog,
          parentCatalog: this.repositoryDir == "public" ? 1 : 0,
        });
        if (result.code == 200) {
          this.$store.dispatch("ImageProcess/getImageProcessList");
          loading.close();
          this.$message({
            type: "success",
            message: "推送成功",
          });
        }
      } else {
        this.$message.error("请选择镜像所属的分类");
      }
    },
    showLogs() {
      this.showlogs = !this.showlogs;
      this.initLogs();
    },
    initLogs() {
      if (this.imageProcessList[this.processIndex].step3logs != null) {
        this.imageProcessList[this.processIndex].step3logs.replace(
          /\n/g,
          "<br/>"
        );
        console.log(this.imageProcessList[this.processIndex].step3logs);
        var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
        statusLog.innerHTML =
          this.imageProcessList[this.processIndex].step3logs;
      } else {
        var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
        statusLog.innerHTML = null;
      }
    },
    async TagImage() {
      if (this.repositoryDir == "") {
        this.$message({ type: "warning", message: "请选择镜像仓库" });
      } else {
        let loading = Loading.service({
          fullscreen: true,
          text: "请勿刷新页面或关闭浏览器...",
        });

        let result = await reqUserInfoUpdateImageProcessStepTwo({
          id: this.showSteps,
          filepath: this.imageProcessList[this.processIndex].path,
          imageNameAndVersion: this.imageProcessList[this.processIndex].step1,
          imageTag:
            this.repositoryDir +
            "/" +
            this.imageProcessList[this.processIndex].step1,
          parentCatalog: this.repositoryDir == "public" ? 1 : 0,
        });
        if (result.code == "200") {
          loading.close();
          this.$message({ type: "success", message: "操作成功" });
          this.$store.dispatch("ImageProcess/getImageProcessList");
          this.activeIndex = 3;
          this.getWareHouseList();
        } else {
          this.$message.error(result.message);
          loading.close();
        }
      }
    },
    async getWareHouseList() {
      let result1 = await reqQueueList();
      if (result1.success == true) {
        this.$store.dispatch("CreateJob/getQueueList", result1.rows);
        let result2 = await reqWareHouseList(result1.rows[0].clusterId);
        if (result2.code == "200") {
          this.$store.dispatch("CreateJob/getWareHouseList", result2.data);
          let result3 = await reqWareHouseImageList(
            result2.data[0].warehouseId
          );
          if (result3.code == "200") {
            this.$store.dispatch(
              "CreateJob/getWareHouseImageList",
              result3.data
            );
          }
        }
      }
    },
    async buildImage() {
      let flag = true;
      if (this.path == "") {
        flag = false;
        this.$message({ type: "warning", message: "请选择文件路径" });
      } else if (this.imageName == "") {
        flag = false;
        this.$message({ type: "warning", message: "请输入镜像名称" });
      } else if (this.imageVersion == "") {
        flag = false;
        this.$message({ type: "warning", message: "请输入镜像版本" });
      }
      if (flag) {
        let loading = Loading.service({
          fullscreen: true,
          text: "请勿刷新页面或关闭浏览器...",
        });
        let result = await reqUserInfoUpdateImageProcessStepOne({
          id: this.showSteps,
          filepath: this.path,
          imageNameAndVersion: this.imageNameAndVersion,
        });
        if (result.code == "200") {
          loading.close();
          this.$message({ type: "success", message: "构建成功" });
          this.$store.dispatch("ImageProcess/getImageProcessList");
          this.activeIndex = 2;
          this.getWareHouseList();
          this.imageVersion = "";
          this.imageName = "";
          this.path = "";
        } else {
          this.$message.error(result.message);
          loading.close();
        }
      }
    },
    updatePath(row, event, column) {
      this.path = row.catalog;
    },
    async getDataSet() {
      let result = await reqDataSet(1);
      if (result.code == 200) {
        this.$store.dispatch("CreateJob/getDataSet", result.data);
      }
    },
    editImageProcess(index) {
      this.showSteps = this.imageProcessList[index].id;
      this.processIndex = index;
      this.handleActiveIndex(this.imageProcessList[index]);
      this.getDataSet();
      this.getWareHouseList();
      this.showlogs = false;
    },
    async deleteImageProcess(id) {
      let result = await reqUserInfoDeleteImageProcess(id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        if (this.showSteps == id) {
          this.showSteps = "";
          this.processIndex = 0;
          this.showlogs = false;
          this.activeIndex = 0;
        }
        this.$store.dispatch("ImageProcess/getImageProcessList");
      } else {
        this.$message.error("删除失败");
      }
    },
    async createNewImageProcess() {
      if (this.newImageName == "") {
        this.$message.error("流程名不能为空");
      } else {
        let result = await reqUserInfoCreateImageProcess(this.newImageName);
        if (result.code == "200") {
          this.createDialogVisible = false;
          this.$message({
            type: "success",
            message: "新建成功",
          });

          this.$store.dispatch("ImageProcess/getImageProcessList");
          let _this = this;
          result.data.forEach((item, index) => {
            if (item.name == _this.newImageName) {
              _this.showSteps = item.id;
              _this.processIndex = index;
            }
          });
          this.handleActiveIndex(result.data[this.processIndex]);
          this.newImageName = "";
        } else {
          this.$message.error(result.message);
        }
      }
    },
    handleActiveIndex(imageProcess) {
      if (!imageProcess.step1) {
        this.activeIndex = 1;
      } else if (imageProcess.step1 && !imageProcess.step2) {
        this.activeIndex = 2;
      } else {
        this.activeIndex = 3;
      }
    },
    handleClose(done) {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          _this.createDialogVisible = false;
          _this.newImageName = "";
          done();
        })
        .catch((_) => {});
    },
  },
  mounted() {
    this.$store.dispatch("ImageProcess/getImageProcessList");
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
