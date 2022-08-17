<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>模型管理</el-breadcrumb-item>
        <el-breadcrumb-item>训练模型</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-row>
      <el-col :span="4">
        <el-card class="left-card" :body-style="{ padding: '0px' }"
          ><Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-row>
              <el-col :span="16" style="margin-top: 12px">
                <h3 style="margin-left: 5px" class="size">
                  <span style="color: #409eff">|</span>&nbsp;训练模型列表
                </h3>
              </el-col>
              <el-col :span="8"
                ><el-button
                  style="
                    margin-top: 10px;

                    padding-right: 5px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-left: 3px;
                  "
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  @click="parentFileDialogVisible = true"
                  >新建</el-button
                ></el-col
              ></el-row
            >
          </Transition>
          <el-dialog
            title="新建训练模型"
            :visible.sync="parentFileDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-input
              placeholder="请输入新建的训练模型名称"
              size="small"
              v-model="newParentFileName"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="parentFileDialogVisible = false" size="small"
                >取 消</el-button
              >
              <el-button type="primary" @click="createParentFile" size="small"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!-- <el-divider></el-divider> -->
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-row>
              <el-table
                class="size"
                highlight-current-row
                :show-header="false"
                style="width: 100%; margin-top: 10px"
                max-height="600"
                :row-style="{ height: 0 + 'px' }"
                :cell-style="{ padding: 0 + 'px' }"
                :data="parentFileList"
              >
                <el-table-column
                  prop="name"
                  label="文件名"
                  align="left"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span
                      @click="
                        updateChileFileList(
                          scope.row.id,
                          pageNum,
                          null,
                          scope.row.name
                        )
                      "
                      class="parentIcon"
                      >{{ scope.row.name }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="right" width="60px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="12">
                        <i
                          class="el-icon-edit-outline parentIcon"
                          @click="updateParentFileNameDialogVisible(scope.row)"
                        ></i
                      ></el-col>
                      <el-col :span="12">
                        <i
                          class="el-icon-delete parentIcon"
                          style="margin-left: 10px"
                          @click="deleteParentFile(scope.row.id)"
                        ></i></el-col
                    ></el-row>
                  </template>
                </el-table-column> </el-table
              ><el-dialog
                title="重命名数据集"
                :visible.sync="parentFileNameDialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <el-input
                  placeholder="请输入重命名的数据集名称"
                  size="small"
                  v-model="newParentFileName"
                ></el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    @click="parentFileNameDialogVisible = false"
                    size="small"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="updateParentFileName()"
                    size="small"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-row>
          </Transition>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card
          :body-style="{ padding: '0px' }"
          style="
            height: calc(100vh - 170px);
            margin-top: 10px;
            margin-left: 10px;
            overflow: auto;
          "
        >
          <el-row style="margin-top: 10px">
            <el-col :span="4">
              <h3 style="margin-left: 5px; margin-top: 3px" class="size">
                <span style="color: #409eff">|</span>&nbsp;训练模型文件列表
              </h3>
            </el-col>
            <el-col :span="20"
              ><h3 class="size" v-if="parentFileName">
                当前训练模型: <el-tag size="small">{{ parentFileName }}</el-tag>
              </h3></el-col
            >
          </el-row>
          <el-row style="margin-top: 10px; margin-left: 10px; font-size: 20px">
            <el-input
              v-model="dirpath"
              disabled
              size="small"
              style="width: 99%"
            >
              <template slot="prepend">当前路径:</template>
            </el-input>
          </el-row>
          <el-row>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-d-arrow-left"
                size="small"
                @click="goBack"
                >返回</el-button
              ></Transition
            >
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-folder-add"
                size="small"
                @click="fileDialogVisible = true"
                >新建文件夹</el-button
              >
            </Transition>
            <el-dialog
              title="新建文件夹"
              :visible.sync="fileDialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-input
                placeholder="请输入新建的文件名"
                size="small"
                v-model="newDirName"
              ></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="fileDialogVisible = false" size="small"
                  >取 消</el-button
                >
                <el-button type="primary" @click="newDir" size="small"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-dropdown
                @command="handleUpload"
                style="margin-top: 10px; margin-left: 10px"
              >
                <el-button type="primary" size="small" icon="el-icon-upload">
                  上传
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="uploadFile"
                    >上传文件</el-dropdown-item
                  >
                  <el-dropdown-item command="uploadFiles"
                    >上传文件夹</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </Transition>
            <el-dialog
              title="上传"
              :visible.sync="uploadDialogVisible"
              width="433px"
              :before-close="handleClose"
              ><el-progress
                style="
                  width: 380px;
                  margin-top: 8px;
                  margin-left: 15px;
                  margin-bottom: 10px;
                "
                :percentage="progressPercent"
              />
              <el-row style="margin-bottom: 10px">
                <el-col :span="3" :offset="17"
                  ><el-button
                    type="primary"
                    size="small"
                    style="margin-right: 10px"
                    @click="submitUpload"
                    >上 传</el-button
                  >
                </el-col>
                <el-col :span="4"
                  ><el-button
                    @click="close"
                    size="small"
                    style="margin-left: 10px"
                    >关 闭</el-button
                  ></el-col
                >
              </el-row>

              <el-upload
                style="margin-left: 15px"
                drag
                action
                :http-request="uploadFile"
                multiple
                :auto-upload="false"
                ref="upload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip"></div>
              </el-upload>
            </el-dialog>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="deleteFiles"
                >删除选中</el-button
              ></Transition
            >
          </el-row>
          <el-row>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-table
                class="size"
                ref="table"
                :data="childFileList"
                style="width: 100%"
                max-height="560"
                @select-all="selectTableAll"
                @select="selectFile"
              >
                <el-table-column width="80" type="selection">
                  <!-- <template slot-scope="scope">
            <el-checkbox @change="selectFile(scope.row)"></el-checkbox>
          </template>-->
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="1">
                        <i
                          class="el-icon-folder"
                          v-if="scope.row.fileType == 1"
                        ></i>
                        <i
                          class="el-icon-document"
                          v-if="!(scope.row.fileType == 1)"
                        ></i>
                      </el-col>
                      <el-col :span="22" :offset="1">
                        <el-input
                          v-focus
                          size="mini"
                          v-model="scope.row.fileName"
                          v-if="isShow[scope.$index]"
                          :placeholder="scope.row.fileName"
                          @blur="updatename(scope.$index, scope.row)"
                          @focus="oldname = scope.row.fileName"
                          style="margin-left: 5px"
                        ></el-input>
                        <span
                          style="margin-left: 5px"
                          v-show="!isShow[scope.$index]"
                          @click="openDir(scope.row)"
                          >{{ scope.row.fileName }}</span
                        >
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="modifyTime"
                  label="修改时间"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="fileSize"
                  label="大小"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="操作" width="200" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <el-button
                      style="margin-left: 10px"
                      type="primary"
                      icon="el-icon-view"
                      size="small"
                      v-if="scope.row.fileType != 1"
                      @click="previewFile(scope.row.name)"
                      >预览</el-button
                    > -->
                    <!-- <a
                      :href="
                        'http://localhost:8080/file/downloadfile?token=' +
                        localtoken +
                        '&name=' +
                        scope.row.name +
                        '&dirpath=' +
                        dirpath
                      "
                    > -->
                    <!-- <el-button
                        style="margin-left: 10px"
                        type="warning"
                        icon="el-icon-download"
                        size="small"
                        v-if="scope.row.fileType != 1"
                        >下载</el-button
                      > -->
                    <!-- </a> -->
                    <!-- @click="downloadFile(scope.row.name)" -->
                    <el-button
                      style="margin-left: 10px"
                      type="success"
                      icon="el-icon-edit"
                      size="small"
                      @click="changeIsShow(scope.$index)"
                      >重命名</el-button
                    >
                    <el-button
                      style="margin-left: 10px"
                      type="danger"
                      icon="el-icon-delete"
                      size="small"
                      @click="deleteFile(scope.row.fileName)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </Transition>
          </el-row>
          <el-col style="text-align: center">
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-pagination
                :background="true"
                :page-sizes="[10, 20, 30]"
                :page-size="page"
                layout="prev, pager, next,sizes"
                :total="Number(totalRecord)"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </Transition>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  reqParentFile,
  reqCreateParentFile,
  reqDeleteParentFile,
  reqUpdateParentFileName,
  reqUpdateChildFileName,
  reqCreateChildFolder,
  reqDeleteChildFile,
  reqUploadChildFile,
} from "@/api";
export default {
  name: "Data",
  data() {
    return {
      progressPercent: 0,
      dataSetName: "",
      page: 10,
      isShow: [],
      parentId: "",
      //路径
      path: [],
      //选中的文件名
      checkedfile: [],
      // 新建文件夹的对话框
      fileDialogVisible: false,
      // 上传文件对话框
      uploadDialogVisible: false,
      parentFileDialogVisible: false,
      parentFileNameDialogVisible: false,
      // 新建文件夹的名称
      newDirName: "",
      // 旧文件的名称
      oldname: "",
      parentFileName: "",
      newParentFileName: "",
      newParentFileId: "",
    };
  },
  directives: {
    //注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector("input").focus();
      },
    },
  },
  computed: {
    ...mapState("File", [
      "parentFileList",
      "childFileList",
      "pageNum",
      "filePath",
      "totalRecord",
    ]),
    dirpath() {
      let dirpath = "";
      this.path.forEach((item) => {
        dirpath = dirpath + "/" + item;
      });
      return dirpath;
    },
  },
  methods: {
    updateChileFileList(id, pageNum, path, fileName) {
      this.path = [];
      this.parentId = id;
      this.parentFileName = fileName;
      this.updateFileList(id, pageNum, path);
    },
    updateParentFileNameDialogVisible(row) {
      this.parentFileNameDialogVisible = true;
      this.newParentFileName = row.name;
      this.newParentFileId = row.id;
    },
    async updateParentFileName() {
      let result = await reqUpdateParentFileName(
        this.newParentFileId,
        this.newParentFileName,
        "",
        6,
        1
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "更新成功",
        });
        this.parentFileNameDialogVisible = false;
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("更新失败");
      }
    },
    async deleteParentFile(id) {
      alert("是否确认删除?");
      let result = await reqDeleteParentFile(id);
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.updateParentFileList();
      } else {
        this.$message.error(result.data);
      }
    },
    async createParentFile() {
      //TODO:storageId type
      let result = await reqCreateParentFile(this.newParentFileName, "", 6, 1);
      if (result.code == "200") {
        this.parentFileDialogVisible = false;
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("新建失败");
      }
    },
    changeIsShow(index) {
      let flag = !this.isShow[index];
      this.isShow.splice(index, 1, flag);
    },
    initShow() {
      if (this.childFileList != null) {
        for (let i = 0; i < this.childFileList.length; i++) {
          this.isShow.push(false);
        }
      }
    },
    previewFile(name) {
      let url = "http://127.0.0.1:8080/preview" + this.dirpath + "/" + name;
      // let url =
      //   'http://localhost:8080/file/downloadfile?token=' +
      //   this.localtoken +
      //   '&name=' +
      //   name +
      //   '&dirpath=' +
      //   this.dirpath
      // console.log(url)
      let Base64 = require("js-base64").Base64;
      window.open(
        "http://127.0.0.1:8012/onlinePreview?url=" +
          encodeURIComponent(Base64.encode(url))
      );
    },
    async deleteFiles() {
      let result = await reqDeleteChildFile(
        this.parentId,
        this.checkedfile,
        this.dirpath
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      }
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
      this.checkedfile = [];
    },
    async deleteFile(fileName) {
      let fileList = [];
      fileList.push(fileName);
      let result = await reqDeleteChildFile(
        this.parentId,
        fileList,
        this.dirpath
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      }
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
    },
    close() {
      this.uploadDialogVisible = false;
      this.progressPercent = 0;
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
      this.$refs.upload.clearFiles();
    },
    uploadFile(files) {
      this.progressPercent = 0;
      const formData = new FormData();
      formData.append("file", files.file);
      let identifier =
        files.file.size +
        "-" +
        files.file.name.substring(0, 2) +
        files.file.name.split(".")[files.file.name.split(".").length - 1];
      let _this = this;
      this.axios({
        url: "api/paas-web/bocapi/fileBcc/upload",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          chunkNumber: "1",
          chunkSize: "2048000",
          currentChunkSize: files.file.size,
          totalSize: files.file.size,
          identifier,
          filename: files.file.name,
          relativePath: files.file.webkitRelativePath,
          totalChunks: "1",
          filePath: this.dirpath,
          rootPath: "/opt/bcc/storage1/",
          dataId: this.parentId,
          file: files.file,
        },
        onUploadProgress(progress) {
          _this.progressPercent = Math.round(
            (progress.loaded / progress.total) * 100
          );
        },
      });
      //this.updateFileList(this.parentId, this.pageNum, this.dirpath);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleUpload(command) {
      this.uploadDialogVisible = true;
      if (command == "uploadFile") {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = false;
        });
      } else {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = true;
        });
      }
    },
    async newDir() {
      let result = await reqCreateChildFolder(
        this.parentId,
        this.dirpath,
        this.newDirName,
        null
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateFileList(this.parentId, this.pageNum, this.dirpath);
      } else {
        this.$message.error("新建失败:文件名重复!");
      }
      this.fileDialogVisible = false;
      this.newDirName = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
    },
    selectTableAll() {
      if (this.childFileList != null) {
        if (this.checkedfile.length >= this.childFileList.length) {
          this.checkedfile = [];
        } else {
          this.checkedfile = [];
          this.childFileList.forEach((item) => {
            this.checkedfile.push(item.fileName);
          });
        }
      }
    },
    selectFile(selection, row) {
      if (this.checkedfile.includes(row.fileName)) {
        this.checkedfile.forEach(function (item, index, arr) {
          if (item == row.fileName) {
            arr.splice(index, 1);
          }
        });
      } else {
        this.checkedfile.push(row.fileName);
      }
      if (this.childFileList != null) {
        if (this.checkedfile.length == this.childFileList.length) {
          this.checkedall = true;
        } else {
          this.checkedall = false;
        }
      } else {
        this.checkedall = false;
      }
    },
    goBack() {
      this.path.pop();
      this.updateFileList(this.parentId, 1, this.dirpath);
    },
    openDir(row) {
      if (row.fileType == 1) {
        this.path.push(row.fileName);
        this.updateFileList(this.parentId, 1, this.dirpath);
      }
    },
    updateFileList(parentId, val, filePath) {
      if (parentId == null && this.parentFileList.length > 0) {
        parentId = this.parentFileList[0].id;
        this.ParentFileName = this.parentFileList[0].fileName;
      }
      this.$store.dispatch("File/getChildFileList", {
        dataId: parentId,
        filePath: filePath,
        current: val,
        size: this.page,
      });

      this.initShow();
    },
    async updateParentFileList() {
      let result = await reqParentFile(1, 0, 0);
      if (result.code == "200") {
        this.$store.dispatch("File/getParentFileList", result.data);
        this.parentFileName = result.data[0].name;
      }
      if (this.parentFileList != null) {
        this.updateFileList(this.parentFileList[0].id, this.pageNum, null);
      }
    },
    async updatename(index, row) {
      this.changeIsShow(index);
      if (this.oldname != row.fileName) {
        let result = await reqUpdateChildFileName(
          this.parentId,
          this.dirpath,
          this.oldname,
          row.fileName
        );
        if (result.code == "200") {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.$message.error("修改失败");
        }
      } else {
        this.$message.warning("新名称与原名称相同");
      }
    },
    handleCurrentChange(val) {
      this.updateFileList(this.parentId, val, this.dirpath);
    },
    handleSizeChange(val) {
      this.page = val;
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
    },
  },
  async mounted() {
    let result = await reqParentFile(1, 0, 0);
    if (result.data.length > 0) {
      this.$store.dispatch("File/getParentFileList", result.data);
      this.parentFileName = result.data[0].name;
      if (result.code == "200" && result.data.length > 0) {
        this.$store.dispatch("File/getChildFileList", {
          dataId: result.data[0].id,
          filePath: null,
          current: 1,
          size: this.page,
        });
      }
      this.initShow();
      this.parentId = result.data[0].id;
    }
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.left-card {
  margin-top: 10px;
  margin-left: 10px;
  height: calc(100vh - 170px);
}
.el-button {
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.el-divider {
  background-color: #bcbfc8;
  height: 2px;
  margin: 4px 0;
}
.parentIcon {
  cursor: pointer;
}
.size {
  font-size: 16px;
}
</style>
