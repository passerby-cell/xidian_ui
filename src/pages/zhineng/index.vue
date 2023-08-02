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
                >&nbsp;复杂杂波精细化建模与目标检测
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
              <el-col :span="3">
                <h3 class="middlesize" style="margin-top: 5px">杂波场景</h3>
              </el-col>
              <el-col :span="4">
                <el-select
                  v-model="cc"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="changeZaBoChangJing"
                >
                  <el-option
                    v-for="item in CCoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="3" :offset="1">
                <h3 class="middlesize" style="margin-top: 5px">MTI处理</h3>
              </el-col>
              <el-col :span="4"
                ><el-switch
                  style="margin-top: 10px"
                  v-model="mti"
                  active-text="是"
                  inactive-text="否"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeMTI"
                >
                </el-switch
              ></el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="3">
                <h3 class="middlesize" style="margin-top: 5px">SNR/dB</h3>
              </el-col>
              <el-col :span="4">
                <h3 class="middlesize" style="margin-top: 5px">
                  {{ SNR }}dB
                </h3></el-col
              >
              <el-col :span="3" :offset="1">
                <h3 class="middlesize" style="margin-top: 5px">目标速度</h3>
              </el-col>
              <el-col :span="4">
                <el-select
                  v-model="vv"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="changeMuBiaoSuDu"
                >
                  <el-option
                    v-for="item in VVoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <!-- <el-col :span="2" :offset="1"
                ><el-button
                  type="primary"
                  @click="shujuyuchuli()"
                  icon="el-icon-view"
                  >数据预处理</el-button
                ></el-col
              > -->
            </el-row>
            <el-row class="martop" style="margin-left: 30px">
              <el-col :span="6" v-if="showfig1">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
                >
                  <p style="text-align: center" class="middlesize">
                    杂波场景图
                  </p>
                  <div style="text-align: center">
                    <img
                      v-bind:src="fig1"
                      style="height: 370px; width: 500px"
                    />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" :offset="2" v-if="showfig2">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
                >
                  <p style="text-align: center" class="middlesize">
                    MTD后训练数据
                  </p>
                  <div style="text-align: center">
                    <img
                      v-bind:src="fig2"
                      style="height: 370px; width: 500px"
                    />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" :offset="2" v-if="showfig3">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
                >
                  <p style="text-align: center" class="middlesize">
                    MTD后测试数据
                  </p>
                  <div style="text-align: center">
                    <img
                      v-bind:src="fig3"
                      style="height: 370px; width: 500px"
                    />
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
            <el-row style="margin-top: 20px">
              <el-col :span="3">
                <h3 class="middlesize" style="margin-top: 5px">杂波场景</h3>
              </el-col>
              <el-col :span="4">
                <el-select
                  v-model="cc"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in CCJianCeoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="3" :offset="1">
                <h3 class="middlesize" style="margin-top: 5px">目标速度</h3>
              </el-col>
              <el-col :span="4">
                <el-select
                  v-model="vv"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in VVoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <!-- <el-col :span="3">
                <h3 class="middlesize" style="margin-top: 5px">SNR/dB</h3>
              </el-col>
              <el-col :span="4"
                ><el-input-number
                  v-model="snr"
                  :min="-3"
                  :step="4"
                  :max="37"
                  style="width: 100%"
                ></el-input-number
              ></el-col> -->
              <el-col :span="3">
                <h3 class="middlesize" style="margin-top: 5px">
                  传统方法虚警率
                </h3>
              </el-col>
              <el-col :span="4">
                <el-select
                  v-model="pp"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in PPoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2" :offset="1"
                ><el-button
                  type="primary"
                  @click="ZhiNengJianCe()"
                  icon="el-icon-view"
                  >目标检测</el-button
                ></el-col
              >
            </el-row>
            <el-row class="martop" style="margin-left: 30px" v-if="showfig4to8">
              <el-col :span="6">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
                  ><div style="padding-top: 3px; height: 30px">
                    <p style="text-align: center" class="smallsize">
                      相同杂波场景相同速度下网络和CFAR方法检测性能
                    </p>
                  </div>

                  <div
                    style="text-align: center"
                    v-loading="isloading"
                    :element-loading-text="num"
                  >
                    <img
                      v-bind:src="fig4"
                      style="height: 370px; width: 500px"
                    />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" :offset="2">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
                >
                  <div style="padding-top: 3px; height: 30px">
                    <p style="text-align: center" class="smallsize">
                      相同杂波场景相同速度下不同方法的检测性能
                    </p>
                  </div>
                  <div
                    style="text-align: center"
                    v-loading="isloading"
                    :element-loading-text="num"
                  >
                    <img
                      v-bind:src="fig5"
                      style="height: 370px; width: 500px"
                    />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" :offset="2">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
                >
                  <div style="padding-top: 3px; height: 30px">
                    <p style="text-align: center" class="smallsize">
                      相同杂波场景相同速度下不同方法的实际虚警率
                    </p>
                  </div>
                  <div
                    style="text-align: center"
                    v-loading="isloading"
                    :element-loading-text="num"
                  >
                    <img
                      v-bind:src="fig6"
                      style="height: 370px; width: 500px"
                    />
                  </div>
                </dv-border-box-12>
              </el-col>
            </el-row>
            <el-row class="martop" style="margin-left: 30px" v-if="false">
              <el-col :span="6">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
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
                    <img
                      v-bind:src="fig7"
                      style="height: 370px; width: 500px"
                    />
                  </div>
                </dv-border-box-12>
              </el-col>
              <el-col :span="6" :offset="2">
                <dv-border-box-12
                  :reverse="true"
                  :color="['#6987d6', '#5089da']"
                  style="height: 410px; width: 520px"
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
                    <img
                      v-bind:src="fig8"
                      style="height: 370px; width: 500px"
                    />
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
import { reqDraw } from "@/api/index";
export default {
  name: "zhineng",
  data() {
    return {
      isloading: false,
      num: 0,
      BaseUri: "http://127.0.0.1:8080/preview/",
      fig1: null,
      fig2: null,
      fig3: null,
      fig4: null,
      fig5: null,
      fig6: null,
      fig7: null,
      fig8: null,
      show: false,
      mti: false,
      snr: [13, 21, 33],

      CCoptions: [
        { label: "城市杂波I", value: "1" },
        { label: "城市杂波II", value: "2" },
        { label: "城市杂波III", value: "3" },
        { label: "复杂城市杂波I+II", value: "4" },
        { label: "复杂城市杂波I+III", value: "5" },
        { label: "复杂城市杂波II+III", value: "6" },
        { label: "复杂城市杂波I+II+III", value: "7" },
      ],
      CCJianCeoptions: [
        { label: "城市杂波II", value: "2" },
        { label: "复杂城市杂波I+II", value: "4" },
        { label: "复杂城市杂波I+II+III", value: "7" },
      ],
      cc: null,
      vv: null,

      pp: null,
      PPoptions: [
        { label: "0.001", value: "1" },
        { label: "0.0001", value: "2" },
        { label: "0.00001", value: "3" },
        { label: "0.000001", value: "4" },
      ],
      showfig1: false,
      showfig2: false,
      showfig3: false,
      showfig4to8: false,
    };
  },
  computed: {
    mm() {
      return this.mti ? "2" : "1";
    },
    SNR() {
      if (this.vv == 1 || this.vv == 2) {
        return 33;
      } else if (this.vv == 3) {
        return 21;
      } else if (this.vv == 4) {
        return 13;
      } else {
        return 0;
      }
    },
    VVoptions() {
      if (this.mti == false && this.show == false) {
        return [
          { label: "1.0549m/s", value: "1" },
          { label: "3.1646m/s", value: "2" },
        ];
      } else if (this.mti == true && this.show == false) {
        return [
          { label: "3.1646m/s", value: "3" },
          { label: "5.2743m/s", value: "4" },
        ];
      } else {
        return [
          { label: "1.0549m/s", value: "1" },
          { label: "3.1646m/s", value: "2" },
          { label: "MTI+3.1646m/s", value: "3" },
          { label: "MTI+5.2743m/s", value: "4" },
        ];
      }
    },
  },
  methods: {
    changeMTI() {
      if (this.cc == null) {
        this.$message({
          message: "请先选择杂波场景",
          type: "warning",
        });
        return;
      } else {
        this.showfig2 = true;
        this.fig2 =
          this.BaseUri + "trmtd_cc" + this.cc + "_mm" + this.mm + ".jpg";
      }
      if (this.showfig3 == true) {
        this.shujuyuchuli();
      }
    },
    changeZaBoChangJing() {
      this.showfig1 = true;
      this.fig1 = this.BaseUri + "orig_cc" + this.cc + ".jpg";
      // this.showfig2 = true;
      // this.fig2 =
      //   this.BaseUri + "trmtd_cc" + this.cc + "_mm" + this.mm + ".jpg";
    },
    changeMuBiaoSuDu(value) {
      if (value == 3 || value == 4) {
        this.mti = true;
      } else {
        this.mti = false;
      }
      this.shujuyuchuli();
    },
    async ZhiNengJianCe() {
      if (this.cc == null || this.vv == null || this.pp == null) {
        this.$message({
          message: "请先选择杂波场景、目标速度、虚警率",
          type: "warning",
        });
        return;
      } else {
        this.fig4 = this.BaseUri + "null.png";
        this.fig5 = this.BaseUri + "null.png";
        this.fig6 = this.BaseUri + "null.png";
        this.fig7 = this.BaseUri + "null.png";
        this.fig8 = this.BaseUri + "null.png";
        this.num = 0;
        this.isloading = true;
        this.showfig4to8 = true;
        let percentage = 1;
        let _this = this;
        let inteval = setInterval(() => {
          percentage += 2;
          if (percentage >= 100) {
            _this.num = "99%";
          } else {
            _this.num = percentage + "%";
          }
          // console.log(_this.num);
        }, 60);
        let result = await reqDraw(this.cc, this.vv, this.pp);
        if (result.code == 200) {
          clearInterval(inteval);
          this.isloading = false;
          this.fig4 =
            this.BaseUri + "Pd_cc" + this.cc + "_vv" + this.vv + "pfa3456.jpg";
          this.fig5 =
            this.BaseUri +
            "Pd_cc" +
            this.cc +
            "_vv" +
            this.vv +
            "_pp" +
            this.pp +
            ".jpg";
          this.fig6 =
            this.BaseUri +
            "Pf_cc" +
            this.cc +
            "_vv" +
            this.vv +
            "_pp" +
            this.pp +
            ".jpg";
          this.fig7 =
            this.BaseUri + "Pd_cc" + this.cc + "_pp" + this.pp + "_v1234.jpg";
          this.fig8 =
            this.BaseUri + "Pf_cc" + this.cc + "_pp" + this.pp + "_v1234.jpg";
          this.$message({
            message: "智能检测成功",
            type: "success",
          });
        } else {
          this.isloading = false;
          this.num = 0;
          clearInterval(inteval);
          this.$message.error("运行失败！");
        }
      }
    },
    shujuyuchuli() {
      if (this.cc == null || this.vv == null) {
        this.$message({
          message: "请先选择杂波场景、目标速度",
          type: "warning",
        });
        return;
      } else {
        this.showfig3 = true;
        this.showfig2 = true;
        this.fig2 =
          this.BaseUri + "trmtd_cc" + this.cc + "_mm" + this.mm + ".jpg";
        this.fig3 =
          this.BaseUri +
          "temtd_cc" +
          this.cc +
          "_vv" +
          this.vv +
          "_snr" +
          this.SNR +
          ".jpg";
        this.$message({
          message: "数据预处理成功",
          type: "success",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("../../../fontsize.css");

.el-dialog__body {
  padding: 0px;
}

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
