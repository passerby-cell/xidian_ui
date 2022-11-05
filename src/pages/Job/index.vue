<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>我的作业</el-breadcrumb-item>
        <el-breadcrumb-item>作业列表</el-breadcrumb-item>
      </el-breadcrumb></Transition
    >
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-button
        style="
          margin-top: 10px;
          margin-left: 10px;
          padding-right: 8px;
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 8px;
        "
        class="el-icon-circle-plus-outline"
        size="mini"
        type="primary"
        @click="toCreateJob"
        >新建作业</el-button
      >
    </Transition>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-table
        :row-style="{ height: 40 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }"
        style="width: 98.5%; margin-top: 10px; margin-left: 10px"
        :data="formatedJobList"
        :border="true"
        :row-class-name="tableRowClassName"
        max-height="700"
      >
        <el-table-column
          prop="vcJobCnName"
          label="任务名"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="cursor: pointer" @click="toJobInfo(scope.$index)">{{
              scope.row.vcJobCnName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taskTotal"
          label="总任务数"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taskCompleted"
          label="运行完成数"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="taskPending"
          label="排队中"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cpuUsed"
          label="cpu使用量"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="memUsed"
          label="内存使用量"
          width="120"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status == 'Terminated'"
              size="small"
              type="danger"
              >已终止</el-tag
            >
            <el-tag
              v-if="scope.row.status == 'Pending'"
              size="small"
              type="warning"
              >排队中</el-tag
            >
            <!-- TODO: 任务运行状态 -->
            <el-tag
              size="small"
              v-if="scope.row.status == 'Completed'"
              type="success"
              >已完成</el-tag
            >
            <el-tag
              size="small"
              type="warning"
              v-if="scope.row.status == 'No_Running'"
              >未开始</el-tag
            >
            <el-tag size="small" v-if="scope.row.status == 'Running'"
              >运行中</el-tag
            >
          </template>
        </el-table-column>
        <!-- TODO: 对任务的操作 -->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.status == 'No_Running'"
              @click="startJob(scope.row.clusterId, scope.row.vcJobId)"
              >启动</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteJob(scope.row.clusterId, scope.row.vcJobId)"
              >删除</el-button
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
          :page-size="page"
          layout="prev, pager, next,sizes"
          :page-count="Number(totalpage)"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination
      ></Transition>
    </el-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqDeleteJob, reqStartJob } from "@/api";
import { formatTime } from "@/utils/time";
export default {
  name: "Job",
  data() {
    return {
      secondBread: "标准作业",
      page: 8,
    };
  },
  computed: {
    ...mapState("Job", ["joblist", "pagesize", "pagenum", "totalpage"]),
    formatedJobList() {
      let JobList = this.joblist;

      for (let i = 0; i < JobList.length; i++) {
        JobList[i].startTime = formatTime(JobList[i].startTime);
        JobList[i].endTime = formatTime(JobList[i].endTime);
        JobList[i].createTime = formatTime(JobList[i].createTime);
        if (formatTime(JobList[i].startTime) == "1970-01-01 08:00:00") {
          JobList[i].startTime = "";
        }
        if (formatTime(JobList[i].endTime) == "1970-01-01 08:00:00") {
          JobList[i].endTime = "";
        }
      }
      return JobList;
    },
  },
  methods: {
    async startJob(clusterId, vcJobId) {
      let result = await reqStartJob(clusterId, vcJobId);
      if (result.code == "200") {
        this.$message({
          message: result.message,
          type: "success",
        });
        this.handleCurrentChange(this.pagenum);
      } else {
        this.$message.error(result.message);
      }
    },
    toJobInfo(index) {
      this.$router.push("/jobinfo/" + index);
    },
    toCreateJob() {
      this.$router.push({ name: "standardjob" });
    },
    async deleteJob(clusterId, vcJobId) {
      let result = await reqDeleteJob(clusterId, vcJobId);
      if (result.code == "200") {
        this.$message({
          message: result.message,
          type: "success",
        });
        this.handleCurrentChange(this.pagenum);
      } else {
        this.$message.error(result.message);
      }
    },
    //TODO: 标记行颜色,运行成功的未标记
    tableRowClassName({ rowIndex }) {
      if (this.joblist[rowIndex].status === "Completed") {
        return "success-row";
      }
      if (
        parseInt(this.joblist[rowIndex].cpuUsed.split("C")[0]) >= 5 ||
        parseInt(this.joblist[rowIndex].memUsed.split("G")[0]) >= 10
      ) {
        return "warning-row";
      }
      return "";
    },
    handleCurrentChange(val) {
      this.$store.dispatch("Job/getJobList", {
        //TODO: envId
        envId: 1,
        //TODO: status
        status: null,
        templateId: null,
        //作业类型:标准作业
        vcJobType: "batch",
        currPageNum: val,
        pageSize: this.page,
      });
    },
    handleSizeChange(val) {
      this.page = val;
      this.handleCurrentChange(1);
    },
  },
  mounted() {
    this.handleCurrentChange(1);
  },
};
</script>

<style scoped>
@import "./CSS/info.css";
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}
.el-table {
  font-style: initial;
  font-size: 16px;
}
</style>
