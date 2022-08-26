<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>我的作业</el-breadcrumb-item>
        <el-breadcrumb-item>新建作业</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '0px' }"
      style="height: calc(100vh - 170px); overflow: auto"
    >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-row>
          <h3 style="margin-left: 10px" class="size">
            <span style="color: #409eff">|</span>&nbsp;作业属性
          </h3>
        </el-row>
      </Transition>
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-form
          ref="jobForm"
          label-position="right"
          label-width="100px"
          style="min-width: 1000px; padding: 0px"
          :model="vcJob"
          :rules="vcJobRules"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item
                label="作业中文名"
                prop="vcJobCnName"
                style="margin-left: 50px"
              >
                <el-col>
                  <el-input
                    size="small"
                    placeholder="请输入作业中文名"
                    style="width: 340px; margin-left: 0px"
                    v-model="vcJob.vcJobCnName"
                  />
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="作业英文名" prop="vcJobName">
                <el-col>
                  <el-input
                    placeholder="请输入作业英文名"
                    size="small"
                    style="width: 340px"
                    v-model="vcJob.vcJobName"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                size="small"
                @click="jobDialogVisible = true"
                style="margin-top: 4px"
                >高级配置</el-button
              >
            </el-col>
          </el-row>
          <el-dialog
            title="作业高级配置"
            :visible.sync="jobDialogVisible"
            width="800px"
          >
            <el-row>
              <el-col :span="11">
                <el-form-item label="作业优先级" prop="priorityClassName">
                  <el-col>
                    <el-select
                      size="small"
                      placeholder="请选择作业的优先级"
                      v-model="vcJob.priorityClassName"
                      style="width: 250px"
                    >
                      <el-option label="高" value="high-priority"></el-option>
                      <el-option label="中" value="middle-priority"></el-option>
                      <el-option label="低" value="low-priority"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所属集群">
                  <el-col>
                    <el-select
                      v-model="vcJob.queueName"
                      size="small"
                      style="width: 250px"
                    >
                      <el-option label="default" value="default"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="并行运行">
                  <el-col>
                    <el-switch v-model="vcJob.parallelExecution"></el-switch>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="重启次数" prop="maxRetry">
                  <el-col>
                    <el-input-number
                      size="small"
                      style="width: 250px"
                      :min="0"
                      :max="100"
                      v-model="vcJob.maxRetry"
                    ></el-input-number>
                  </el-col> </el-form-item
              ></el-col>
            </el-row>
          </el-dialog>

          <el-row>
            <el-col :span="2">
              <h3 style="margin-top: 8px; margin-left: 10px" class="size">
                <span style="color: #409eff">|</span>&nbsp;任务属性
              </h3>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" size="small" @click="getImage"
                >添加</el-button
              >
            </el-col>
          </el-row>

          <el-table
            :cell-style="{ padding: 5 + 'px' }"
            style="
              width: 100%;
              margin-top: 10px;
              margin-left: 10px;
              font-size: 16px;
            "
            :data="tasks"
            :border="true"
            :row-style="{ height: 30 + 'px' }"
            max-height="400px"
          >
            <el-table-column
              prop="taskCnName"
              label="任务中文名称"
            ></el-table-column>
            <el-table-column
              prop="taskName"
              label="任务英文名称"
            ></el-table-column>
            <!-- <el-table-column
              prop="podReplicas"
              label="实例个数"
            ></el-table-column>
            <el-table-column
              prop="podMinReplicas"
              label="实例最小个数"
            ></el-table-column> -->
            <el-table-column
              prop="requestCpu"
              label="CPU核心数(核)"
            ></el-table-column>
            <el-table-column
              prop="requestMemory"
              label="内存使用量(GB)"
            ></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteTask(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-form-item style="width: 100%">
            <el-row>
              <el-col :span="2" :offset="22"
                ><el-button type="primary" size="small" @click="createJob"
                  >创建</el-button
                ></el-col
              >
              <!-- <el-col :span="2"
                ><el-button
                  type="primary"
                  size="small"
                  @click="createAndStartJob"
                  >创建并运行</el-button
                ></el-col
              > -->
            </el-row>
          </el-form-item>
        </el-form></Transition
      >
    </el-card>
    <el-dialog
      title="新建任务"
      :visible.sync="dialogFormVisible"
      width="1000px"
    >
      <el-form
        ref="taskForm"
        :rules="taskRules"
        :model="taskInfo"
        label-position="right"
        label-width="70px"
        style="padding: 0px; min-width: 900px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="任务英文名"
              :label-width="formLabelWidth"
              prop="taskName"
            >
              <el-input
                autocomplete="off"
                v-model="taskInfo.taskName"
                placeholder="请输入任务英文名"
                style="width: 340px"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item
              label="任务中文名"
              :label-width="formLabelWidth"
              prop="taskCnName"
            >
              <el-input
                autocomplete="off"
                v-model="taskInfo.taskCnName"
                placeholder="请输入任务中文名"
                style="width: 340px"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="9"
            ><el-form-item
              label="选择仓库"
              :label-width="formLabelWidth"
              prop="repositoryDir"
            >
              <el-select
                style="width: 250px"
                v-model="taskInfo.repositoryDir"
                @change="changeImageCatalog"
              >
                <el-option
                  v-for="(item, index) in imageCatalogList"
                  :label="
                    item.envName == 'cluster-default-default'
                      ? 'private'
                      : item.envName
                  "
                  :value="item.catalogId"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="9">
            <el-form-item
              label="选择镜像"
              :label-width="formLabelWidth"
              prop="imagePrefix"
            >
              <el-select
                placeholder="请选择镜像"
                style="width: 250px"
                v-model="taskInfo.imagePrefix"
                @change="changeImage"
              >
                <el-option
                  v-for="(item, index) in imageList"
                  :key="index"
                  :label="item.imageName"
                  :value="item.imageName"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item
              label="选择版本"
              :label-width="formLabelWidth"
              prop="imageVersion"
            >
              <el-select
                placeholder="请选择镜像版本"
                style="width: 100px"
                v-model="taskInfo.imageVersion"
              >
                <el-option
                  v-for="(item, index) in imageVersionList"
                  :key="index"
                  :label="item.imageTag"
                  :value="item.imageTag"
                ></el-option>
              </el-select> </el-form-item></el-col
        ></el-row>
        <!-- <el-row>
          <el-col :span="11">
            <el-form-item label="实例个数" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.podReplicas"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="最小实例个数" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.podMinReplicas"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="CPU" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.requestCpu"
                :min="1"
                :max="100"
              ></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(核)</span>
            </el-form-item>
          </el-col>-->
        <!-- <el-col :span="11" :offset="2">
            TODO:CPU限制
            <el-form-item label="CPU限制" :label-width="formLabelWidth">
              <el-input-number></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(核)</span>
            </el-form-item>
          </el-col> -->
        <!-- <el-col :span="11" :offset="2">
            <el-form-item label="内存" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.requestMemory"
                :min="1"
                :max="100"
              ></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(GB)</span>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row>
         
          <el-col :span="11" :offset="2">
             TODO:内存限制
            <el-form-item label="内存限制" :label-width="formLabelWidth">
              <el-input-number></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(GB)</span>
            </el-form-item> 
          </el-col>
        </el-row> -->
        <el-form-item
          label="GPU算力"
          :label-width="formLabelWidth"
          style="width: 900px"
        >
          <el-row style="margin-top: 0px">
            <el-col :span="20">
              <el-input-number
                style="width: 100%"
                v-model="taskInfo.gpuCalPower"
                v-if="taskInfo.gpuCalPower < 100"
                :min="0"
                :step="25"
                :max="100"
                @change="taskInfo.gpuVideoMem = taskInfo.gpuCalPower * 0.88"
              ></el-input-number>
              <el-input-number
                style="width: 100%"
                v-model="taskInfo.gpuCalPower"
                v-if="taskInfo.gpuCalPower >= 100"
                :min="0"
                :step="100"
                :max="300"
                @change="taskInfo.gpuVideoMem = taskInfo.gpuCalPower * 0.88"
              ></el-input-number>
            </el-col>
            <el-col :span="3">
              <span style="font-size: 16px; margin-left: 10px">(%)</span>
            </el-col>
            <el-col :span="1">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <p>
                    1、输入1-100内的整数，例如50，是指将50%的cuda
                    core分配给该服务。
                  </p>
                  <p>
                    2、输入大于100的整数，只能是100的倍数，如200，是指将2张GPU卡都分给该服务。
                  </p>
                  <p>
                    3、如果输入大于等于100的整数，GPU显存不用再填写，默认使用GPU的全部显存。
                  </p>
                  <p>4、如果值为空或0时，默认不使用GPU算力"</p>
                </div>
                <i
                  class="el-icon-question"
                  style="color: #409eff; margin-left: 10px; cursor: pointer"
                ></i> </el-tooltip
            ></el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="GPU显存"
          :label-width="formLabelWidth"
          style="width: 900px"
        >
          <el-row style="margin-top: 0px">
            <el-col :span="20">
              <el-slider
                :max="Number(88)"
                style="width: 100%"
                v-model="taskInfo.gpuVideoMem"
              ></el-slider>
            </el-col>
            <el-col :span="3">
              <span style="font-size: 16px; margin-left: 10px"
                >{{ Number(taskInfo.gpuVideoMem) * 0.25 }}GB</span
              >
            </el-col>
            <el-col :span="1">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <p>
                    注：拖动一格显示1，为0.25GB，拖动2格显示2，为0.5GB，以此类推；最大能拖动88格显示88，为22GB。
                  </p>
                </div>
                <i
                  class="el-icon-question"
                  style="color: #409eff; margin-left: 10px; cursor: pointer"
                ></i> </el-tooltip
            ></el-col> </el-row
        ></el-form-item>
        <!-- <el-form-item
          label="选择仓库"
          :label-width="formLabelWidth"
          prop="repository"
        >
          <el-select
            placeholder="请选择镜像仓库"
            style="width: 660px"
            v-model="taskInfo.repository"
          >
            <el-option
              v-for="(item, index) in warehouseList"
              :key="index"
              :label="item.warehouseName"
              :value="item.warehouseId"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item label="程序运行命令" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            style="width: 660px"
            v-model="taskInfo.command"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作目录" :label-width="formLabelWidth">
          <el-input
            style="width: 660px"
            autocomplete="off"
            v-model="taskInfo.workingDir"
            placeholder="设置进入容器的目录,没有设置的情况下,使用镜像的工作目录,默认进入根目录"
          ></el-input>
        </el-form-item> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="故障响应" :label-width="formLabelWidth">
              <el-select
                placeholder="请选择当前任务状态"
                style="width: 340px"
                v-model="taskInfo.policiesEvent"
                @change="changeTaskpoliciesEvent"
                @clear="taskInfo.policiesAction = ''"
                clearable
              >
                <!-- <el-option label="运行完成" value="TaskCompleted"></el-option> -->
                <!-- TODO:TaskFailed -->
                <el-option label="运行失败" value="PodFailed"></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="响应方式" :label-width="formLabelWidth">
              <el-select
                placeholder="请选择变更任务状态"
                style="width: 340px"
                v-model="taskInfo.policiesAction"
                clearable
                @change="changeTaskpoliciesAction"
                @clear="taskInfo.policiesEvent = ''"
              >
                <el-option label="任务完成" value="CompleteJob"></el-option>
                <!-- TODO: failureJob-->
                <el-option label="任务重启" value="RestartJob"></el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>

        <el-form-item :label-width="formLabelWidth">
          <el-button
            slot="label"
            size="small"
            type="primary"
            @click="show = !show"
            style="cursor: pointer"
            >高级配置</el-button
          >
          <el-tooltip class="item" effect="dark" placement="top" v-if="!show">
            <div slot="content">
              <p>
                注：通过点击高级配置,可在此选择添加存储变量,管理存储变量等高级配置。
              </p>
            </div>
            <i
              class="el-icon-question"
              style="color: #409eff; margin-left: 10px; cursor: pointer"
            ></i>
          </el-tooltip>
          <el-tabs style="width: 820px" v-if="show">
            <!-- <el-tab-pane label="端口" name="first">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;添加端口
                  </h3>
                </el-row>
                <el-row style="margin-left: 10px">
                  <el-col :span="6">
                    <el-input placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-select style="width: 100%">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="端口"></el-table-column>
                    <el-table-column label="协议"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="环境变量" name="second">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;添加变量
                  </h3>
                </el-row>
                <el-row style="margin-left: 10px">
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane> -->
            <el-tab-pane label="添加存储变量">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;添加变量
                  </h3>
                </el-row>
                <el-row>
                  <!-- <el-form-item label="存储类型">
                    <el-col :span="24" :offset="1">
                      <el-select size="small">
                        <el-option
                          label="kubenates"
                          value="kubenates"
                        ></el-option>
                        <el-option label="docker" value="docker"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item> -->
                </el-row>
                <el-form
                  :model="mount"
                  :rules="mountRules"
                  style="padding: 0px"
                  label-position="right"
                  label-width="136px"
                  ref="storageForm"
                >
                  <el-row>
                    <el-form-item label="路径地址" prop="hostPath">
                      <el-col :span="24" :offset="1" style="margin-left: 0px">
                        <el-input
                          size="small"
                          style="width: 440px"
                          v-model="mount.hostPath"
                          ><template slot="append"
                            ><span style="cursor: pointer" @click="initData">
                              选择数据服务</span
                            ></template
                          >
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-dialog
                    title="目录挂载"
                    :visible.sync="childDialogTableVisible"
                    append-to-body
                    width="500px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-input
                          size="small"
                          placeholder="搜索"
                          v-model="dataName"
                        ></el-input>
                      </el-col>
                      <el-col :span="8" :offset="4">
                        <el-button-group>
                          <el-button
                            :type="type == 1 ? 'success' : 'primary'"
                            size="small"
                            @click="getDataSet(1)"
                            >数据集</el-button
                          >
                          <el-button
                            @click="getDataSet(2)"
                            :type="type != 1 ? 'success' : 'primary'"
                            size="small"
                            >结果集</el-button
                          >
                        </el-button-group></el-col
                      >
                    </el-row>
                    <el-table
                      :data="selectedData"
                      highlight-current-row
                      @row-click="initRealPath"
                      max-height="300"
                    >
                      <el-table-column
                        property="name"
                        :label="type == 1 ? '数据集' : '结果集'"
                        width="150"
                      ></el-table-column>
                      <el-table-column
                        property="catalog"
                        label="路径"
                        width="300"
                      ></el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="childDialogTableVisible = false"
                        >取 消</el-button
                      >
                      <el-button
                        type="primary"
                        @click="childDialogTableVisible = false"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-row style="margin-top: 10px">
                    <el-form-item label="容器内路径" prop="mountPath">
                      <el-col :span="24" :offset="1" style="margin-left: 0px">
                        <el-input
                          size="small"
                          style="width: 440px"
                          v-model="mount.mountPath"
                        >
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="small"
                      style="margin-top: 15px"
                      @click="addMountData()"
                      >添加</el-button
                    ></el-form-item
                  >
                </el-form>
              </el-card>
            </el-tab-pane>
            <!-- <el-tab-pane label="调度管理" name="forth">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;添加变量</h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;管理变量</h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="生命周期" name="fifth">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;添加卷</h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-select style="width: 100%" v-model="form.portType">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;管理卷</h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="存储类型"></el-table-column>
                    <el-table-column label="特性"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane> -->
            <el-tab-pane label="管理存储变量">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table
                    border
                    :data="mountData"
                    style="width: 100%"
                    :row-style="{ height: 40 + 'px' }"
                    :cell-style="{ padding: 5 + 'px' }"
                    max-height="200"
                  >
                    <el-table-column
                      label="路径地址"
                      prop="hostPath"
                    ></el-table-column>
                    <el-table-column
                      label="容器内路径"
                      prop="mountPath"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="danger"
                          size="mini"
                          style="margin-buttom: 3px"
                          @click="deleteMountData(scope.$index)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            maxlength="30"
            show-word-limit
            style="width: 820px"
            v-model="taskInfo.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleTask()" style="margin-left: 725px"
            >取 消</el-button
          >
          <el-button type="primary" @click="createTask()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqImage,
  reqQueueList,
  reqWareHouseList,
  reqWareHouseImageList,
  reqImageVersion,
  reqDataSet,
  reqCreateJob,
} from "@/api";
import { mapState } from "vuex";
export default {
  name: "CreateJob",
  data() {
    return {
      show: false,
      jobDialogVisible: false,
      mount: {
        hostPath: "",
        mountPath: "",
      },
      mountRules: {
        hostPath: [{ required: true, message: "不能为空", trigger: "blur" }],
        mountPath: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      mountData: [],
      type: 1,
      dataName: "",
      childDialogTableVisible: false,
      vcJob: {
        vcJobId: "",
        vcJobCnName: "",
        vcJobName: "",
        vcJobType: "batch",
        queueName: "default",
        queueId: 1,
        maxRetry: "1",
        priorityClassName: "middle-priority",
        parallelExecution: true,
      },
      vcJobRules: {
        vcJobCnName: [
          { required: true, message: "请输入作业中文名", trigger: "blur" },
          { min: 4, max: 45, message: "长度在4到45字符", trigger: "blur" },
        ],
        vcJobName: [
          { required: true, message: "请输入作业英文名", trigger: "blur" },
          {
            min: 4,
            max: 45,
            message: "请输入4-45位小写字母，数字，中划线组合并以字母开头",
            trigger: "blur",
          },
        ],

        maxRetry: [
          {
            required: true,
            message: "请输入作业尝试重启次数",
            trigger: "blur",
          },
        ],
        priorityClassName: [
          { required: true, message: "请选择作业优先级", trigger: "change" },
        ],
      },
      target: {
        templateId: null,
        clusterId: 9,
        startNow: false,
        envId: 1,
      },
      tasks: [],
      taskInfo: {
        taskName: "",
        taskCnName: "",
        podReplicas: 1,
        podMinReplicas: 1,
        requestCpu: 4,
        requestMemory: 16,
        gpuCalPower: 100,
        gpuVideoMem: 88,
        command: null,
        workingDir: null,
        description: "",
        repository: "default",
        repositoryDir: "cluster-default-default",
        image: "",
        imagePrefix: "",
        imageVersion: "",
        policiesAction: null,
        policiesEvent: null,
        containerOptions: "",
        oldContainerOptions:
          '{"bocoPlatform-ports":[],"bocoPlatform-envs":[],"bocoPlatform-configs":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-volumes":[],"bocoPlatform-schedulingManagement":[]}',
      },
      taskRules: {
        taskName: [
          { required: true, message: "请输入作业英文名", trigger: "blur" },
          {
            min: 4,
            max: 45,
            message: "请输入4-45位小写字母，数字，中划线组合并以字母开头",
            trigger: "blur",
          },
        ],
        taskCnName: [
          { required: true, message: "请输入作业中文名", trigger: "blur" },
          { min: 4, max: 45, message: "长度在4到45字符", trigger: "blur" },
        ],
        repository: [{ required: true, trigger: "change" }],
        repositoryDir: [{ required: true, trigger: "change" }],
        imagePrefix: [{ required: true, trigger: "change" }],
        imageVersion: [{ required: true, trigger: "change" }],
        //TODO: 表单联动校验
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      bocoPlatformenvs: [],
      bocoPlatformports: [],
      bocoPlatformschedulingManagement: [],
      bocoPlatformlifecycle: [],
      bocoPlatformprobe: [],
      bocoPlatformconfigs: [],
      bocoPlatformconfigMounts: [],
      bocoPlatformvolumes: [],
      bocoPlatformvolumeMounts: [],
    };
  },
  computed: {
    ...mapState("CreateJob", [
      "queueList",
      "warehouseList",
      "imageCatalogList",
      "imageList",
      "imageVersionList",
      "data",
    ]),
    fullImage() {
      return this.taskInfo.imagePrefix + ":" + this.taskInfo.imageVersion;
    },
    selectedData() {
      let data = [];
      if (this.dataName == "") {
        return this.data;
      } else {
        this.data.forEach((element) => {
          if (element.name.indexOf(this.dataName) != -1) {
            data.push(element);
          }
        });
        return data;
      }
    },
  },

  methods: {
    changeTaskpoliciesEvent(val) {
      if (val == "PodFailed") {
        this.taskInfo.policiesAction = "CompleteJob";
      }
    },
    changeTaskpoliciesAction(val) {
      if (val) {
        this.taskInfo.policiesEvent = "PodFailed";
      }
    },
    //   \"bocoPlatform-volumes\":[{\"name\":\"name0\",\"hostPath\":\"/opt/bcc/storage1/NFS25\"}],\"bocoPlatform-volumeMounts\":[{\"name\":\"name0\",\"mountPath\":\"/\"}]
    createJob() {
      let _this = this;
      this.$refs["jobForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          _this.vcJob.queueId = _this.queueList[0].queueId;
          let result = await reqCreateJob({
            tasks: _this.tasks,
            target: _this.target,
            vcJob: _this.vcJob,
          });
          if (result.code == "200") {
            _this.$router.push("/job");
          }
        }
      });
    },
    createAndStartJob() {
      let _this = this;
      this.$refs["jobForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          _this.target.startNow = true;
          _this.vcJob.queueId = _this.queueList[0].queueId;
          let result = await reqCreateJob({
            tasks: _this.tasks,
            target: _this.target,
            vcJob: _this.vcJob,
          });
          if (result.code == "200") {
            _this.$message({ type: "success", message: result.message });
            _this.$router.push("/job");
          } else {
            _this.$message({ type: "warning", message: result.message });
          }
        }
      });
    },
    async getImage() {
      this.dialogFormVisible = true;
      let result4 = await reqImage(this.imageCatalogList[0].catalogId);
      if (result4.code == "200") {
        this.$store.dispatch("CreateJob/getImage", result4.data);
        let result5 = await reqImageVersion(result4.data[0].imageName);
        if (result5.success == true) {
          this.$store.dispatch("CreateJob/getImageVersion", result5.rows);
        }
      }
      this.initImageSelected();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    createTask() {
      let _this = this;
      this.$refs["taskForm"].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          _this.dialogFormVisible = false;
          let taskInfo = _this.formatTaskInfo();
          _this.tasks.push(taskInfo);
          _this.vcJob.vcJobName = "work-" + _this.tasks[0].taskCnName;
          _this.vcJob.vcJobCnName = _this.vcJob.vcJobName;
          _this.cancleTask();
        }
      });
    },
    formatTaskInfo() {
      let taskInfo = {};
      taskInfo.taskName = this.taskInfo.taskName;
      taskInfo.taskCnName = this.taskInfo.taskCnName;
      taskInfo.podReplicas = this.taskInfo.podReplicas;
      taskInfo.podMinReplicas = this.taskInfo.podMinReplicas;
      taskInfo.requestCpu = this.taskInfo.requestCpu;
      taskInfo.requestMemory = this.taskInfo.requestMemory;
      taskInfo.gpuCalPower = this.taskInfo.gpuCalPower;
      taskInfo.gpuVideoMem = this.taskInfo.gpuVideoMem;
      taskInfo.command = this.taskInfo.command;
      taskInfo.workingDir = this.taskInfo.workingDir;
      taskInfo.description = this.taskInfo.description;
      taskInfo.repository = this.taskInfo.repository.toString();
      taskInfo.repositoryDir = this.taskInfo.repositoryDir.toString();
      taskInfo.image = this.fullImage;
      taskInfo.policiesAction = this.taskInfo.policiesAction;
      taskInfo.policiesEvent = this.taskInfo.policiesEvent;

      let volumes = "";
      let mountvolumes = "";
      let oldmountvolumes = "";
      for (let i = 0; i < this.mountData.length; i++) {
        if (i + 1 == this.mountData.length) {
          volumes +=
            '{"name":"name' +
            i +
            '","hostPath":"' +
            this.mountData[i].hostPath +
            '"}';
          mountvolumes +=
            '{"name":"name' +
            i +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"}';
        } else {
          volumes +=
            '{"name":"name' +
            i +
            '","hostPath":"' +
            this.mountData[i].hostPath +
            '"},';
          mountvolumes +=
            '{"name":"name' +
            i +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"},';
        }

        // {\"type\":\"hostPath\",\"hostPath\":\"/opt/bcc/storage1/NFS44/test\",\"mountPath\":\"/test\"},{\"type\":\"hostPath\",\"hostPath\":\"/opt/bcc/storage1/NFS44\",\"mountPath\":\"/\"}
        if (i + 1 == this.mountData.length) {
          oldmountvolumes +=
            '{"type":"hostPath","hostPath":"' +
            this.mountData[i].hostPath +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"}';
        } else {
          oldmountvolumes +=
            '{"type":"hostPath","hostPath":"' +
            this.mountData[i].hostPath +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"},';
        }
      }

      taskInfo.containerOptions =
        '{"bocoPlatform-envs":[],"bocoPlatform-ports":[],"bocoPlatform-schedulingManagement":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-configs":[],"bocoPlatform-configMounts":[],"bocoPlatform-volumes":[' +
        volumes +
        '],"bocoPlatform-volumeMounts":[' +
        mountvolumes +
        "]}";
      taskInfo.oldContainerOptions =
        '{"bocoPlatform-ports":[],"bocoPlatform-envs":[],"bocoPlatform-configs":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-volumes":[' +
        oldmountvolumes +
        '],"bocoPlatform-schedulingManagement":[]}';
      return taskInfo;
    },
    cancleTask() {
      this.dialogFormVisible = false;
      this.taskInfo = {
        taskName: "",
        taskCnName: "",
        podReplicas: 1,
        podMinReplicas: 1,
        requestCpu: 1,
        requestMemory: 4,
        gpuCalPower: 100,
        gpuVideoMem: 88,
        command: null,
        workingDir: null,
        description: "",
        repository: "default",
        repositoryDir: "cluster-default-default",
        image: "",
        imagePrefix: "",
        imageVersion: "",
        policiesAction: "",
        policiesEvent: "",
        containerOptions: "",
        oldContainerOptions:
          '{"bocoPlatform-ports":[],"bocoPlatform-envs":[],"bocoPlatform-configs":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-volumes":[],"bocoPlatform-schedulingManagement":[]}',
      };
      this.initImageSelected();

      this.mountData = [];
      this.clearValidate("taskForm");
      this.clearValidate("storageForm");
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    deleteMountData(index) {
      this.mountData.splice(index, 1);
    },
    addMountData() {
      let _this = this;

      this.$refs["storageForm"].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          let mount = {
            hostPath: "",
            mountPath: "",
          };
          mount.hostPath = this.mount.hostPath;
          mount.mountPath = this.mount.mountPath;
          this.mountData.push(mount);
          this.mount.hostPath = "";
          this.mount.mountPath = "";
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
      });
    },
    initRealPath(row, event, column) {
      this.mount.hostPath = row.catalog;
    },
    initData() {
      this.childDialogTableVisible = true;
      this.getDataSet(this.type);
    },
    async getDataSet(type) {
      this.type = type;
      let result = await reqDataSet(this.type);
      if (result.code == 200) {
        this.$store.dispatch("CreateJob/getDataSet", result.data);
      }
    },
    async changeImage(imageName) {
      let result5 = await reqImageVersion(imageName);
      if (result5.success == true) {
        this.$store.dispatch("CreateJob/getImageVersion", result5.rows);
      }
      this.taskInfo.imagePrefix = imageName;
      this.taskInfo.imageVersion = this.imageVersionList[0].imageTag;
    },
    async changeImageCatalog(catalogId) {
      let result4 = await reqImage(catalogId);
      if (result4.code == "200") {
        this.$store.dispatch("CreateJob/getImage", result4.data);
        let result5 = await reqImageVersion(result4.data[0].imageName);
        if (result5.success == true) {
          this.$store.dispatch("CreateJob/getImageVersion", result5.rows);
        }
      }
      this.taskInfo.repositoryDir = catalogId;
      this.taskInfo.imagePrefix = this.imageList[0].imageName;
      this.taskInfo.imageVersion = this.imageVersionList[0].imageTag;
      this.updateName();
    },
    initImageSelected() {
      this.taskInfo.repository = this.warehouseList[0].warehouseId;
      this.taskInfo.repositoryDir = this.imageCatalogList[0].catalogId;
      this.taskInfo.imagePrefix = this.imageList[0].imageName;
      this.taskInfo.imageVersion = this.imageVersionList[0].imageTag;
      this.updateName();
    },
    updateName() {
      var d = new Date();
      this.taskInfo.taskCnName =
        "task" +
        (d.getMonth() + 1) +
        d.getHours() +
        d.getMinutes() +
        d.getSeconds();
      this.taskInfo.taskName = this.taskInfo.taskCnName;
    },
  },
  async mounted() {
    let result1 = await reqQueueList();
    if (result1.success == true) {
      this.$store.dispatch("CreateJob/getQueueList", result1.rows);
      let result2 = await reqWareHouseList(result1.rows[0].clusterId);
      if (result2.code == "200") {
        this.$store.dispatch("CreateJob/getWareHouseList", result2.data);
        let result3 = await reqWareHouseImageList(result2.data[0].warehouseId);
        if (result3.code == "200") {
          this.$store.dispatch("CreateJob/getWareHouseImageList", result3.data);
        }
      }
    }
  },
};
</script>

<style scoped>
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
</style>
