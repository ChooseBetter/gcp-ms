<template>
  <div id="home-page">
    <div class="card-list">
      <el-row :gutter="12">
        <template v-for="item in cardList" :key="item">
          <el-col :span="4">
            <el-card shadow="hover" :body-style="item.bodyStyle">
              <div class="detail">
                <div v-animateNum="item.value" class="number">
                  {{ item.value }}
                </div>
                <div class="name">{{ item.name }}</div>
              </div>
              <div class="icon">
                <component :is="item.icon" :key="item.name"></component>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="container">
      <el-card>
        <div class="userInfo-box">
          <div class="base">
            <img v-imageLazy="managerInfo.avatar" alt="" />
            <div class="info">
              <div class="name">{{ managerInfo.managerName }}</div>
              <div class="role">{{ managerInfo.roleName }}</div>
            </div>
          </div>
          <div class="other">
            <div class="lastLoginTime item">
              <span class="introduce">上一次登录时间</span>
              <span v-dateFormat="'YYYY-MM-DD HH:mm'">
                {{ managerInfo.loginTime }}
              </span>
            </div>
            <div class="authority">
              <span class="introduce item">管理权限</span>
              <div class="permissionlist">
                <span v-for="item in permissionlist" :key="item">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div class="charts">
        <el-row :gutter="12" style="margin-bottom: 15px">
          <el-col :span="10">
            <card title="文章类型阅读量占比">
              <echart-pie :pieData="articleTypeList"></echart-pie>
            </card>
          </el-col>
          <el-col :span="14">
            <card title="近七天文章与话题发布情况">
              <echart-line v-bind="lineData"></echart-line>
            </card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col>
            <card title="用户登录时间段">
              <echart-bar v-bind="loginTimeData"></echart-bar>
            </card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, computed} from "vue";
import {storeToRefs} from "pinia";
import {managerStore} from "@/store/manager";
import {reqCardList, reqChartList} from "@/service/home";

const {managerInfo, managerMenus} = storeToRefs(managerStore());
const cardList = ref([
  {
    field: "userTotal",
    name: "注册用户",
    value: 0,
    icon: "UserFilled",
    bodyStyle: {"background-color": "#33C4B3", height: "50px"},
  },
  {
    field: "articleTotal",
    name: "发布文章",
    value: 0,
    icon: "UserFilled",
    bodyStyle: {"background-color": "#4DA1EE", height: "50px"},
  },
  {
    field: "themeTotal",
    name: "发布话题",
    value: 0,
    icon: "UserFilled",
    bodyStyle: {"background-color": "#9AB3FF", height: "50px"},
  },
  {
    field: "commentTotal",
    name: "总评论数",
    value: 0,
    icon: "UserFilled",
    bodyStyle: {"background-color": "#FE9CA0", height: "50px"},
  },
  {
    field: "likeTotal",
    name: "总点赞数",
    value: 0,
    icon: "UserFilled",
    bodyStyle: {"background-color": "#FFAD49", height: "50px"},
  },
  {
    field: "feedbackTotal",
    name: "反馈意见",
    value: 0,
    icon: "UserFilled",
    bodyStyle: {"background-color": "#99BA33", height: "50px"},
  },
]);
const articleTypeList = ref([]);
const loginTimeData = ref({
  xLabels: <string[]>[],
  values: <string[]>[],
  barOption: {
    xAxis: {
      name: "小时",
    },
    yAxis: {
      name: "人数",
    },
  },
});
const lineData = ref({
  xLabels: <string[]>[],
  values: <string[]>[],
  lineOption: {
    xAxis: {
      name: "日期",
    },
    yAxis: {
      name: "数量",
    },
    series: {
      name: "文章",
    },
    extra: {
      type: "line",
      name: "话题",
      data: <any>[],
    },
  },
});

onBeforeMount(async () => {
  const res = await reqCardList("/home/cardList");
  if (res.code === 200) {
    cardList.value.forEach((item) => {
      item.value = res.data[item.field];
    });
  }
  const res1 = await reqChartList("/home/chartList");
  if (res1.code === 200) {
    articleTypeList.value = res1.data.categorylist;
    res1.data.hourslist.forEach((item: any) => {
      loginTimeData.value.xLabels.push(item.time);
      loginTimeData.value.values.push(item.count);
    });
    res1.data.weekDayArticleList.forEach((item: any) => {
      lineData.value.xLabels.push(item.time);
      lineData.value.values.push(item.count);
    });
    res1.data.weekDayThemeList.forEach((item: any) => {
      lineData.value.lineOption.extra.data.push(item.count);
    });
  }
});

const permissionlist = computed(() => {
  let arr = <any>[];
  return handlelist(managerMenus.value, arr);
});

const handlelist = (list: any, arr: any[]) => {
  list.forEach((item: any) => {
    if (item.menuType === 1 && item.children.length !== 0) {
      arr.push(item.menuName);
      handlelist(item.children, arr);
    }
  });
  return arr;
};
</script>

<style scoped lang="less">
:deep(.el-card__body) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  .detail {
    color: #fff;
    .number {
      font-size: 32px;
      font-weight: bolder;
    }
  }
  .icon {
    width: 30px;
    height: 30px;
    color: #fff;
    line-height: 30px;
  }
}
#home-page {
  .card-list {
    margin-bottom: 10px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    .userInfo-box {
      width: 330px;
      .base {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #e5e5e5;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px solid rgb(238, 240, 243);
        }
        .info {
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .name {
            font-size: 25px;
            font-weight: bolder;
          }
          .role {
            font-size: 16px;
            color: #a5a5a5;
          }
        }
      }
      .other {
        padding: 15px 0;
        color: #555555;
        .introduce {
          color: #a5a5a5;
        }
        .item {
          margin: 15px 0;
        }
        .lastLoginTime {
          display: flex;
          justify-content: space-between;
        }
        .authority {
          .permissionlist {
            margin-top: 5px;
            padding: 5px;
            background-color: #e5e5e5;
            span {
              margin-right: 5px;
            }
          }
        }
      }
    }
    .charts {
      margin-left: 15px;
      width: 70%;
    }
  }
}
</style>
