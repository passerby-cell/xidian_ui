<template>
  <div>
    <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight">
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>数据集</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card class="card-style" shadow="hover" :body-style="{ padding: '10px' }" style="height: calc(100vh - 170px)">
      <el-select class="size" v-model="tag" placeholder="请选择示范点" style="width: 200px" @change="selectChange" clearable
        @clear="fixMap()" size="small">
        <el-option v-for="item in options" :key="item.index" :label="item.name" :value="item.tag">
        </el-option>
      </el-select>

      <el-button @click="create()" size="small" v-if="tag" style="
          position: fixed;
          bottom: 297px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        " icon="el-icon-circle-plus-outline"></el-button>

      <el-button @click="full()" size="small" v-if="tag" style="
          position: fixed;
          bottom: 260px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        " icon="el-icon-full-screen"></el-button>
      <el-button @click="addThreeD()" size="small" style="
          position: fixed;
          bottom: 185px;
          right: 31px;
          z-index: 9999999;
          font-size: 14px;
          padding: 5px;
        " v-if="!is3D">3D</el-button>
      <el-button @click="addTwoD()" size="small" style="
          position: fixed;
          bottom: 185px;
          right: 31px;
          z-index: 9999999;
          font-size: 14px;
          padding: 5px;
        " v-if="is3D">2D</el-button>
      <el-button @click="fixMap()" size="small" style="
          position: fixed;
          bottom: 222px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        " icon="el-icon-view" v-if="!isFixed"></el-button>
      <!-- <el-button
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
      ></el-button> -->
      <div id="map"></div>
      <div id="fullScreenMap" v-show="isFullScreen" style="height: 100%; width: 100%">
        <dv-border-box-11 :title="selectedTag" class="zIndex">
          <el-row style="height: 50px; padding-top: 43px">
            <el-col :span="9"><dv-decoration-1 style="width: 100%; height: 50px"
                :color="['#7589CD', '#7589CD']" /></el-col>
            <el-col :span="6"><dv-decoration-5 style="width: 100%; height: 50px"
                :color="['#7589CD', '#7589CD']" /></el-col>
            <el-col :span="9"><dv-decoration-1 style="width: 100%; height: 50px"
                :color="['#7589CD', '#7589CD']" /></el-col>
          </el-row>
          <el-row style="margin-left: 40px; margin-right: 40px">
            <el-col :span="6"><dv-scroll-board :config="config1" style="width: 100%; height: 180px"
                :color="['#7589CD', '#7589CD']" /></el-col>
            <el-col :span="6" :offset="12"><dv-decoration-6 style="width: 80%; height: 50px; padding-right: 200px"
                :color="['#7589CD', '#7589CD']" /></el-col>
          </el-row>
          <!-- <el-row
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
          </el-row> -->
          <el-row style="margin-left: 30px; margin-right: 40px">
            <el-col :span="6"><dv-decoration-8 style="position: fixed; width: 46%; height: 50px; bottom: 10px"
                :color="['#7589CD', '#7589CD']" /></el-col>
            <el-col :span="6" :offset="12"><dv-decoration-8 :reverse="true"
                style="position: fixed; width: 46%; height: 50px; bottom: 10px"
                :color="['#7589CD', '#7589CD']" /></el-col>
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
import { } from "@/api";

export default {
  name: "DataView",
  data() {
    return {
      mapState: [
        ['http://192.168.31.252:8082/geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer1',
          'http://192.168.31.252:8082/geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer2',
          'http://192.168.31.252:8082/geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer3',
          'http://192.168.31.252:8082/geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer4',
          'http://192.168.31.252:8082/geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer5',
        ],
        ['http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai1',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai2',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai3',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai4',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai5',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai6',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai7',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai8',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai9',
          'http://192.168.31.252:8082/geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai10',
        ],
      ],
      map: null,
      fullMap: null,
      tag: null,
      selectedTag: null,
      is3D: false,
      isFixed: true,
      isFullScreen: false,
      templateId: null,
      options: [
        {
          index: 0, name: "孟买", tag: [72.830127, 18.975847], zoom: 15, templateId: 28, message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>孟买</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>孟买, 是印度西部滨海城市，印度第一大港口，棉纺织业中心，马哈拉施特拉邦首府。孟买是印度重要的贸易中心和港口城市。</h5>
              </div>
              </div>`},

        {
          index: 1,
          name: "瓜德尔港",
          tag: [62.323615, 25.103452],
          zoom: 15,
          templateId: 28,
          message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>瓜德尔港</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>瓜德尔港是巴基斯坦的重要港口。瓜德尔港位于巴基斯坦俾路支省西南部瓜德尔城南部，为深水良港。中国政府应穆沙拉夫总统的请求为该港口建设提供资金和技术援助。该港口于2002年3月开工兴建，2015年2月瓜德尔港基本竣工，预计4月中旬全面投入运营。中国部分石油的运输路程将缩短85%。</h5>
              </div>
              </div>`
        },
      ],
      config1: {
        header: ["序号", "经纬度"],
        data: [
          ["孟买", "[72.830127, 18.975847]"],
          ["瓜德尔港", "[62.323615, 25.103452]"],
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
    create() {
      this.$store.dispatch("Template/getJobTemplate", { templateId: this.templateId })
      this.$store.dispatch("Template/getTaskTemplate", { templateId: this.templateId })
      this.$router.push({
        name: "standardjob",
        query: { templateId: this.templateId }
      })
    },
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
      let z;
      this.options.forEach((item) => {
        if (item.tag == value) {
          z = item;
        }
      });
      this.templateId = z.templateId
    },
    jumpTo(tag) {
      let z;
      this.options.forEach((item) => {
        if (item.tag == tag) {
          z = item;
        }
      });
      this.selectedTag = z.name;
      this.map.flyTo({
        center: tag,
        zoom: z.zoom,
      });
      this.tag = tag;
      this.isFixed = false;
    },
    fixMap() {
      this.map.flyTo({
        zoom: 3,
        center: [120, 40],
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
      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        // console.log(lng, lat);
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

      map.on('load', () => {
        map.addSource('radar', {
          'type': 'image',
          'url': require("../../assets/images/gf.jpg"),
          'coordinates': [
            [-71.9002, 42.3101],
            [-71.9001, 42.3101],
            [-71.9001, 42.3100],
            [-71.9002, 42.3100]
          ]
        });
        map.addLayer({
          id: 'radar-layer',
          'type': 'raster',
          'source': 'radar',

          'paint': {
            'raster-fade-duration': 0
          }
        });
      });
      for (let i = 0; i < this.options.length; i++) {
        let marker = new mapboxgl.Marker({
          color: "#5995FC",
          clickTolerance: 10,
          draggable: true,
        })
          .setDraggable(false)
          .setLngLat(this.options[i].tag)
          .setPopup(
            new mapboxgl.Popup().setHTML(
              this.options[i].message
            )
          )
          .addTo(map);

      }
      let _this = this;
      for (let i = 0; i < this.mapState.length; i++) {
        for (let j = 0; j < this.mapState[i].length; j++) {
          console.log(_this.mapState[i][j]);
          map.on('load', () => {
            map.addSource(String(i + 'a' + j), {
              'type': 'raster',
              'tiles': [
                _this.mapState[i][j]
              ],
              'tileSize': 256
            }); map.addLayer({
              'id': String(i + 'a' + j),
              'type': 'raster',
              'source': String(i + 'a' + j), // reference the data source
              'paint': {
                'raster-opacity': 1
              }
            })

          })
        }
      }


      this.map = map;

      this.map.on("dblclick", (e) => {
        _this.flyToMarker(e);
      });
      this.isFixed = true;
      this.is3D = false;
      this.tag = null;
    },
    initFullScreenMap(index) {
      let z = {};
      this.options.forEach((item) => {
        if (item.tag == index) {
          z = item;
        }
      });
      if (!z.zoom) {
        z.zoom = 2;
      }
      mapboxgl.accessToken =
        "pk.eyJ1IjoicGxheS1pc2FhYyIsImEiOiJjazU0cDkzbWowamd2M2dtemd4bW9mbzRhIn0.cxD4Fw3ZPB_taMkyUSFENA";

      const map = new mapboxgl.Map({
        container: "fullScreenMap", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        // style: "mapbox://styles/mapbox/satellite-streets-v11",
        style: "mapbox://styles/mapbox/dark-v10",
        // style: "mapbox://styles/mapbox/streets-v11",
        zoom: z.zoom,
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
      for (let i = 0; i < this.options.length; i++) {
        new mapboxgl.Marker({
          color: "#5995FC",
          clickTolerance: 10,
          draggable: true,
        })
          .setDraggable(false)
          .setLngLat(this.options[i].tag)
          .setPopup(
            new mapboxgl.Popup().setHTML(
              this.options[i].message
            )
          )
          .addTo(map);
      }
      this.fullMap = map;
    },
    flyToMarker(e) {
      let flag = true
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].tag[0] - 2 <= e.lngLat.lng &&
          e.lngLat.lng <= this.options[i].tag[0] + 2 &&
          this.options[i].tag[1] - 2 <= e.lngLat.lat &&
          e.lngLat.lat <= this.options[i].tag[1] + 2) {
          this.isFixed = false;
          this.tag = this.options[i].name;

          this.map.flyTo({
            center: this.options[i].tag,
            zoom: this.options[i].zoom,
          });
          this.fullMap.flyTo({
            center: this.options[i].tag,
            zoom: this.options[i].zoom,
          });
          this.selectedTag = this.options[i].name;
          this.templateId = this.options[i].templateId
          flag = false
        }

      }
      if (flag) {
        this.isFixed = false;
        this.map.flyTo({
          center: e.lngLat,
          zoom: 10,
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
  z-index: 9;
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

.el-form-item>>>.el-form-item__error {
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
#map>>>.mapboxgl-ctrl-logo {
  display: none !important;
}

#fullScreenMap>>>.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>
