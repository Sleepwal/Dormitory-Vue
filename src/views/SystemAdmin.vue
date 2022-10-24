<template>
  <el-container class="home_container">
    <!-- 顶部 -->
    <el-header class="home_header">
      <div class="home_title">DORMS宿舍管理系统-系统管理员</div>
      <div class="home_userinfoContainer">
        <el-dropdown>
          <span class="el-dropdown-link home_userinfo">
            {{ admin.username }}
            <i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 导航栏 -->
    <el-container>
      <el-aside class="home_aside" width="200px">
        <!-- 展开 收起 -->
        <el-radio-group v-model="isCollapse" style="margin-bottom: 5px;margin-top: 5px;"
         fill=''>
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>

        <!-- router导航 -->
        <el-menu
          router
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 宿管模块 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span slot="title">宿管模块</span>
            </template>
            <el-menu-item
              index="/dormitoryAdminAdd"
              :class="$route.path == '/dormitoryAdminAdd' ? 'is-active' : ''"
            >
              <i class="el-icon-folder-add"></i>添加宿管
            </el-menu-item>
            <el-menu-item
              index="/dormitoryAdminManager"
              :class="
                $route.path == '/dormitoryAdminManager' ? 'is-active' : ''
              "
            >
              <i class="el-icon-document-copy"></i>宿管管理
            </el-menu-item>
          </el-submenu>

          <!-- 学生模块 -->
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-user-solid"></i>
              <span slot>学生模块</span>
            </template>
            <el-menu-item
              index="/studentAdd"
              :class="$route.path === '/studentAdd' ? 'is-active' : ''"
            >
              <i class="el-icon-folder-add"></i>添加学生
            </el-menu-item>
            <el-menu-item index="/studentManager">
              <i class="el-icon-document-copy"></i>学生管理
            </el-menu-item>
          </el-submenu>

          <!-- 楼宇模块 -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-office-building"></i
              ><span slot>楼宇模块</span></template
            >
            <el-menu-item index="/buildingAdd">
              <i class="el-icon-folder-add"></i>添加楼宇
            </el-menu-item>
            <el-menu-item index="/buildingManager">
              <i class="el-icon-document-copy"></i>楼宇管理
            </el-menu-item>
          </el-submenu>

          <!-- 宿舍模块 -->
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-s-home"></i>
              <span slot>宿舍模块</span></template
            >
            <el-menu-item index="/dormitoryAdd">
              <i class="el-icon-folder-add"></i>添加宿舍
            </el-menu-item>
            <el-menu-item index="/dormitoryManager">
              <i class="el-icon-document-copy"></i>宿舍管理
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="/moveoutRegister">
            <i class="el-icon-s-unfold"></i>
            <span slot="title">学生迁出登记</span>
          </el-menu-item>

          <el-menu-item index="/moveoutRecord">
            <i class="el-icon-s-order"></i>
            <span slot="title">学生迁出记录</span>
          </el-menu-item>

          <el-menu-item index="/absentRecord">
            <i class="el-icon-error"></i>
            <span slot="title">学生缺寝记录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 中间main部分 -->
      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-text="this.$router.currentRoute.name"
            ></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>

        <!-- footer部分 -->
        <el-footer class="home_footer">2022 © SleepWalker</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AboutView from "./AboutView.vue";
export default {
  components: { AboutView },
  name: "SystemAdmin",
  data() {
    return {
      admin: '',
      isCollapse: true,
    };
  },
  methods: {
    logout() {
      this.$confirm('退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning'
      }).then(()=>{
        localStorage.removeItem('systemAdmin')
        this.$router.replace({path: '/login'})
      })
    },
  },
  created() {
    this.admin = JSON.parse(window.localStorage.getItem('systemAdmin'))
  }
};
</script>

<style>
.home_container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.home_header {
  background-color: #0b0332b3;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home_title {
  color: #c2c2c2;
  font-size: 22px;
  display: inline;
}

.home_userinfo {
  color: rgb(195, 226, 68);
  cursor: pointer;
}

.home_userinfoContainer {
  display: inline;
  margin-right: 20px;
}

.home_aside {
  background-color: #daeae2;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.home_footer {
  background-color: #ffffff;
  color: #000000;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
}
</style>
