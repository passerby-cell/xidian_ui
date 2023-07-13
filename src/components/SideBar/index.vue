<template>
  <div>
    <div style="text-align: center">
      <img
        src="@/assets/images/titleicon.png"
        style="height: 60px; width: 200px"
      />
      <!-- <span style="color: #1541c2;" class="middlesize">西安电子科技大学</span> -->
    </div>
    <div>
      <dv-decoration-11
        style="width: 200px; height: 60px; color: #1541c2"
        class="middlesize"
        :color="['#6987d6', '#5089da']"
        >数据分析</dv-decoration-11
      >
    </div>
    <div @click="toZaBo()" ref="zabo">
      <dv-decoration-7
        style="width: 200px; height: 60px; cursor: pointer; color: #1541c2"
        :color="color[0]"
        class="smallsize"
        >杂波模型</dv-decoration-7
      >
    </div>
    <div @click="toMuBiao()" ref="mubiao">
      <dv-decoration-7
        style="width: 200px; height: 60px; cursor: pointer; color: #1541c2"
        :color="color[1]"
        class="smallsize"
        >目标检测</dv-decoration-7
      >
    </div>
    <div style="cursor: pointer" @click="toZhiNeng()" ref="zhineng">
      <dv-decoration-11
        style="width: 200px; height: 60px; color: #1541c2; cursor: pointer"
        class="middlesize"
        :color="['#6987d6', '#5089da']"
        >智能检测</dv-decoration-11
      >
    </div>
    <div>
      <dv-decoration-11
        style="width: 200px; height: 60px; color: #1541c2"
        class="middlesize"
        :color="['#6987d6', '#5089da']"
        >系统配置</dv-decoration-11
      >
    </div>
    <div @click="toConfig()" ref="config">
      <dv-decoration-7
        style="width: 200px; height: 60px; cursor: pointer; color: #1541c2"
        :color="color[2]"
        class="smallsize"
        >文件配置</dv-decoration-7
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      color: [
        ["#6987d6", "#5089da"],
        ["#6987d6", "#5089da"],
        ["#6987d6", "#5089da"],
      ],
    };
  },
  methods: {
    toMuBiao() {
      this.$refs.mubiao.style =
        "background-color:#aecaffac;border-radius: 25px 0% 0% 25px;";
      this.$refs.zabo.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.config.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.zhineng.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$router.push({ name: "mubiao" });
    },
    toZaBo() {
      this.$refs.zabo.style =
        "background-color:#aecaffac;border-radius: 25px 0% 0% 25px;";
      this.$refs.mubiao.style = "background-color:#9BB0C9;border-radius:25px;";
      this.$refs.config.style = "background-color:#9BB0C9;border-radius:25px;";
      this.$refs.zhineng.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$router.push({ name: "zabo" });
    },
    toConfig() {
      this.$refs.config.style =
        "background-color:#aecaffac;border-radius: 25px 0% 0% 25px;";
      this.$refs.zabo.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.mubiao.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.zhineng.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$router.push({ name: "config" });
    },
    toZhiNeng() {
      this.$refs.zabo.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.mubiao.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.config.style =
        "background-color:#9BB0C9;border-radius: 25px 0% 0% 25px;";
      this.$refs.zhineng.style =
        "background-color:#aecaffac;border-radius: 25px 0% 0% 25px;";
      this.$router.push({ name: "zhineng" });
    },
  },
  mounted() {
    this.$refs.zabo.style =
      "background-color:#aecaffac;border-radius: 25px 0% 0% 25px;";
  },
};
</script>

<style scoped>
@import url("../../../fontsize.css");

.div {
  margin-top: 20px;
  height: 60px;
}
</style>
