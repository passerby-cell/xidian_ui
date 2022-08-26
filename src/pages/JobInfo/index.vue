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
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-chat-dot-round"
                    @click=""
                    >日志</el-button
                  >
                </template>
              </el-table-column>
            </el-table></Transition
          >
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
import { reqJobInfoList } from "@/api";
import { formatTime } from "@/utils/time";
export default {
  name: "JobInfo",
  data() {
    return {
      index: 0,
      hostName: "",
      podName: "",
      showHostName: false,
      showPodName: false,
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
</style>
