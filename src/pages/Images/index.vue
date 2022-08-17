<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>镜像仓库</el-breadcrumb-item>
        <el-breadcrumb-item>镜像管理</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      style="height: calc(100vh - 170px); background-color: #f0f1f3"
      :body-style="{ padding: '0px' }"
    >
      <el-col style="width: 320px">
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <el-select
            class="size"
            v-model="selected"
            placeholder="请选择仓库"
            style="width: 300px; margin-left: 10px"
            @change="selectChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </Transition>
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <div style="width=100%;height: calc(100vh - 200px);overflow:auto;">
            <div
              v-for="(item, index) in imageCatalogs"
              :key="index"
              @click="changeWareHouse(index)"
            >
              <el-card
                shadow="hover"
                style="height: 200px; width: 300px; margin-top: 5px"
                :body-style="{ padding: '0px' }"
              >
                <div
                  :id="'publicImageCharts' + index"
                  style="height: 200px; width: 100%"
                ></div>
              </el-card>
            </div>
            <el-card
              shadow="hover"
              :body-style="{ padding: '0px' }"
              style="height: 180px; width: 300px; margin-top: 5px"
            >
              <el-empty description="暂无更多" :image-size="50"></el-empty>
            </el-card>
          </div>
        </Transition>
      </el-col>
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <div style="width: 100%">
          <el-card
            shadow="hover"
            style="
              height: calc(100vh - 170px);
              margin-left: 10px;
              overflow-y: auto;
            "
            :body-style="{ padding: '0px' }"
          >
            <el-row>
              <Transition
                appear
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
              >
                <el-breadcrumb separator=">" class="size">
                  <el-breadcrumb-item>镜像仓库</el-breadcrumb-item>
                  <el-breadcrumb-item>镜像管理</el-breadcrumb-item>
                  <el-breadcrumb-item v-if="selected">{{
                    selected
                  }}</el-breadcrumb-item>
                </el-breadcrumb>
              </Transition>
            </el-row>

            <el-row v-if="selected && isShow == false">
              <el-col :span="4" style="margin: 10px">
                <el-input
                  size="small"
                  placeholder="请输入镜像名称"
                  v-model="imageName"
                ></el-input>
              </el-col>
              <el-col :span="4" style="margin-top: 10px">
                <el-button
                  type="primary"
                  size="small"
                  class="el-icon-search"
                  @click="searchImageList()"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
            <div
              style="height: calc(100vh - 300px); width: 100%; overflow: auto"
            >
              <el-result
                style="margin-top: 150px"
                icon="info"
                title="信息提示"
                subTitle="点击左侧镜像仓库查看仓库详细信息"
                v-if="!selected"
              >
              </el-result>
              <el-result
                style="margin-top: 150px"
                icon="info"
                title="信息提示"
                subTitle="没有符合要求的镜像"
                v-if="showInfo"
              >
              </el-result>
              <el-row
                v-for="(item, index) in imageList"
                :key="index"
                v-if="selected"
              >
                <Transition
                  appear
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut"
                >
                  <el-card
                    v-if="showImages[index].head"
                    style="margin-top: 10px; height: 40px"
                    :body-style="{ padding: '0px' }"
                  >
                    <div
                      class="circle"
                      v-show="!isShow"
                      @click="changeShowImages(index, item.imageName)"
                    >
                      <i
                        class="el-icon-arrow-right"
                        style="margin-top: 5px; margin-left: 4px"
                      ></i>
                    </div>
                    <div
                      class="circle"
                      v-show="isShow"
                      @click="fixShowImages(index)"
                    >
                      <i
                        class="el-icon-arrow-down"
                        style="margin-top: 4px; margin-left: 4px"
                      ></i>
                    </div>
                    <span style="margin-left: 10px" class="size">{{
                      item.imageName
                    }}</span>
                  </el-card>
                </Transition>
                <Transition
                  appear
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut"
                >
                  <el-row>
                    <el-descriptions
                      style="margin-left: 30px"
                      v-show="showImages[index].body"
                    >
                      <el-descriptions-item label="镜像名称">{{
                        item.imageName
                      }}</el-descriptions-item>
                      <el-descriptions-item label="所属仓库"
                        >default</el-descriptions-item
                      >
                      <el-descriptions-item label="仓库服务IP"
                        >192.168.0.199</el-descriptions-item
                      >
                    </el-descriptions>
                    <el-timeline
                      v-show="showImages[index].body"
                      style="margin-left: 30px"
                    >
                      <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.timestamp"
                      >
                        <el-card :body-style="{ padding: '0px' }">
                          <el-row>
                            <el-col :span="20"
                              ><el-descriptions
                                style="margin-top: 10px; margin-left: 10px"
                              >
                                <el-descriptions-item label="版本号">{{
                                  activity.content
                                }}</el-descriptions-item>
                                <el-descriptions-item label="镜像大小">{{
                                  activity.fileSize
                                }}</el-descriptions-item>
                              </el-descriptions></el-col
                            >
                            <el-col :span="4">
                              <!-- <el-button
                                size="mini"
                                class="el-icon-download"
                                type="success"
                                style="margin-top: 10px"
                                >下载</el-button
                              > -->
                            </el-col>
                          </el-row></el-card
                        >
                      </el-timeline-item>
                    </el-timeline>
                  </el-row>
                </Transition>
              </el-row>
            </div>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
            >
              <el-row
                style="text-align: center"
                v-if="selected && isShow == false"
              >
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="Number(totalCount)"
                  @current-change="handleCurrentChange"
                >
                </el-pagination>
              </el-row>
            </Transition>
          </el-card>
        </div>
      </Transition>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqImageOverview, reqImagelIST, reqImageVersionlIST } from "@/api";
import { formatTime } from "@/utils/time";
import { formatFileSize } from "@/utils/file";
export default {
  name: "Images",
  data() {
    return {
      showInfo: false,
      activities: [],
      isShow: false,
      Image: [],
      title: [],
      options: [],
      selected: "",
      imageCatalogId: 0,
      showImages: [],
      imageName: "",
      index: 0,
    };
  },
  computed: {
    ...mapState("Image", [
      "warehouseId",
      "warehouseName",
      "imageCatalogs",
      "imageList",
      "totalCount",
      "currPageNum",
    ]),
  },
  methods: {
    async handleCurrentChange(val) {
      let result = await reqImagelIST(
        val,
        this.imageCatalogs[this.index].catalogId,
        this.imageCatalogs[this.index].catalogType,
        null,
        10,
        this.warehouseId
      );
      if (result.success == true && result.rows != null) {
        this.showImages = [];
        this.$store.dispatch("Image/getImageList", {
          imageList: result.rows,
          totalCount: result.totalCount,
          currPageNum: result.currPageNum,
        });
        for (let i = 0; i < result.rows.length; i++) {
          this.showImages.push({ head: true, body: false });
        }
      }
    },
    fixShowImages(index) {
      this.showInfo = false;
      this.isShow = !this.isShow;
      this.activities = [];
      for (let i = 0; i < this.showImages.length; i++) {
        this.showImages[i].head = true;
        this.showImages[i].body = false;
      }
    },
    async changeShowImages(index, name) {
      this.showInfo = false;
      let result = await reqImageVersionlIST(name);
      if (result.success == true) {
        this.$store.dispatch("Image/getImageVersionList", result.rows);
        for (let i = 0; i < result.rows.length; i++) {
          let itemheader = {
            content: "",
            fileSize: "",
            timestamp: "",
            size: "large",
            type: "primary",
            icon: "el-icon-star-on",
            color: "#0bbd87",
          };
          let itembody = {
            content: "",
            fileSize: "",
            timestamp: "",
            size: "large",
            type: "primary",
          };
          if (i == 0) {
            itemheader.content = result.rows[i].imageTag;
            itemheader.timestamp = formatTime(result.rows[i].imageCreatetime);
            itemheader.fileSize = formatFileSize(result.rows[i].imageSize);
            this.activities.push(itemheader);
          } else {
            itembody.content = result.rows[i].imageTag;
            itembody.timestamp = formatTime(result.rows[i].imageCreatetime);
            itembody.fileSize = formatFileSize(result.rows[i].imageSize);
            this.activities.push(itembody);
          }
        }
      }
      this.isShow = !this.isShow;
      for (let i = 0; i < this.showImages.length; i++) {
        if (i != index) {
          this.showImages[i].head = false;
        }
        if (i == index) {
          this.showImages[i].body = true;
        }
      }
    },
    selectChange(value) {
      this.showInfo = false;
      this.activities = [];
      let index = this.options.findIndex((item, index) => {
        return item.value == value;
      });
      this.changeWareHouse(index);
    },
    async changeWareHouse(index) {
      this.showInfo = false;
      this.index = index;
      this.activities = [];
      this.selected = this.title[index].text;
      this.isShow = false;
      let result = await reqImagelIST(
        1,
        this.imageCatalogs[index].catalogId,
        this.imageCatalogs[index].catalogType,
        null,
        10,
        this.warehouseId
      );
      if (result.success == true && result.rows != null) {
        this.showImages = [];
        this.$store.dispatch("Image/getImageList", {
          imageList: result.rows,
          totalCount: result.totalCount,
          currPageNum: result.currPageNum,
        });
        for (let i = 0; i < result.rows.length; i++) {
          this.showImages.push({ head: true, body: false });
        }
      }
    },
    async searchImageList() {
      let result = await reqImagelIST(
        1,
        this.imageCatalogs[this.index].catalogId,
        this.imageCatalogs[this.index].catalogType,
        this.imageName,
        10,
        this.warehouseId
      );
      if (result.success == true) {
        this.showImages = [];
        this.$store.dispatch("Image/getImageList", {
          imageList: result.rows,
          totalCount: result.totalCount,
          currPageNum: result.currPageNum,
        });
        for (let i = 0; i < result.rows.length; i++) {
          this.showImages.push({ head: true, body: false });
        }
        if (result.rows.length == 0) {
          this.showInfo = true;
        } else {
          this.showInfo = false;
        }
        this.imageName = "";
      }
    },
    initEcharts(main, index) {
      let option = {
        title: this.title[index],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          right: "14%",
          top: "37%",
          orient: "vertical",
          selected: {
            "总   数": false,
          },
          selectedMode: false,
          formatter: function (name) {
            var data = option.series[0].data;
            var total = 0;
            var tarValue;
            for (var i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var v = tarValue;
            var p = Math.round((tarValue / total) * 100);
            return `${name}:  ${v}`;
          },
        },
        series: [
          {
            name: "详细",
            type: "pie",
            radius: [10, 50],
            center: ["25%", "60%"],
            roseType: "radius",
            label: {
              show: false,
            },
            data: this.Image[index],
          },
        ],
      };
      this.$echarts.init(main).setOption(option);
    },
  },
  async mounted() {
    let result = await reqImageOverview(1);
    if (result.code == "200") {
      this.$store.dispatch("Image/getImageOverview", {
        warehouseId: result.data.warehouseInfo[0].warehouseId,
        warehouseName: result.data.warehouseInfo[0].warehouseName,
        imageCatalogs: result.data.warehouseInfo[0].imageCatalogs,
      });
    }

    if (result.data.warehouseInfo[0].imageCatalogs != null) {
      for (
        let i = 0;
        i < result.data.warehouseInfo[0].imageCatalogs.length;
        i++
      ) {
        let option = {
          value: "",
        };
        let image = [
          { value: 0, name: "总   数" },
          { value: 0, name: "已扫描" },
          { value: 0, name: "扫描中" },
          { value: 0, name: "未扫描" },
        ];
        let title = {
          text: "",
          left: "center",
          top: "15px",
        };
        image[0].value =
          result.data.warehouseInfo[0].imageCatalogs[i].catalogOverview.total;
        image[1].value =
          result.data.warehouseInfo[0].imageCatalogs[i].catalogOverview.scanned;
        image[2].value =
          result.data.warehouseInfo[0].imageCatalogs[
            i
          ].catalogOverview.scanning;
        image[3].value =
          result.data.warehouseInfo[0].imageCatalogs[
            i
          ].catalogOverview.notScanned;
        option.value = result.data.warehouseInfo[0].imageCatalogs[i].envName;
        title.text = result.data.warehouseInfo[0].imageCatalogs[i].envName;
        if (title.text == "cluster-default-default") {
          title.text = "private";
        }
        this.Image.push(image);
        this.options.push(option);
        this.title.push(title);
      }
    }
    this.$nextTick(() => {
      for (let i = 0; i < this.Image.length; i++) {
        this.initEcharts(document.getElementById("publicImageCharts" + i), i);
      }
    });
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}

.el-card {
  margin: 10px;
}

.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-left: 10px;
  /* border-radius: 4em;
  background: #99a3bb;*/
  cursor: pointer;
}

.download:hover {
  color: blue;
}
.size {
  font-size: 16px;
}
</style>
