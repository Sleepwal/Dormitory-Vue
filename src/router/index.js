import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import SystemAdmin from '@/views/SystemAdmin'
import DormitoryAdminManager from '@/views/DormitoryAdminManager'
import DormitoryAdminAdd from "@/views/DormitoryAdminAdd";
import DormitoryAdminUpdate from "@/views/DormitoryAdminUpdate";
import StudentAdd from "@/views/StudentAdd"
import StudentManager from "@/views/StudentManager";
import StudentUpdate from "@/views/StudentUpdate";
import BuildingAdd from "@/views/BuildingAdd";
import BuildingManager from "@/views/BuildingManager";
import BuildingUpdate from "@/views/BuildingUpdate";
import DormitoryAdd from "@/views/DormitoryAdd";
import DormitoryManager from "@/views/DormitoryManager";
import DormitoryUpdate from "@/views/DormitoryUpdate";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    name: "登录",
    component: Login,
  },
  {
    path: "/systemAdmin",
    name: "系统管理员",
    component: SystemAdmin,
    redirect: "/DormitoryAdminManager",
    children: [
      {
        path: "/dormitoryAdminManager",
        name: "宿管管理",
        component: DormitoryAdminManager,
      },
      {
        path: "/dormitoryAdminAdd",
        name: "添加宿管",
        component: DormitoryAdminAdd,
      },
      {
        path: "/dormitoryAdminUpdate",
        name: "修改宿管",
        component: DormitoryAdminUpdate,
      },
      {
        path: "/studentAdd",
        name: '添加学生',
        component: StudentAdd,
      },
      {
        path: "/studentManager",
        name: '学生管理',
        component: StudentManager,
      },
      {
        path: "/studentUpdate",
        name: '更新学生',
        component: StudentUpdate,
      },
      {
        path: "/buildingAdd",
        name: '添加宿舍楼',
        component: BuildingAdd,
      },
      {
        path: "/buildingManager",
        name: '宿舍楼管理',
        component: BuildingManager,
      },
      {
        path: "/buildingUpdate",
        name: '更新宿舍楼',
        component: BuildingUpdate,
      },
      {
        path: "/dormitoryAdd",
        name: '添加宿舍',
        component: DormitoryAdd,
      },
      {
        path: "/dormitoryManager",
        name: '宿舍管理',
        component: DormitoryManager,
      },
      {
        path: "/dormitoryUpdate",
        name: '更新宿舍',
        component: DormitoryUpdate,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
