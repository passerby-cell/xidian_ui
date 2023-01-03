<template>
  <div>
    <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight">
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>我的作业</el-breadcrumb-item>
        <el-breadcrumb-item>作业模板</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card class="card-style" shadow="hover" :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px); overflow: auto">
      <Transition appear enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight">
        <el-table :data="JobTemplates" highlight-current-row max-height="600" style="font-size: 16px">
          <el-table-column property="templateId" label="模板ID"></el-table-column>
          <el-table-column property="tvcJobCnName" label="模板名称"></el-table-column>
          <el-table-column property="priorityClassName" label="优先级"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="createJob(scope.row.templateId)">创建作业</el-button>
              <el-button size="mini" type="danger" @click="deleteTemplate(scope.row)"
                v-if="scope.row.templateId != 28">删除</el-button>
              <el-tag v-if="scope.row.templateId == 28" type="success" style="margin-left: 10px;">系统预置</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </Transition>
    </el-card>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqDeleteJobTemplate } from "@/api"
export default {
  name: "Template",
  data() {
    return {

    };
  },
  computed: {
    ...mapState("Template", ["JobTemplates"])
  },
  methods: {
    createJob(templateId) {
      this.$store.dispatch("Template/getJobTemplate", { templateId })
      this.$store.dispatch("Template/getTaskTemplate", { templateId })
      this.$router.push({
        name: "standardjob",
        query: {
          templateId
        }
      })
    },
    async deleteTemplate(row) {
      let result = await reqDeleteJobTemplate({ "clusterId": row.clusterId, "templateId": row.templateId })

      if (result.code == 200) {
        this.$message({
          type: "success",
          message: result.message
        })
        this.$store.dispatch("Template/getJobTemplates", null)
      } else {
        this.$message.error("删除失败")
      }
    }
  },
  mounted() {
    this.$store.dispatch("Template/getJobTemplates", null)
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}

.card-style {
  margin: 10px;
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
</style>
