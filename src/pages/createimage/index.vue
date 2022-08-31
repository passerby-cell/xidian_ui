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
                <el-button type="primary" @click="createNewJob()" size="small"
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
                :data="formatedJobList"
                :border="true"
                max-height="600"
              >
                <el-table-column prop="" label="流程名" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span
                      style="cursor: pointer"
                      @click="toJobInfo(scope.$index)"
                      >{{ scope.row.vcJobCnName }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="选择镜像文件"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop=""
                  label="修改镜像标签"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop=""
                  label="推送远程仓库"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop=""
                  label="流程状态"
                  width="80"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-tag
                      size="small"
                      v-if="scope.row.status == 'Completed'"
                      type="success"
                      >成功</el-tag
                    >
                    <el-tag
                      size="small"
                      type="warning"
                      v-if="scope.row.status == 'No_Running'"
                      >失败</el-tag
                    >
                    <el-tag size="small" v-if="scope.row.status == 'Running'"
                      >进行到xxx</el-tag
                    >
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="80" align="center">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-edit"
                      v-if="scope.row.status == 'No_Running'"
                      @click="startJob(scope.row.clusterId, scope.row.vcJobId)"
                      >编辑</i
                    >
                    <i
                      class="el-icon-delete"
                      @click="deleteJob(scope.row.clusterId, scope.row.vcJobId)"
                      >删除</i
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div></Transition
          >
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
          "
        >
          <el-row>
            <h3 style="margin-left: 10px" class="size">
              <span style="color: #409eff">|</span>&nbsp;镜像制作流程
            </h3>
          </el-row>
          <el-result
            v-if="!newImageName"
            style="height: 100%; margin-top: 150px"
            icon="info"
            title="信息提示"
            subTitle="请新建镜像制作流程或编辑已有流程"
          >
          </el-result>
          <el-steps :active="1" style="margin: 10px" v-if="newImageName">
            <el-step title="选择镜像文件" icon="el-icon-folder-checked">
            </el-step>
            <el-step title="修改镜像标签" icon="el-icon-edit-outline"></el-step>
            <el-step title="推送远程仓库" icon="el-icon-upload2"></el-step>
          </el-steps>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import {} from "@/api";

export default {
  name: "CreateImage",
  data() {
    return { createDialogVisible: false, newImageName: "" };
  },
  computed: {},
  methods: {
    createNewJob() {
      this.createDialogVisible = false;
      this.newImageName = "";
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
  mounted() {},
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
