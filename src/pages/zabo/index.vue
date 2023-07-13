<template>
  <div>
    <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="bigsize">数据分析</el-breadcrumb-item>
        <el-breadcrumb-item class="bigsize">杂波模型</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card class="card-style" shadow="hover" :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 200px); overflow: auto"><dv-border-box-1 style="height: calc(100vh - 220px);"
        :color="['#6987d6', '#5089da']">
        <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight">
          <div>
            <el-row>
              <el-col :span="4" style="margin-top: 25px;">
                <div @click="isShowSub(0)" style="margin-left: 20px;"><dv-border-box-13
                    style="cursor: pointer;  color: #1541c2;height:45px ;width: 170px;text-align: center;line-height: 45px;"
                    :color="['#6987d6', '#5089da']" class="middlesize"><span
                      ref="zhenshi">真实场景展示</span></dv-border-box-13>
                </div>
              </el-col>
              <el-col :span="4" style="margin-top: 25px;">
                <div @click="isShowSub(1)"><dv-border-box-13
                    style="cursor: pointer;  color: #1541c2;height:45px ;width: 150px;text-align: center;line-height: 45px;"
                    :color="['#6987d6', '#5089da']" class="middlesize"><span ref="shuju">数据预处理</span></dv-border-box-13>
                </div>
              </el-col>
              <el-col :span="4" style="margin-top: 25px;">
                <div @click="isShowSub(2)"><dv-border-box-13
                    style="cursor: pointer;  color: #1541c2;height:45px ;width: 140px; text-align: center;line-height: 45px;"
                    :color="['#6987d6', '#5089da']" class="middlesize"><span ref="zabo">杂波建模</span></dv-border-box-13>
                </div>
              </el-col>
            </el-row>

            <div v-show="showsub[0]" style="margin-top: 20px;">
              <el-row>

                <el-button @click="img.truth = true, img.radar = true" style="margin-left:50px" type="primary"
                  icon="el-icon-circle-plus-outline">加载</el-button>

              </el-row>
              <el-row class="martop" v-if="img.truth == true" style="margin-left: 30px;">

                <el-col :span="6">
                  <dv-border-box-12 :reverse="true" :color="['#6987d6', '#5089da']" style="height: 440px;width: 420px;">
                    <p style="text-align:center" class="middlesize">实际场景图</p>
                    <div style="text-align:center;">
                      <img v-bind:src="img_src_truth" style="height: 400px;width: 400px;" />
                    </div>
                  </dv-border-box-12>
                </el-col>
                <el-col :span="6" :offset="2">
                  <dv-border-box-12 :reverse="true" :color="['#6987d6', '#5089da']" style="height: 440px;width: 420px;">
                    <p style="text-align:center" class="middlesize">雷达部分回波图</p>
                    <div style="text-align:center;">
                      <img v-bind:src="img_src_radar" style="height: 400px;width: 400px;" />
                    </div>
                  </dv-border-box-12>
                </el-col>
              </el-row>
            </div>
            <div v-show="showsub[1]" style="margin-left:20px;margin-top: 20px;">
              <el-row>
                <el-col :span="4">
                  <h3 style="margin-top: 5px" class="middlesize">
                    <span style="color: #409eff">|</span>&nbsp;原始数据
                  </h3>
                </el-col>
                <el-col :span="2">
                  <h3 class="middlesize" style="margin-top: 5px;">帧数</h3>
                </el-col>
                <el-col :span="3"><el-input-number v-model="num" :min="1" :max="200" style="width:100%"
                    label="帧数"></el-input-number></el-col>
                <el-col :span="4" style="margin-left: 10px;">

                  <el-button type="primary" @click="loadData()" icon="el-icon-plus">加载</el-button>

                </el-col>
              </el-row>

              <el-row style="margin-top: 10px">
                <el-col :span="4">
                  <h3 style="margin-top: 5px" class="middlesize">
                    <span style="color: #409eff">|</span>&nbsp;脉冲压缩
                  </h3>
                </el-col>
                <el-col :span="3"><el-button type="primary" @click="pcProcess()"
                    icon="el-icon-magic-stick">脉冲压缩</el-button></el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="4">
                  <h3 class="middlesize" style="margin-top: 5px;">
                    <span style="color: #409eff">|</span>&nbsp;加目标（SNR/dB）
                  </h3>
                </el-col>
                <el-col :span="2">
                  <h3 class="middlesize" style="margin-top: 5px;">SNR/dB</h3>
                </el-col>
                <el-col :span="3"><el-input-number v-model="snr" :min="-30" :max="30" style="width:100%"
                    label="SNR/dB"></el-input-number></el-col>
                <el-col :span="3" style="margin-left: 10px;"><el-button type="primary" @click="addTarget()"
                    icon="el-icon-connection">加目标</el-button></el-col>
              </el-row>
              <el-row class="martop">
                <el-col :span="6" v-if="img.yuanshi">
                  <dv-border-box-12 :reverse="true" :color="['#6987d6', '#5089da']" style="height: 410px;width: 520px;">
                    <p style="text-align:center" class="middlesize">原始数据图</p>
                    <div style="text-align:center;" v-loading="loading.yuanshi.isloading"
                      :element-loading-text="loading.yuanshi.num">
                      <img v-bind:src="img_src_yuanshi" style="height: 370px;width: 500px;" />
                    </div>
                  </dv-border-box-12>
                </el-col>
                <el-col :span="6" :offset="2" v-if="img.maichong">
                  <dv-border-box-12 :reverse="true" :color="['#6987d6', '#5089da']" style="height: 410px;width: 520px;">
                    <p style="text-align:center" class="middlesize">脉冲压缩图</p>
                    <div style="text-align:center;" v-loading="loading.maichong.isloading"
                      :element-loading-text="loading.maichong.num">
                      <img v-bind:src="img_src_maichong" style="height: 370px;width: 500px;" />
                    </div>
                  </dv-border-box-12>
                </el-col><el-col :span="6" :offset="2" v-if="img.target"> <dv-border-box-12 :reverse="true"
                    :color="['#6987d6', '#5089da']" style="height: 410px;width: 520px;">
                    <p style="text-align:center" class="middlesize">添加目标图</p>
                    <div style="text-align:center;" v-loading="loading.target.isloading"
                      :element-loading-text="loading.target.num">
                      <img v-bind:src="img_src_target" style="height: 370px;width: 500px;" />
                    </div>
                  </dv-border-box-12>
                </el-col>
              </el-row>
            </div>
            <div v-show="showsub[2]" style="margin-left:20px;margin-top: 20px;">
              <el-row style="margin-top: 10px">
                <el-col :span="4">
                  <h3 class="middlesize" style="margin-top: 5px;">
                    <span style="color: #409eff">|</span>&nbsp;杂波建模
                  </h3>
                </el-col>
                <el-col :span="2">
                  <h3 class="middlesize" style="margin-top: 5px;">建模类别数</h3>
                </el-col>
                <el-col :span="3"><el-input-number v-model="clun" :min="2" :max="16" style="width:100%"
                    label="clun"></el-input-number></el-col>
                <el-col :span="2" :offset="1">
                  <h3 class="middlesize" style="margin-top: 5px;">建模方法</h3>
                </el-col>
                <el-col :span="3"> <el-select v-model="clumode" placeholder="请选择" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select></el-col>
                <el-col :span="3" style="margin-left: 10px;"><el-button type="primary" @click="modeling()"
                    icon="el-icon-copy-document">杂波建模</el-button></el-col>
              </el-row> <el-row class="martop" v-if="img.zabo">
                <el-col :span="6"><dv-border-box-12 :reverse="true" :color="['#6987d6', '#5089da']"
                    style="height: 410px;width: 520px;">
                    <p style="text-align:center" class="middlesize">杂波建模图</p>
                    <div style="text-align:center;" v-loading="loading.zabo.isloading"
                      :element-loading-text="loading.zabo.num">
                      <img v-bind:src="img_src_zabo" style="height: 370px;width: 500px;" />
                    </div>
                  </dv-border-box-12>
                </el-col>
                <el-col :span="6" :offset="2"><dv-border-box-12 :reverse="true" :color="['#6987d6', '#5089da']"
                    style="height: 410px;width: 520px;">
                    <p style="text-align:center" class="middlesize">Doppler特征图</p>
                    <div style="text-align:center;" v-loading="loading.zabo.isloading"
                      :element-loading-text="loading.zabo.num">
                      <img v-bind:src="img_src_doppler" style="height: 370px;width: 500px;" />
                    </div>
                  </dv-border-box-12>
                </el-col>
              </el-row>
            </div>

          </div>
        </Transition>
      </dv-border-box-1>

    </el-card>

  </div>
</template>

<script>

import { reqLoad, reqPCprocess, reqAddTarget, reqBulidModel } from "@/api";

export default {
  name: "zabo",
  data() {
    return {
      showsub: [true, false, false],
      loading: { yuanshi: { isloading: false, num: 0 }, maichong: { isloading: false, num: 0 }, target: { isloading: false, num: 0 }, zabo: { isloading: false, num: 0 }, },
      activeName: "first",
      img_src_truth: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_radar: "http://127.0.0.1:8080/preview/radar.gif",
      img_src_yuanshi: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_maichong: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_target: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_zabo: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_doppler: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      num: 41,
      snr: 1,
      clun: 2,
      clumode: null,
      options: [{
        value: '1',
        label: 'KMEANS方法'
      }, {
        value: '2',
        label: 'GMM方法'

      }],
      img: {
        truth: false,
        radar: false,
        yuanshi: false,
        maichong: false,
        target: false,
        zabo: false,
      }
    }
  },
  computed: {

  },
  methods: {
    isShowSub(index) {
      for (var i = 0; i < 3; i++) {
        this.showsub.splice(i, 1, false);
      }
      this.showsub.splice(index, 1, true);
      switch (index) {
        case 0: { this.$refs.zhenshi.style = "color:black"; this.$refs.shuju.style = "color:#233d72"; this.$refs.zabo.style = "color:#233d72"; break; }
        case 1: { this.$refs.zhenshi.style = "color:#233d72"; this.$refs.shuju.style = "color:black"; this.$refs.zabo.style = "color:#233d72"; break; }
        case 2: { this.$refs.zhenshi.style = "color:#233d72"; this.$refs.shuju.style = "color:#233d72"; this.$refs.zabo.style = "color:black"; }
      }
    },
    async loadData() {
      this.img_src_yuanshi = "http://127.0.0.1:8080/preview/null.png"
      this.img.yuanshi = true
      this.loading.yuanshi.num = 0
      this.loading.yuanshi.isloading = true;
      let percentage = 1;
      let _this = this
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.yuanshi.num = "99%";
        } else {
          _this.loading.yuanshi.num = percentage + "%";
        }
      }, 200);
      let result = await reqLoad(this.num);
      if (result.code == 200) {
        this.loading.yuanshi.isloading = false;
        clearInterval(inteval)

        this.img_src_yuanshi = "http://127.0.0.1:8080/preview/origClutterData.jpg"
        this.$message({
          type: "success",
          message: "加载成功!"
        })
      } else {
        this.loading.yuanshi.isloading = false;
        clearInterval(inteval)

        this.$message.error("运行失败！")
      }
    },


    async pcProcess() {
      this.img_src_maichong = "http://127.0.0.1:8080/preview/null.png"
      this.img.maichong = true
      this.loading.maichong.num = 0
      this.loading.maichong.isloading = true;
      let percentage = 1;
      let _this = this
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.maichong.num = "99%";
        } else {
          _this.loading.maichong.num = percentage + "%";
        }
      }, 200);
      let result = await reqPCprocess(this.num);
      if (result.code == 200) {
        this.loading.maichong.isloading = false;
        clearInterval(inteval)

        this.img_src_maichong = "http://127.0.0.1:8080/preview/PCData.jpg"
        this.$message({
          type: "success",
          message: "脉冲压缩成功!"
        })
      } else {
        this.loading.maichong.isloading = false;
        clearInterval(inteval)

        this.$message.error("运行失败！")
      }
    },
    async addTarget() {
      this.img_src_target = "http://127.0.0.1:8080/preview/null.png"
      this.img.target = true
      this.loading.target.num = 0
      this.loading.target.isloading = true;
      let percentage = 1;
      let _this = this
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.target.num = "99%";
        } else {
          _this.loading.target.num = percentage + "%";
        }

      }, 300);
      let result = await reqAddTarget(this.num, this.snr);
      if (result.code == 200) {
        this.loading.target.isloading = false;
        clearInterval(inteval)

        this.img_src_target = "http://127.0.0.1:8080/preview/afterAddTarget.jpg"
        this.$message({
          type: "success",
          message: "运行成功!"
        })
      } else {
        this.loading.target.isloading = false;
        clearInterval(inteval)

        this.$message.error("运行失败！")
      }
    },
    async modeling() {
      this.img_src_zabo = "http://127.0.0.1:8080/preview/null.png"
      this.img_src_doppler = "http://127.0.0.1:8080/preview/null.png"
      this.img.zabo = true
      this.loading.zabo.num = 0
      this.loading.zabo.isloading = true;
      let percentage = 1;
      let _this = this
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.zabo.num = "99%";
        } else {
          _this.loading.zabo.num = percentage + "%";
        }
        console.log(_this.loading.zabo.num);
      }, 100);
      let result = await reqBulidModel(this.clun, this.clumode || 1);
      if (result.code == 200) {
        this.loading.zabo.isloading = false;
        clearInterval(inteval)

        this.img_src_zabo = "http://127.0.0.1:8080/preview/afterModeling.jpg"
        this.img_src_doppler = "http://127.0.0.1:8080/preview/clusterResult.jpg"
        this.$message({
          type: "success",
          message: "运行成功!"
        })
      } else {
        this.loading.zabo.isloading = false;
        clearInterval(inteval)

        this.$message.error("运行失败！")
      }
    },
  },
  mounted() { this.$refs.zhenshi.style = "color:black"; this.$refs.shuju.style = "color:#233d72"; this.$refs.zabo.style = "color:#233d72"; }
};
</script>

<style scoped>
@import url("../../../fontsize.css");

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

.size {
  font-size: 16px;
}

::v-deep .el-tabs__item {
  font-size: 24px !important;
}

::v-deep .el-tabs--card>.el-tabs__header {
  border-bottom: 0px !important;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item {
  border-bottom: 0px solid transparent !important;
  border-left: 0px solid #E4E7ED !important;
  transition: color .3s cubic-bezier(.645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
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
</style>
