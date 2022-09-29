<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>数据集</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px)"
    >
      <el-select
        class="size"
        v-model="tag"
        placeholder="请选择示范点"
        style="width: 200px"
        @change="selectChange"
        clearable
        @clear="fixMap()"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.index"
          :label="item.name"
          :value="item.tag"
        >
        </el-option>
      </el-select>
      <el-button
        @click="full()"
        size="small"
        v-if="tag"
        style="
          position: fixed;
          bottom: 299px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        "
        icon="el-icon-full-screen"
      ></el-button>
      <el-button
        @click="addThreeD()"
        size="small"
        style="
          position: fixed;
          bottom: 185px;
          right: 31px;
          z-index: 9999999;
          font-size: 14px;
          padding: 6px;
        "
        v-if="!is3D"
        >3D</el-button
      >
      <el-button
        @click="addTwoD()"
        size="small"
        style="
          position: fixed;
          bottom: 185px;
          right: 31px;
          z-index: 9999999;
          font-size: 14px;
          padding: 6px;
        "
        v-if="is3D"
        >2D</el-button
      >
      <el-button
        @click="fixMap()"
        size="small"
        style="
          position: fixed;
          bottom: 222px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        "
        icon="el-icon-view"
        v-if="!isFixed"
      ></el-button>
      <el-button
        @click="initMap(3)"
        size="small"
        style="
          position: fixed;
          bottom: 260px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        "
        v-if="!isFixed"
        icon="el-icon-refresh-left"
      ></el-button>
      <div id="map"></div>
      <div
        id="fullScreenMap"
        v-show="isFullScreen"
        style="height: 100%; width: 100%"
      >
        <dv-border-box-11 title="示范点" class="zIndex">
          <el-row style="height: 50px; padding-top: 43px">
            <el-col :span="9"
              ><dv-decoration-1
                style="width: 100%; height: 50px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
            <el-col :span="6"
              ><dv-decoration-5
                style="width: 100%; height: 50px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
            <el-col :span="9"
              ><dv-decoration-1
                style="width: 100%; height: 50px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
          </el-row>
          <el-row style="margin-left: 40px; margin-right: 40px">
            <el-col :span="6"
              ><dv-scroll-board
                :config="config1"
                style="width: 100%; height: 180px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
            <el-col :span="6" :offset="12"
              ><dv-decoration-6
                style="width: 80%; height: 50px; padding-right: 200px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
          </el-row>
          <el-row
            style="margin-left: 40px; margin-right: 40px; padding-top: 40px"
          >
            <el-col :span="6"
              ><dv-decoration-7
                style="
                  width: 100%;
                  height: 50px;
                  font-size: 21px;
                  font-weight: 1000;
                  color: white;
                "
                :color="['#7589CD']"
                >模型运行次数</dv-decoration-7
              ></el-col
            >
            <el-col :span="6" :offset="12"></el-col>
          </el-row>
          <el-row style="margin-left: 40px; margin-right: 40px">
            <el-col :span="6"
              ><dv-capsule-chart
                :config="config2"
                style="width: 400px; height: 200px; font-size: 16px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
            <el-col :span="6" :offset="12"></el-col>
          </el-row>
          <el-row style="margin-left: 30px; margin-right: 40px">
            <el-col :span="6"
              ><dv-decoration-8
                style="position: fixed; width: 46%; height: 50px; bottom: 10px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
            <el-col :span="6" :offset="12"
              ><dv-decoration-8
                :reverse="true"
                style="position: fixed; width: 46%; height: 50px; bottom: 10px"
                :color="['#7589CD', '#7589CD']"
            /></el-col>
          </el-row>
        </dv-border-box-11>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import {} from "@/api";

export default {
  name: "DataView",
  data() {
    return {
      map: null,
      fullMap: null,
      tag: null,
      is3D: false,
      isFixed: true,
      isFullScreen: false,
      options: [
        { index: 0, name: "示范点1", tag: [116.404844, 39.916263] },
        { index: 1, name: "示范点2", tag: [118.723047, 32.209599] },
      ],
      config1: {
        header: ["序号", "名称"],
        data: [
          ["示范点1", "示范点1"],
          ["示范点2", "示范点2"],
          ["示范点3", "示范点3"],
          ["示范点4", "示范点4"],
          ["示范点5", "示范点5"],
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
        rowNum: 4,
      },
      config2: {
        data: [
          {
            name: "示范点1",
            value: 55,
          },
          {
            name: "示范点2",
            value: 10,
          },
          {
            name: "示范点3",
            value: 78,
          },
          {
            name: "示范点4",
            value: 66,
          },
          {
            name: "示范点5",
            value: 80,
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    addThreeD() {
      this.map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      this.map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      this.is3D = true;
      this.isFixed = false;
    },
    addTwoD() {
      this.map.setTerrain();
      this.map.removeSource("mapbox-dem");
      this.is3D = false;
      this.isFixed = false;
    },
    full() {
      this.isFullScreen = true;

      this.launchFullscreen(document.getElementById("fullScreenMap"));
    },
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    // 判断全屏
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    selectChange(value) {
      this.fixMap();
      this.jumpTo(value);
      this.initFullScreenMap(value);
    },
    jumpTo(tag) {
      this.map.flyTo({
        center: tag,
        zoom: 15,
      });
      this.tag = tag;
      this.isFixed = false;
    },
    fixMap() {
      this.map.flyTo({
        zoom: 3,
      });
      this.tag = null;
    },
    initMap(zoom) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";

      const map = new mapboxgl.Map({
        container: "map", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        // style: "mapbox://styles/mapbox/dark-v10",
        // style: "mapbox://styles/mapbox/streets-v11",
        zoom: zoom,
        center: [120, 40],
        // projection: "globe",
        antialias: false,
        attributionControl: false,
      });

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
      map.doubleClickZoom.disable();
      // 设置语言
      var language = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
      map.addControl(language);
      // 地图导航
      var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");
      // 比例尺
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: "imperial",
      });
      map.addControl(scale);
      scale.setUnit("metric");
      // 全图
      // map.addControl(new mapboxgl.FullscreenControl());
      // 定位
      // map.addControl(
      //   new mapboxgl.GeolocateControl({
      //     positionOptions: {
      //       enableHighAccuracy: true,
      //     },
      //     trackUserLocation: true,
      //   })
      // );
      const marker1 = new mapboxgl.Marker({
        color: "#5995FC",
        clickTolerance: 10,
        draggable: true,
      })
        .setDraggable(false)
        .setLngLat([116.404844, 39.916263])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div style="height:100px;width:200px;">
              <div style="text-align:center"><h1>示范点1</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>xxxxx</h5>
              </div>

              </div>`
          )
        )
        .addTo(map);
      const marker2 = new mapboxgl.Marker({
        color: "#5995FC",
        clickTolerance: 10,
        draggable: true,
      })
        .setDraggable(false)
        .setLngLat([118.723047, 32.209599])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>南京信息工程大学</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>南京信息工程大学，位于江苏省南京市，是一所以大气科学为特色的全国重点大学，全国首批深化创新创业教育改革示范高校、应急管理学院建设首批试点学校。</h5>
              </div>
              </div>`)
        )
        .addTo(map);
      this.map = map;
      let _this = this;
      this.map.on("dblclick", (e) => {
        _this.flyToMarker(e);
      });
      this.isFixed = true;
      this.is3D = false;
      this.tag = null;
    },
    initFullScreenMap(index) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";

      const map = new mapboxgl.Map({
        container: "fullScreenMap", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        // style: "mapbox://styles/mapbox/satellite-streets-v11",
        style: "mapbox://styles/mapbox/dark-v10",
        // style: "mapbox://styles/mapbox/streets-v11",
        zoom: 15,
        center: index,
        // projection: "globe",
        antialias: false,
        attributionControl: false,
      });
      // 设置语言
      var language = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
      map.addControl(language);
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
      const marker1 = new mapboxgl.Marker({
        color: "#5995FC",
        clickTolerance: 10,
        draggable: true,
      })
        .setDraggable(false)
        .setLngLat([116.404844, 39.916263])
        .setPopup(new mapboxgl.Popup().setHTML("<h1>示范点</h1>"))
        .addTo(map);
      const marker2 = new mapboxgl.Marker({
        color: "#5995FC",
        clickTolerance: 10,
        draggable: true,
      })
        .setDraggable(false)
        .setLngLat([118.723047, 32.209599])
        .setPopup(new mapboxgl.Popup().setHTML("<h1>示范点</h1>"))
        .addTo(map);
      this.fullMap = map;
    },
    flyToMarker(e) {
      if (
        116 <= e.lngLat.lng &&
        e.lngLat.lng <= 117 &&
        39 <= e.lngLat.lat &&
        e.lngLat.lat <= 40
      ) {
        this.isFixed = false;
        this.tag = "示范点1";
        this.map.flyTo({
          center: [116.404844, 39.916263],
          zoom: 15,
        });
        this.fullMap.flyTo({
          center: [116.404844, 39.916263],
          zoom: 15,
        });
      } else if (
        118 <= e.lngLat.lng &&
        e.lngLat.lng <= 119 &&
        32 <= e.lngLat.lat &&
        e.lngLat.lat <= 33
      ) {
        this.isFixed = false;
        this.tag = "示范点2";
        this.map.flyTo({
          center: [118.723047, 32.209599],
          zoom: 15,
        });
        this.fullMap.jumpTo({
          center: [118.723047, 32.209599],
          zoom: 15,
        });
      } else {
        this.isFixed = false;
        this.map.flyTo({
          center: e.lngLat,
          zoom: 15,
        });
        this.fullMap.jumpTo({
          center: e.lngLat,
          zoom: 15,
        });
      }
    },
  },
  mounted() {
    this.initMap(3);
    this.initFullScreenMap([120, 40]);
  },

  created() {
    window.onresize = () => {
      if (!this.checkFull()) {
        // 退出全屏后要执行的动作
        console.log("退出全屏");
        this.isFullScreen = false;
      }
    };
  },
};
</script>

<style scoped>
@import "mapbox-gl/dist/mapbox-gl.css";
.zIndex {
  z-index: 999;
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
#map {
  position: relative;
  border-radius: 5px;
  height: calc(100vh - 230px);
  width: calc(100%);
  top: 10px;
}
/* 隐藏mapbox商标 */
.mapboxgl-ctrl-logo {
  display: none;
}
</style>
