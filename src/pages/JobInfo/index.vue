<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>我的作业</el-breadcrumb-item>
        <el-breadcrumb-item
          ><span @click="toJob" class="bread"
            >作业列表</span
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{
          joblist[index].vcJobCnName
        }}</el-breadcrumb-item>
      </el-breadcrumb></Transition
    >
    <el-card
      style="
        background-color: #eaebed;
        margin: 10px;
        height: calc(100vh - 170px);
      "
      :body-style="{ padding: '0px' }"
    >
      <el-row>
        <el-card
          :body-style="{ padding: '0px' }"
          style="height: 85px; margin: 10px"
          shadow="hover"
        >
          <el-row :span="12" style="margin-top: 10px">
            <h3 style="margin-left: 5px" class="size">
              <span style="color: #409eff">|</span>&nbsp;基本信息
            </h3>
          </el-row>
          <el-row style="margin-top: 30px; margin-left: 20px">
            <el-col :span="8"
              ><span class="size"
                >作业名称：{{ joblist[index].vcJobCnName }}</span
              ></el-col
            >
            <el-col :span="8"
              ><span class="size">作业类型：标准作业</span></el-col
            >
            <el-col :span="8"
              ><span class="size">所属队列：default</span></el-col
            >
          </el-row></el-card
        >
      </el-row>
      <el-row>
        <el-card
          :body-style="{ padding: '0px' }"
          style="
            height: calc(100vh - 290px);
            margin-left: 10px;
            margin-right: 10px;
            margin-buttom: 10px;
          "
          shadow="hover"
        >
          <el-row :span="12" style="margin-top: 10px">
            <h3 style="margin-left: 5px" class="size">
              <span style="color: #409eff">|</span>&nbsp;计算实例列表
            </h3>
          </el-row>
          <el-row style="margin-top: 10px; margin-left: 20px">
            <el-col :span="4" style="margin: 10px">
              <el-input
                size="small"
                placeholder="请输入节点名称"
                v-model="hostName"
                prefix-icon="el-icon-search"
              ></el-input>
            </el-col>
            <el-col :span="4" style="margin: 10px">
              <el-input
                size="small"
                prefix-icon="el-icon-search"
                placeholder="请输入计算实例名称"
                v-model="podName"
              ></el-input>
            </el-col>
            <el-col :span="1" style="margin-top: 10px">
              <el-button
                type="primary"
                size="small"
                class="el-icon-search"
                @click="searchList()"
                >搜索</el-button
              >
            </el-col>
            <el-col :span="8" style="margin-left: 10px">
              <el-tag
                v-if="showHostName"
                style="margin-top: 10px; height: 32px"
                closable
                @close="clearHostSearch"
                >节点:{{ hostName }}</el-tag
              >
              <el-tag
                v-if="showPodName"
                style="margin-top: 10px; height: 32px; margin-left: 10px"
                closable
                @close="clearPodSearch"
                >计算实例:{{ podName }}</el-tag
              >
            </el-col>
          </el-row>
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-table
              class="size"
              :row-style="{ height: 20 + 'px' }"
              :cell-style="{ padding: 8 + 'px' }"
              style="
                width: 100%;
                margin-top: 10px;
                margin-left: 10px;
                margin-rigth: 10px;
              "
              :data="formatedJobInfoList"
              :border="true"
              max-height="360"
            >
              <el-table-column
                prop="hostName"
                label="节点名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="hostIp"
                label="节点IP"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="podName"
                label="计算实例"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column
                prop="podIp"
                label="实例IP"
                show-overflow-tooltip
              ></el-table-column> -->
              <el-table-column
                prop="status"
                label="实例状态"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="taskName"
                label="所属任务"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="startTime"
                label="开始运行时间"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="endTime"
                label="运行结束时间"
                show-overflow-tooltip
              ></el-table-column>
              <!-- TODO:日志-->
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-chat-dot-round"
                    @click="getJobLogs(scope.$index, scope.row)"
                    >日志</el-button
                  >
                  <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-view"
                    @click="ConvertViewLogs(scope.$index, scope.row)"
                    >可视化</el-button
                  >
                </template>
              </el-table-column>
            </el-table></Transition
          >
          <el-dialog
            :visible.sync="rizhiDialogVisible"
            :before-close="handleClose"
            width="1000px"
            title="日志"
          >
            <pre
              v-highlight
              style="
                height: 500px;
                overflow: auto;
                padding-left: 20px;
                padding-right: 20px;
              "
            >
                  <code
                  class="python"
                  style="font-size: 16px; background-color: #20211d;height:440px;padding: 0px;margin: 0px;"
                  id="statusLog"
                  :code="logs"
                ></code>
                </pre>
          </el-dialog>
          <el-dialog
            title="可视化"
            class="dialog"
            :visible.sync="viewDialogVisible"
            width="55%"
            :before-close="handleViewClose"
          >
            <el-cascader
              :options="options"
              v-model="selected"
              @change="changeSelected"
            ></el-cascader>
            <div id="chart" style="height: 400px; width: 100%"></div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleViewClose"
                >关 闭</el-button
              >
            </span>
          </el-dialog>

          <el-col style="text-align: center">
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-pagination
                :background="true"
                :page-sizes="[10, 20, 30]"
                :page-size="10"
                layout="prev, pager, next,sizes"
                :page-count="Number(jobInfoPageCount)"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination
            ></Transition> </el-col
        ></el-card>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqJobInfoList, reqJobLogs, reqJobNextLogs } from "@/api";
import { formatTime } from "@/utils/time";
import { default as AnsiUp } from "ansi_up";

export default {
  name: "JobInfo",
  data() {
    return {
      index: 0,
      hostName: "",
      podName: "",
      showHostName: false,
      showPodName: false,
      rizhiDialogVisible: false,
      viewDialogVisible: false,
      logs: "",
      viewLogs: `{"train":{"epoch":" 1 ","loss":" 1.0535546 ","epochtime":" 14 ","time":" 1 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 234 "," 145 "," 873 "," 93"]}},\n
{"train":{"epoch":" 2 ","loss":" 2.435476879 ","epochtime":" 20.4 ","time":" 23 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 132 "," 245 "," 999 "," 34 "]}},\n
{"train":{"epoch":" 3 ","loss":" 1.2423547 ","epochtime":" 34 ","time":" 35 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 3 "," 3 "," 3 "," 548 "]}},\n
{"train":{"epoch":" 4 ","loss":" 1.4658567 ","epochtime":" 4 ","time":" 4 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 4 "," 4 "," 4 "," 789 "]}},\n
{"train":{"epoch":" 5 ","loss":" 1.576943 ","epochtime":" 5 ","time":" 5 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 5 "," 5 "," 5 "," 896 "]}},\n
{"train":{"epoch":" 6 ","loss":" 0.343654476 ","epochtime":" 6 ","time":" 6 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 6 "," 6 "," 6 "," 458 "]}},\n
{"train":{"epoch":" 7 ","loss":" 7 ","epochtime":" 7 ","time":" 7 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 7 "," 7 "," 7 "," 7 "]}},\n
{"train":{"epoch":" 8 ","loss":" 8 ","epochtime":" 8 ","time":" 8 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 8 "," 8 "," 8 "," 234 "]}},\n
{"train":{"epoch":" 9 ","loss":" 9 ","epochtime":" 9 ","time":" 9 "}},\n
{"test":{"name":["mse","mae","ssim","bce"],"val":[" 9 "," 9 "," 9 "," 1098 "]}},\n
`,
      jsonObj: null,
      train: {
        epoch: [],
        loss: [],
        epochtime: [],
        time: [],
      },
      test: [],
      options: [],
      selected: [],
    };
  },

  computed: {
    ...mapState("Job", [
      "joblist",
      "jobInfoList",
      "jobInfoCurrPageNum",
      "jobInfoPageCount",
      "jobInfoPageSize",
    ]),
    formatedJobInfoList() {
      let JobInfoList = this.jobInfoList;

      for (let i = 0; i < JobInfoList.length; i++) {
        JobInfoList[i].startTime = formatTime(JobInfoList[i].startTime);
        JobInfoList[i].endTime = formatTime(JobInfoList[i].endTime);
        if (formatTime(JobInfoList[i].startTime) == "1970-01-01 08:00:00") {
          JobInfoList[i].startTime = "";
        }
        if (formatTime(JobInfoList[i].endTime) == "1970-01-01 08:00:00") {
          JobInfoList[i].endTime = "";
        }
      }
      return JobInfoList;
    },
  },
  methods: {
    changeSelected() {
      this.initEcharts();
    },
    initEcharts() {
      let xdata = [];
      let ydata = [];
      let name;
      if (this.selected[0] == "train") {
        xdata = this.train.epoch;
        if (this.selected[1] == "loss") {
          ydata = this.train.loss;
        } else {
          ydata = this.train.epochtime;
        }
        name = this.selected[1];
      } else {
        for (var i = 0; i < this.test[1].length; i++) {
          xdata.push(i + 1);
        }
        name = this.test[0][this.selected[1] - 1];
        ydata = this.test[this.selected[1]];
      }

      let option = {
        title: {
          text: name,
          left: "1%",
          top: "3%",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "17%",
        },
        xAxis: {
          data: xdata,
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#93CE07",
            },
            {
              gt: 50,
              lte: 100,
              color: "#FBDB0F",
            },
            {
              gt: 100,
              lte: 150,
              color: "#FC7D02",
            },
            {
              gt: 150,
              lte: 200,
              color: "#FD0100",
            },
            {
              gt: 200,
              lte: 300,
              color: "#AA069F",
            },
            {
              gt: 300,
              lte: 600,
              color: "#AC3B2A",
            },
            {
              gt: 600,
              lte: 1000,
              color: "#000059",
            },
            {
              gt: 1000,
              color: "#df0101",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            // restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: xdata.length - 8,
          },
          {
            type: "inside",
          },
        ],

        series: {
          name: name,
          type: "line",
          data: ydata,
          markLine: {
            silent: true,
            lineStyle: {
              color: "#333",
            },
          },
        },
      };
      this.$echarts.init(document.getElementById("chart")).setOption(option);
    },
    handleViewClose() {
      this.train = {
        epoch: [],
        loss: [],
        epochtime: [],
        time: [],
      };
      this.test = [];

      this.jsonObj = null;
      this.viewDialogVisible = false;
    },
    async ConvertViewLogs(index, row) {
      this.viewDialogVisible = true;
      let result = await reqJobLogs({
        clusterId: this.joblist[this.index].clusterId,
        containerName: this.jobInfoList[index].containerName,
        follow: false,
        namespace: this.jobInfoList[index].projectName,
        podName: this.jobInfoList[index].podName,
        tailLines: 300,
      });
      this.viewLogs += result.data;
      let view = `{"info": [` + this.viewLogs + `],}`;
      this.jsonObj = eval("(" + view + ")");
      for (let i = 0; i < this.jsonObj.info.length; i++) {
        if (this.jsonObj.info[i].train) {
          this.train.epoch.push(this.jsonObj.info[i].train.epoch);
          this.train.loss.push(this.jsonObj.info[i].train.loss);
          this.train.epochtime.push(this.jsonObj.info[i].train.epochtime);
          this.train.time.push(this.jsonObj.info[i].train.time);
        } else {
          if (this.test.length == 0) {
            this.test.push(this.jsonObj.info[i].test.name);
          }

          for (let j = 0; j < this.jsonObj.info[i].test.name.length; j++) {
            if (this.test.length == 1) {
              for (let k = 0; k < this.jsonObj.info[i].test.name.length; k++) {
                this.test.push([]);
              }
            }
            this.test[j + 1].push(this.jsonObj.info[i].test.val[j]);
          }
        }
      }
      this.options = [];
      if (this.train.epoch.length != 0) {
        this.options.push({
          value: "train",
          label: "train",
          children: [
            { value: "loss", label: "loss" },
            { value: "epochtime", label: "epochtime" },
          ],
        });
      }
      if (this.test.length) {
        let children = [];
        for (let i = 0; i < this.test[0].length; i++) {
          children.push({ value: i + 1, label: this.test[0][i] });
        }
        this.options.push({
          value: "test",
          label: "test",
          children,
        });
      }
      this.selected = [];
      this.selected.push(
        this.options[0].value,
        this.options[0].children[0].value
      );
      let _this = this;
      setTimeout(() => {
        _this.initEcharts();
      }, 200);
    },

    async getJobLogs(index, row) {
      this.rizhiDialogVisible = true;
      let result = await reqJobLogs({
        clusterId: this.joblist[this.index].clusterId,
        containerName: this.jobInfoList[index].containerName,
        follow: false,
        namespace: this.jobInfoList[index].projectName,
        podName: this.jobInfoList[index].podName,
        tailLines: 300,
      });
      this.logs += result.data;
      this.logs.replace(/\n/g, "<br/>");

      var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
      statusLog.innerHTML = this.logs;

      let _this = this;
      this.timer = setInterval(async () => {
        let result2 = await reqJobLogs({
          clusterId: this.joblist[this.index].clusterId,
          containerName: this.jobInfoList[index].containerName,
          follow: false,
          podName: this.jobInfoList[index].podName,
          tailLines: 300,
        });
        if (result2.data) {
          _this.logs += result2.data;
        }
        _this.logs.replace(/\n/g, "<br/>");
        // var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
        // statusLog.innerHTML = _this.logs;
      }, 10000);
    },

    handleClose() {
      clearInterval(this.timer);
      this.logs = "";
      this.rizhiDialogVisible = false;
    },
    toJob() {
      this.$router.push("/job");
    },
    searchList() {
      if (this.hostName != "") {
        this.showHostName = true;
      }
      if (this.podName != "") {
        this.showPodName = true;
      }
      this.search();
    },
    clearHostSearch() {
      this.hostName = "";
      this.showHostName = false;
      this.search();
    },
    clearPodSearch() {
      this.podName = "";
      this.showPodName = false;
      this.search();
    },
    async search() {
      let result = await reqJobInfoList(
        this.joblist[this.index].clusterId,
        1,
        this.hostName,
        this.jobInfoPageSize,
        this.podName,
        this.joblist[this.index].vcJobName
      );
      if (result.success == true) {
        this.$store.dispatch("Job/getJobInfoList", {
          currPageNum: result.currPageNum,
          pageCount: result.pageCount,
          pageSize: result.pageSize,
          jobInfoList: result.rows,
        });
      }
    },
    async handleCurrentChange(val) {
      let result = await reqJobInfoList(
        this.joblist[this.index].clusterId,
        val,
        this.hostName,
        this.jobInfoPageSize,
        this.podName,
        this.joblist[this.index].vcJobName
      );
      if (result.success == true) {
        this.$store.dispatch("Job/getJobInfoList", {
          currPageNum: result.currPageNum,
          pageCount: result.pageCount,
          pageSize: result.pageSize,
          jobInfoList: result.rows,
        });
      }
    },
    async handleSizeChange(val) {
      let result = await reqJobInfoList(
        this.joblist[this.index].clusterId,
        1,
        this.hostName,
        val,
        this.podName,
        this.joblist[this.index].vcJobName
      );
      if (result.success == true) {
        this.$store.dispatch("Job/getJobInfoList", {
          currPageNum: result.currPageNum,
          pageCount: result.pageCount,
          pageSize: result.pageSize,
          jobInfoList: result.rows,
        });
      }
    },
  },
  async mounted() {
    this.index = this.$route.params.index;
    if (this.joblist.length == 0) {
      this.$router.push("/job");
    }
    let result = await reqJobInfoList(
      this.joblist[this.index].clusterId,
      1,
      "",
      10,
      "",
      this.joblist[this.index].vcJobName
    );
    if (result.success == true) {
      this.$store.dispatch("Job/getJobInfoList", {
        currPageNum: result.currPageNum,
        pageCount: result.pageCount,
        pageSize: result.pageSize,
        jobInfoList: result.rows,
      });
    }
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}

.el-button {
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.bread:hover {
  color: blue;
  cursor: pointer;
}
.size {
  font-size: 16px;
}
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 0px;
}
.dialog >>> .el-dialog__body {
  padding: 10px;
}
</style>
