<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>信息管理</el-breadcrumb-item>
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
        <el-form
          ref="userForm"
          style="margin: 0px; padding: 0px; width: calc(100vh-250px)"
          :model="userInfo"
          :rules="userInfoRules"
        >
          <el-descriptions
            title="信息管理"
            :column="2"
            class="positioncss size"
            border
            style="width: 100%"
          >
            <template slot="extra">
              <el-button
                type="primary"
                size="small"
                style="margin-right: 20px"
                icon="el-icon-edit"
                v-if="!edit"
                @click="edit = true"
                >编辑</el-button
              >
              <el-form-item>
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-check"
                  v-if="edit"
                  @click="updateUserInfo()"
                  >保存</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  style="margin-right: 20px"
                  icon="el-icon-close"
                  v-if="edit"
                  @click="cancelUpdate()"
                  >取消</el-button
                ></el-form-item
              >
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-info"></i>
                登录账号 </template
              >{{ userInfo.login }}</el-descriptions-item
            >
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                昵称</template
              >{{ userInfo.name }}</el-descriptions-item
            >
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-edit"></i>
                密码
              </template>
              <span class="passwd" @click="passwordDialogVisible = true"
                >修改密码</span
              ></el-descriptions-item
            >
            <el-descriptions-item>
              <template slot="label">
                <i class="iconfont icon-xingbie" style="font-size: 16px"></i>
                性别
              </template>
              <!-- <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机
              </template> -->
              <el-tag size="small" v-show="!edit">{{ userSex }}</el-tag>

              <el-form-item v-show="edit" prop="phone">
                <!-- <el-input size="small" v-model="userSex"></el-input> -->
                <el-select size="small" v-model="userSex">
                  <el-option label="男" value="男"></el-option
                  ><el-option label="女" value="女"></el-option
                ></el-select> </el-form-item
            ></el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-message"></i>
                邮箱
              </template>
              <el-tag size="small" v-show="!edit">{{ userInfo.email }}</el-tag>
              <el-form-item v-show="edit" prop="email">
                <el-input size="small" v-model="userInfo.email"></el-input
              ></el-form-item>
            </el-descriptions-item> </el-descriptions></el-form
      ></Transition>
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
          <el-row>
            <el-form-item label="当前密码" prop="oldPassword">
              <el-input
                placeholder="请输入当前密码"
                size="small"
                v-model="passwd.oldPassword"
                style="width: 270px"
                @blur="verifyPasswd()"
                show-password
              ></el-input> </el-form-item
          ></el-row>
          <el-row>
            <el-form-item label="新密码" prop="newPassword1">
              <el-input
                show-password
                placeholder="请输入新密码"
                size="small"
                v-model="passwd.newPassword1"
                style="width: 270px"
              ></el-input></el-form-item
          ></el-row>
          <el-row style="margin-bottom: 15px">
            <el-form-item label="二次确认" prop="newPassword2">
              <el-input
                show-password
                placeholder="请再次输入新密码"
                size="small"
                v-model="passwd.newPassword2"
                style="width: 270px"
              ></el-input></el-form-item></el-row
        ></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closePasswd()" size="small">取 消</el-button>
          <el-button type="primary" @click="updatePasswd()" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  reqVerifyPasswd,
  reqUpdateUserPassword,
  reqUpdateUserInfo,
  reqUserInfoUpdateGender,
} from "@/api";
export default {
  name: "UserInfo",
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
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };

    return {
      userSex: "",
      edit: false,
      passwordDialogVisible: false,
      passwd: { oldPassword: "", newPassword1: "", newPassword2: "" },

      passwdRules: {
        oldPassword: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newPassword1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "请输入8-16位字符",
            trigger: "blur",
          },
        ],
        newPassword2: [
          { required: true, validator: verifyPassword, trigger: "change" },
        ],
      },
      userInfo: {},
      userInfoRules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    updateUserInfo() {
      let _this = this;
      this.$refs["userForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          let result = await reqUpdateUserInfo({
            accountId: JSON.parse(localStorage.getItem("userInfo")).id,
            dynamicFields: {},
            email: _this.userInfo.email,
            phone: _this.userInfo.phone,
          });
          let resultUserInfo = await reqUserInfoUpdateGender(_this.userSex);
          if (result.code == "200" && resultUserInfo.code == "200") {
            _this.edit = false;
            localStorage.setItem("userInfo", JSON.stringify(_this.userInfo));
            localStorage.setItem(
              "userotherInfo",
              JSON.stringify(resultUserInfo.data)
            );
            _this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            _this.$message.error("修改失败");
          }
        }
      });
    },
    cancelUpdate() {
      this.edit = false;
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.clearValidate("userForm");
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
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
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userSex = JSON.parse(localStorage.getItem("userotherInfo")).sex;
  },
};
</script>

<style scoped>
@import "@/assets/icon/iconfont.css";
.positioncss {
  margin-top: 10px;
  margin-left: 10px;
}
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
.el-input {
  width: 300px;
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
.passwd {
  cursor: pointer;
  color: #568afa;
}
.el-form-item {
  margin-bottom: 0px;
  padding: 0px;
}
.el-form {
  align-items: flex-start;
}
.dialogClass .el-dialog__body {
  padding: 0px;
  font-size: 16px;
}
</style>
