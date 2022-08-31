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
                  label="修改镜像标签"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="step3"
                  label="推送远程仓库"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span
                      v-if="!scope.row.step3 && scope.row.step1"
                      style="color: #568bfa; cursor: pointer"
                      >日志</span
                    >
                    <span v-if="scope.row.step3">{{ scope.row.step3 }}</span>
                  </template></el-table-column
                >
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
                      v-if="!scope.row.step3 && scope.row.path != null"
                      >失败</el-tag
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
            <el-step title="修改镜像标签" icon="el-icon-edit-outline"></el-step>
            <el-step title="推送远程仓库" icon="el-icon-upload2"></el-step>
          </el-steps>
          <el-table
            v-if="activeIndex == 1"
            :row-style="{ height: 40 + 'px' }"
            :cell-style="{ padding: 0 + 'px' }"
            style="margin-top: 10px"
            :data="data"
            :border="true"
            max-height="470"
          >
            <el-table-column property="name" label="模型数据"></el-table-column>
            <el-table-column property="catalog" label="路径"></el-table-column>
          </el-table>
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
} from "@/api";

export default {
  name: "CreateImage",
  data() {
    return {
      createDialogVisible: false,
      newImageName: "",
      showSteps: "",
      activeIndex: 0,
      processIndex: 0,
    };
  },
  computed: {
    ...mapState("ImageProcess", ["imageProcessList"]),
    ...mapState("CreateJob", ["data"]),
  },
  methods: {
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
      } else if (!imageProcess.step1 && !imageProcess.step2) {
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
