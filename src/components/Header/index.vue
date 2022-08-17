<template>
  <el-row>
    <el-menu mode="horizontal" background-color="#ADB6CA" text-color="black">
      <el-col :span="20">
        <div style="text-align: center; height: 60px">
          <img
            src="@/assets/images/titleicon.jpg"
            style="height: 60px; width: 210px; margin-left: 10px; float: left"
          />
          <span class="font">米级国产卫星数据存算共享云平台 </span>
        </div>
      </el-col>
      <el-col :span="1">
        <div style="text-align: center; height: 60px; font-size: 16px">
          {{ username }}
        </div>
      </el-col>
      <el-col style="width: 100px">
        <el-submenu index="1" style="padding: 0px">
          <el-menu-item
            index="1"
            style="padding: 0px"
            @click="passwordDialogVisible = true"
          >
            <i class="el-icon-edit" style="color: black">修改密码</i>
          </el-menu-item>
          <template slot="title">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </template>
        </el-submenu>
      </el-col>
      <el-col :span="1" style="text-align: center">
        <el-menu-item
          index="2"
          @click="logout"
          class="size"
          style="padding: 0px; font-size: 16px"
          >Logout</el-menu-item
        >
      </el-col>
    </el-menu>
    <el-dialog
      title="修改密码"
      :visible.sync="passwordDialogVisible"
      width="400px"
      :before-close="handleClose"
      class="dialogClass"
    >
      <el-form
        ref="passwdForm"
        style="margin: 0px; padding: 0px"
        label-position="right"
        label-width="100px"
        :rules="passwdRules"
        :model="passwd"
      >
        <el-col>
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input
              placeholder="请输入当前密码"
              size="small"
              v-model="passwd.oldPassword"
              style="width: 270px"
              @blur="verifyPasswd()"
              show-password
            ></el-input> </el-form-item
        ></el-col>
        <el-col>
          <el-form-item label="新密码" prop="newPassword1">
            <el-input
              show-password
              placeholder="请输入新密码"
              size="small"
              v-model="passwd.newPassword1"
              style="width: 270px"
            ></el-input></el-form-item
        ></el-col>
        <el-col>
          <el-form-item label="二次确认" prop="newPassword2">
            <el-input
              show-password
              placeholder="请再次输入新密码"
              size="small"
              v-model="passwd.newPassword2"
              style="width: 270px"
            ></el-input></el-form-item></el-col
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePasswd()" size="small">取 消</el-button>
        <el-button type="primary" @click="updatePasswd()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import { reqVerifyPasswd, reqUpdateUserPassword } from "@/api";

import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    var verifyPassword = (rule, value, callback) => {
      if (this.passwd.newPassword2 === "") {
        return callback(new Error("请再次输入密码"));
        // password 是表单上绑定的字段
      } else if (this.passwd.newPassword2 != this.passwd.newPassword1) {
        return callback(new Error("两次输入密码不一致!"));
      } else {
        return callback();
      }
    };
    return {
      passwordDialogVisible: false,
      passwd: { oldPassword: "", newPassword1: "", newPassword2: "" },

      passwdRules: {
        oldPassword: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newPassword1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        newPassword2: [
          { required: true, validator: verifyPassword, trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState("User", ["userInfo"]),
    username() {
      return localStorage.getItem("user");
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    async verifyPasswd() {
      let Base64 = require("js-base64").Base64;
      if (this.passwd.oldPassword != "") {
        let result = await reqVerifyPasswd(
          Base64.encode(this.passwd.oldPassword)
        );
        if (result.data !== true) {
          this.$message.error("原密码错误!");
          this.passwd.oldPassword = "";
        }
      }
    },
    handleClose(done) {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          _this.passwd.oldPassword = "";
          _this.passwd.newPassword1 = "";
          _this.passwd.newPassword2 = "";
          done();
        })
        .catch((_) => {});
    },
    closePasswd() {
      this.passwordDialogVisible = false;
      this.passwd.oldPassword = "";
      this.passwd.newPassword1 = "";
      this.passwd.newPassword2 = "";
    },
    updatePasswd() {
      this.passwordDialogVisible = false;
      let _this = this;
      this.$refs["passwdForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          //TODO:发送修改密码的请求
          let Base64 = require("js-base64").Base64;
          let result = await reqUpdateUserPassword({
            password: Base64.encode(this.passwd.newPassword1),
            oldPassword: Base64.encode(this.passwd.oldPassword),
            id: this.userInfo.id,
          });
          _this.logout();
        }
      });
    },
  },
};
</script>
<style>
.font {
  /* float: right; */
  font-size: 25px;
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
