<template>
  <div>
    <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="bigsize">数据分析</el-breadcrumb-item>
        <el-breadcrumb-item class="bigsize">目标检测</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card class="card-style" shadow="hover" :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 180px); overflow: auto">
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <div><el-row>
            <h3 class="middlesize">
              <span style="color: #409eff">|</span>&nbsp;目标检测
            </h3>

          </el-row>
          <el-row>
            <el-col :span="3">
              <h3 class="middlesize" style="margin-top: 5px;">帧数</h3>
            </el-col>
            <el-col :span="4"><el-input-number v-model="cyclenum" :min="36" :max="50" style="width:100%"
                label="帧数"></el-input-number></el-col>
            <el-col :span="3" :offset="1">
              <h3 class="middlesize" style="margin-top: 5px;">SNR/dB</h3>
            </el-col>
            <el-col :span="4"><el-input-number v-model="snr" :min="-10" :max="10" :step="5" style="width:100%"
                label="SNR/dB"></el-input-number></el-col>

          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="3">
              <h3 class="middlesize" style="margin-top: 5px;">建模类别数</h3>
            </el-col>
            <el-col :span="4"><el-input-number v-model="clun" :min="1" :max="16" style="width:100%"
                label="clun"></el-input-number></el-col>
            <el-col :span="3" :offset="1">
              <h3 class="middlesize" style="margin-top: 5px;">建模方法</h3>
            </el-col>
            <el-col :span="4">
              <el-select v-model="clumode" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> </el-col>
            <el-col :span="2" :offset="1"><el-button type="primary" @click="targetDetection()"
                icon="el-icon-view">目标检测</el-button></el-col>
          </el-row>
          <el-row class="martop" v-if="show">
            <el-col :span="6">
              <p style="font-size:28px; text-align:center">数据建模图</p>
              <div style="text-align:center;" v-loading="loading.mubiao.isloading"
                :element-loading-text="loading.mubiao.num">
                <el-image v-bind:src="img_src_modeling" fit="scale-down" />
              </div>
            </el-col>
            <el-col :span="6" :offset="2">
              <p style="font-size:28px; text-align:center">Doppler特征图</p>
              <div style="text-align:center;" v-loading="loading.mubiao.isloading"
                :element-loading-text="loading.mubiao.num">
                <el-image v-bind:src="img_src_doppler" fit="scale-down" />
              </div>
            </el-col><el-col :span="6" :offset="2">
              <p style="font-size:28px; text-align:center">检测结果图</p>
              <div style="text-align:center;" v-loading="loading.mubiao.isloading"
                :element-loading-text="loading.mubiao.num">
                <el-image v-bind:src="img_src_result" fit="scale-down" />
              </div>
            </el-col>
          </el-row>
        </div>

      </Transition>


    </el-card>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqtargetDetection } from "@/api";
export default {
  name: "mubiao",
  data() {
    return {
      show: false,
      img_src_modeling: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_doppler: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      img_src_result: "http://127.0.0.1:8080/preview/GroundTruth.jpg",
      options: [{
        value: '1',
        label: 'KMEANS方法'
      }, {
        value: '2',
        label: 'GMM方法'

      }],
      snr: 10,
      clun: 4,
      clumode: null,
      cyclenum: 41,
      loading: { mubiao: { isloading: false, num: 0 } },

    }

  },
  computed: {

  },
  methods: {
    async targetDetection() {
      this.show = true;
      this.loading.mubiao.num = 0
      this.loading.mubiao.isloading = true;
      let percentage = 1;
      let _this = this
      let inteval = setInterval(() => {
        percentage += 2;
        if (percentage >= 100) {
          _this.loading.mubiao.num = "99%";
        } else {
          _this.loading.mubiao.num = percentage + "%";
        }
        console.log(_this.loading.mubiao.num);
      }, 600);
      let result = await reqtargetDetection(this.clustermode || 1, this.cyclenum, this.snr, this.clun);
      if (result.code == 200) {
        this.loading.mubiao.isloading = false;
        clearInterval(inteval)
        this.img_src_modeling = "http://127.0.0.1:8080/preview/targetClusterResult.jpg",
          this.img_src_doppler = "http://127.0.0.1:8080/preview/clusterCenter.jpg",
          this.img_src_result = "http://127.0.0.1:8080/preview/detectionResult.jpg",
          this.$message({
            type: "success",
            message: "运行成功!"
          })
      } else {
        this.loading.mubiao.isloading = false;
        clearInterval(inteval)
        this.$message.error("运行失败！")
      }
    },
  },
  mounted() {

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
</style>
