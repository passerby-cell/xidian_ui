<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="bigsize">智能检测</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 200px); overflow: auto"
    >
      <div>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
          ><div>
            <el-row>
              <h3 class="middlesize">
                <span style="color: #409eff">|</span
                >&nbsp;杂波背景下低小慢目标智能检测
              </h3>
            </el-row>
            <el-row style="margin-top: 20px; margin-left: 0px">
              <el-button-group>
                <el-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  @click="show = false"
                  >数据处理</el-button
                >
                <el-button
                  type="primary"
                  @click="
                    show = true;
                    cc = null;
                  "
                  >目标检测<i class="el-icon-arrow-right el-icon--right"></i
                ></el-button> </el-button-group
            ></el-row>
          </div>
        </Transition>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <div v-if="!show" style="position: absolute; top: 200px; width: 90%">
            <el-row style="margin-top: 20px">
              <el-col :span="3"
                ><el-button
                  type="primary"
                  icon="el-icon-view"
                  @click="fuZaZaBoChangJingZhanShi()"
                  >复杂杂波场景展示</el-button
                >
              </el-col>
              <el-col :span="3" :offset="2"
                ><el-button
                  type="primary"
                  icon="el-icon-view"
                  @click="shuJvYuChuLi()"
                  >输入数据预处理</el-button
                ></el-col
              >
            </el-row>

            <el-row class="martop" style="margin-left: 10px; width: 90%">
              <el-col :span="6" v-if="showfig1">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    复杂杂波场景图三维图
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig1.isloading"
                    :element-loading-text="loading.fig1.num"
                  >
                    <img v-bind:src="fig1" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" v-if="showfig2">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    复杂杂波场景中所有距离单元杂波多普勒谱
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig2.isloading"
                    :element-loading-text="loading.fig2.num"
                  >
                    <img v-bind:src="fig2" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" v-if="showfig3">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    两帧相减后的距离多普勒信息
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig3.isloading"
                    :element-loading-text="loading.fig3.num"
                  >
                    <img v-bind:src="fig3" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" v-if="showfig4">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    两帧相减后所有距离单元的多普勒谱
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig4.isloading"
                    :element-loading-text="loading.fig4.num"
                  >
                    <img v-bind:src="fig4" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
            </el-row>
          </div>
        </Transition>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <div v-if="show">
            <el-row>
              <el-col :span="8">
                <h3 style="margin-top: 5px" class="middlesize">
                  <span style="color: #409eff">|</span
                  >&nbsp;目标检测概率曲线图总览
                </h3>
              </el-col>
              <el-col :span="2">
                <h3 class="middlesize" style="margin-top: 5px">虚警概率</h3>
              </el-col>
              <el-col :span="3"
                ><el-input-number
                  v-model="pfa"
                  :min="3"
                  :max="6"
                  style="width: 100%"
                  label="虚警概率"
                ></el-input-number
              ></el-col>
              <el-col :span="4" :offset="1">
                <el-button
                  type="primary"
                  icon="el-icon-connection"
                  @click="jiaZaiPfa()"
                  >加载</el-button
                >
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="8">
                <h3 style="margin-top: 5px" class="middlesize">
                  <span style="color: #409eff">|</span
                  >&nbsp;不同速度目标检测概率曲线图细览
                </h3>
              </el-col>
              <el-col :span="2">
                <h3 class="middlesize" style="margin-top: 5px">虚警概率</h3>
              </el-col>
              <el-col :span="3"
                ><el-input-number
                  v-model="gailvone"
                  :min="3"
                  :max="6"
                  style="width: 100%"
                  label="虚警概率"
                ></el-input-number
              ></el-col>
              <el-col :span="2" :offset="1">
                <h3 class="middlesize" style="margin-top: 5px">速度</h3>
              </el-col>
              <el-col :span="3"
                ><el-input-number
                  v-model="suduone"
                  :min="1"
                  :max="8"
                  style="width: 100%"
                  label="速度"
                ></el-input-number
              ></el-col>
              <el-col :span="3" :offset="1"
                ><el-button
                  type="primary"
                  icon="el-icon-connection"
                  @click="jiaZaiGaiLvQuXianTuXiLan()"
                  >加载</el-button
                ></el-col
              >
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="8">
                <h3 class="middlesize" style="margin-top: 5px">
                  <span style="color: #409eff">|</span
                  >&nbsp;距离扩展时不同速度目标检测概率曲线图细览
                </h3>
              </el-col>
              <el-col :span="2">
                <h3 class="middlesize" style="margin-top: 5px">虚警概率</h3>
              </el-col>
              <el-col :span="3"
                ><el-input-number
                  v-model="gailvtwo"
                  :min="3"
                  :max="6"
                  style="width: 100%"
                  label="虚警概率"
                ></el-input-number
              ></el-col>
              <el-col :span="2" :offset="1">
                <h3 class="middlesize" style="margin-top: 5px">速度</h3>
              </el-col>
              <el-col :span="3"
                ><el-input-number
                  v-model="sudutwo"
                  :min="1"
                  :max="8"
                  style="width: 100%"
                  label="速度"
                ></el-input-number
              ></el-col>
              <el-col :span="3" :offset="1"
                ><el-button
                  type="primary"
                  icon="el-icon-connection"
                  @click="jiaZaiMuBiaoJianCe()"
                  >加载</el-button
                ></el-col
              >
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="8">
                <h3 class="middlesize" style="margin-top: 5px">
                  <span style="color: #409eff">|</span
                  >&nbsp;3m/s目标检测概率曲线图
                </h3>
              </el-col>
              <el-col :span="2">
                <h3 class="middlesize" style="margin-top: 5px">虚警概率</h3>
              </el-col>
              <el-col :span="3"
                ><el-input-number
                  v-model="gailvthree"
                  :min="3"
                  :max="6"
                  style="width: 100%"
                  label="虚警概率"
                ></el-input-number
              ></el-col>
              <el-col :span="3" :offset="1"
                ><el-button
                  type="primary"
                  icon="el-icon-connection"
                  @click="jiaZaiMuBiaoJianCeQuXianTu()"
                  >加载</el-button
                ></el-col
              >
            </el-row>
            <el-row class="martop" style="margin-left: 10px; width: 90%">
              <el-col :span="6" v-if="showfig5">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    的检测概率曲线图
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig5.isloading"
                    :element-loading-text="loading.fig5.num"
                  >
                    <img v-bind:src="fig5" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" v-if="showfig6">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    目标检测概率曲线对比图
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig6.isloading"
                    :element-loading-text="loading.fig6.num"
                  >
                    <img v-bind:src="fig6" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" v-if="showfig7">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    目标检测概率曲线对比图
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig7.isloading"
                    :element-loading-text="loading.fig7.num"
                  >
                    <img v-bind:src="fig7" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" v-if="showfig8">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <p style="text-align: center" class="smallsize">
                    目标检测概率曲线对比图
                  </p>
                  <div
                    class="divclass"
                    v-loading="loading.fig8.isloading"
                    :element-loading-text="loading.fig8.num"
                  >
                    <img v-bind:src="fig8" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
            </el-row>
            <el-row class="martop" style="margin-left: 30px" v-if="false">
              <el-col :span="6">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <div style="padding-top: 3px; height: 30px">
                    <p style="text-align: center" class="smallsize">
                      相同杂波场景不同速度下GM-CVAE和CFAR检测性能
                    </p>
                  </div>
                  <div
                    style="text-align: center"
                    v-loading="isloading"
                    :element-loading-text="num"
                  >
                    <img v-bind:src="fig7" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" :offset="2">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 305px; width: 380px"
                >
                  <div style="padding-top: 3px; height: 30px">
                    <p style="text-align: center" class="smallsize">
                      相同杂波场景不同速度下GM-CVAE和CFAR实际虚警率
                    </p>
                  </div>
                  <div
                    style="text-align: center"
                    v-loading="isloading"
                    :element-loading-text="num"
                  >
                    <img v-bind:src="fig8" class="imgBox" />
                  </div>
                </dv-border-box-12>
              </el-col>
            </el-row></div
        ></Transition>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  reqThirdone,
  reqThirdtwo,
  reqThirdthree,
  reqThirdfour,
  reqThirdfive,
  reqThirdsix,
} from "@/api/index";
export default {
  name: "DiXiaoMan",
  data() {
    return {
      isloading: false,
      pfa: 3,
      BaseUri: "http://127.0.0.1:8080/preview/",
      loading: {
        fig1: { isloading: false, num: 0 },
        fig2: { isloading: false, num: 0 },
        fig3: { isloading: false, num: 0 },
        fig4: { isloading: false, num: 0 },
        fig5: { isloading: false, num: 0 },
        fig6: { isloading: false, num: 0 },
        fig7: { isloading: false, num: 0 },
        fig8: { isloading: false, num: 0 },
      },
      fig1: null,
      fig2: null,
      fig3: null,
      fig4: null,
      fig5: null,
      fig6: null,
      fig7: null,
      fig8: null,
      show: false,
      gailvone: 3,
      gailvtwo: 3,
      gailvthree: 3,
      suduone: 1,
      sudutwo: 1,
      showfig1: false,
      showfig2: false,
      showfig3: false,
      showfig4: false,
      showfig5: false,
      showfig6: false,
      showfig7: false,
      showfig8: false,
    };
  },
  computed: {},
  methods: {
    async fuZaZaBoChangJingZhanShi() {
      this.showfig1 = true;
      this.showfig2 = true;
      this.fig1 = this.BaseUri + "null.png";
      this.fig2 = this.BaseUri + "null.png";
      this.loading.fig1.num = 0;
      this.loading.fig1.isloading = true;
      this.loading.fig2.num = 0;
      this.loading.fig2.isloading = true;
      let percentage = 1;
      let _this = this;
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.fig1.num = "99%";
          _this.loading.fig2.num = "99%";
        } else {
          _this.loading.fig1.num = percentage + "%";
          _this.loading.fig2.num = percentage + "%";
        }
      }, 100);
      let res = await reqThirdone();
      clearInterval(inteval);
      if (res.flag) {
        this.fig1 = this.BaseUri + "1.jpg";
        this.fig2 = this.BaseUri + "2.jpg";

        this.loading.fig1.isloading = false;
        this.loading.fig2.isloading = false;
      }
    },
    async shuJvYuChuLi() {
      this.showfig3 = true;
      this.showfig4 = true;
      this.fig3 = this.BaseUri + "null.png";
      this.fig4 = this.BaseUri + "null.png";
      this.loading.fig3.num = 0;
      this.loading.fig3.isloading = true;
      this.loading.fig4.num = 0;
      this.loading.fig4.isloading = true;
      let percentage = 1;
      let _this = this;
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.fig3.num = "99%";
          _this.loading.fig4.num = "99%";
        } else {
          _this.loading.fig3.num = percentage + "%";
          _this.loading.fig4.num = percentage + "%";
        }
      }, 100);
      let res = await reqThirdtwo();
      clearInterval(inteval);
      if (res.flag) {
        this.fig3 = this.BaseUri + "3.jpg";
        this.fig4 = this.BaseUri + "4.jpg";
        this.loading.fig3.isloading = false;
        this.loading.fig4.isloading = false;
      }
    },
    async jiaZaiPfa() {
      this.showfig5 = true;
      this.fig5 = this.BaseUri + "null.png";
      this.loading.fig5.num = 0;
      this.loading.fig5.isloading = true;

      let percentage = 1;
      let _this = this;
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.fig5.num = "99%";
        } else {
          _this.loading.fig5.num = percentage + "%";
        }
      }, 100);
      let res = await reqThirdthree(this.pfa);
      clearInterval(inteval);
      if (res.flag) {
        this.fig5 = this.BaseUri + "5.jpg";
        this.showfig5 = true;
        this.loading.fig5.isloading = false;
      }
    },
    async jiaZaiGaiLvQuXianTuXiLan() {
      this.showfig6 = true;

      this.fig6 = this.BaseUri + "null.png";
      this.loading.fig6.num = 0;
      this.loading.fig6.isloading = true;

      let percentage = 1;
      let _this = this;
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.fig6.num = "99%";
        } else {
          _this.loading.fig6.num = percentage + "%";
        }
      }, 100);
      let res = await reqThirdfour(this.gailvone, this.suduone);
      clearInterval(inteval);
      if (res.flag) {
        this.fig6 = this.BaseUri + "6.jpg";
        this.showfig6 = true;
        this.loading.fig6.isloading = false;
      }
    },
    async jiaZaiMuBiaoJianCe() {
      this.showfig7 = true;
      this.fig7 = this.BaseUri + "null.png";
      this.loading.fig7.num = 0;
      this.loading.fig7.isloading = true;
      let percentage = 1;
      let _this = this;
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.fig7.num = "99%";
        } else {
          _this.loading.fig7.num = percentage + "%";
        }
      }, 100);
      let res = await reqThirdfive(this.gailvtwo, this.sudutwo);
      clearInterval(inteval);
      if (res.flag) {
        this.fig7 = this.BaseUri + "7.jpg";
        this.loading.fig7.isloading = false;
      }
    },
    async jiaZaiMuBiaoJianCeQuXianTu() {
      this.showfig8 = true;
      this.fig8 = this.BaseUri + "null.png";
      this.loading.fig8.num = 0;
      this.loading.fig8.isloading = true;
      let percentage = 1;
      let _this = this;
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.fig8.num = "99%";
        } else {
          _this.loading.fig8.num = percentage + "%";
        }
      }, 100);
      let res = await reqThirdsix(this.gailvthree);
      clearInterval(inteval);
      if (res.flag) {
        this.fig8 = this.BaseUri + "8.jpg";
        this.loading.fig8.isloading = false;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("../../../fontsize.css");
.divclass {
  text-align: center;
}
.divclass >>> .el-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0) !important;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  height: 270px !important;
  width: 360px !important;
  overflow: hidden;
}
.el-dialog__body {
  padding: 0px;
}
.imgBox {
  height: 270px;
  width: 360px;
}
/* .divclass:hover img {
  transform: scale(1.2);
  transition: all 1s;
} */
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}

.el-table {
  font-style: initial;
  font-size: 16px;
}

.card-style {
  margin: 10px;
  background-color: transparent;
  border: 0px;
  min-width: 1600px !important;
  overflow: hidden;
}

.el-breadcrumb__inner {
  color: #ffffff !important;
}

.el-breadcrumb__separator {
  margin: 0 9px;
  font-weight: 700;
  color: #ffffff !important;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: #ffffff !important;
  cursor: text;
}

::v-deep .el-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0) !important;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  height: 400px !important;
  width: 500px !important;
  overflow: hidden;
}
</style>
