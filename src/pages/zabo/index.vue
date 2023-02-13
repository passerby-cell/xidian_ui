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
      style="height: calc(100vh - 180px); overflow: auto">
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="真实场景展示" name="first">
            <el-row><el-button type="primary" icon="el-icon-circle-plus-outline"
                @click="img.truth = true, img.radar">加载</el-button></el-row>
            <el-row class="martop" v-if="img.truth == true">
              <el-col :span="6">
                <p style="text-align:center" class="middlesize">实际场景图</p>
                <div style="text-align:center;">
                  <el-image v-bind:src="img_src_truth" fit="scale-down" />
                </div>
              </el-col>
              <el-col :span="6" :offset="2">
                <p style="text-align:center" class="middlesize">雷达部分回波图</p>
                <div style="text-align:center;">
                  <el-image v-bind:src="img_src_radar" fit="scale-down" />
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="数据预处理" name="second">
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
              <el-col :span="3" style="margin-left: 10px;"><el-button type="primary" icon="el-icon-circle-plus-outline"
                  @click="loadData()">加载</el-button></el-col>
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
                <p style="text-align:center" class="middlesize">原始数据图</p>
                <div style="text-align:center;" v-loading="loading.yuanshi.isloading"
                  :element-loading-text="loading.yuanshi.num">
                  <el-image v-bind:src="img_src_yuanshi" fit="scale-down" />
                </div>
              </el-col>
              <el-col :span="6" :offset="2" v-if="img.maichong">
                <p style="text-align:center" class="middlesize">脉冲压缩图</p>
                <div style="text-align:center;" v-loading="loading.maichong.isloading"
                  :element-loading-text="loading.maichong.num">
                  <el-image v-bind:src="img_src_maichong" fit="scale-down" />
                </div>
              </el-col><el-col :span="6" :offset="2" v-if="img.target">
                <p style="text-align:center" class="middlesize">添加目标图</p>
                <div style="text-align:center;" v-loading="loading.target.isloading"
                  :element-loading-text="loading.target.num">
                  <el-image v-bind:src="img_src_target" fit="scale-down" />
                </div>
              </el-col>
            </el-row></el-tab-pane>
          <el-tab-pane label="杂波建模" name="third">
            <el-row style="margin-top: 10px">
              <el-col :span="4">
                <h3 class="middlesize" style="margin-top: 5px;">
                  <span style="color: #409eff">|</span>&nbsp;杂波建模
                </h3>
              </el-col>
              <el-col :span="2">
                <h3 class="middlesize" style="margin-top: 5px;">建模类别数</h3>
              </el-col>
              <el-col :span="3"><el-input-number v-model="clun" :min="1" :max="16" style="width:100%"
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
              <el-col :span="6">
                <p style="text-align:center" class="middlesize">杂波建模图</p>
                <div style="text-align:center;" v-loading="loading.zabo.isloading"
                  :element-loading-text="loading.zabo.num">
                  <el-image v-bind:src="img_src_zabo" fit="scale-down" />
                </div>
              </el-col>
              <el-col :span="6" :offset="2">
                <p style="text-align:center" class="middlesize">Doppler特征图</p>
                <div style="text-align:center;" v-loading="loading.zabo.isloading"
                  :element-loading-text="loading.zabo.num">
                  <el-image v-bind:src="img_src_doppler" fit="scale-down" />
                </div>
              </el-col>
            </el-row></el-tab-pane>
        </el-tabs>
      </Transition>


    </el-card>

  </div>
</template>

<script>

import { reqLoad, reqPCprocess, reqAddTarget, reqBulidModel } from "@/api";

export default {
  name: "zabo",
  data() {
    return {
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
      clun: 1,
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
    async loadData() {
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
}

.size {
  font-size: 16px;
}

::v-deep .el-tabs__item {
  font-size: 24px !important;
}
</style>
