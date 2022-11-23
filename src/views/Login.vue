<template>
  <div>
    <div id="blank"></div>
    <fieldset>
      <legend>用户登录</legend>
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-userForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" type="text"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="userForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            placeholder="请输入确认密码"
            v-model="userForm.checkPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="userType">
          <el-radio-group v-model="userForm.userType">
            <el-radio label="dormitoryAdmin">宿管</el-radio>
            <el-radio label="systemAdmin">系统管理员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('userForm')"
            :loading="logining"
            >登录</el-button
          >
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <a :href="regist">没有账号？立即注册</a>
    </fieldset>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      const check = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!check.test(value)) {
          callback(new Error("密码至少包含 数字和英文，长度8-16"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      regist: 'http://localhost:8080/register',

      userForm: {
        username: "",
        password: "",
        checkPass: "",
        userType: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],

        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true;
          // 回调里用不了this
          let _this = this;
          if (_this.userForm.userType === "dormitoryAdmin") {
            _this.axios
              .get("http://localhost:8081/dormitoryAdmin/login", {
                params: _this.userForm,
              })
              .then(function (resp) {
                _this.logining = false;
                if (resp.data.code === -1) {
                  _this.$alert("用户不存在!", "提示", {
                    confirmButtonText: "确定",
                  });
                } else if (resp.data.code === -2) {
                  _this.$alert("密码错误!", "提示", {
                    confirmButtonText: "确定",
                  });
                } else if (resp.data.code === 0) {
                   //跳转到SystemAdmin
                    //展示当前用户
                    localStorage.setItem('dormitoryAdmin', JSON.stringify(resp.data.data))
                    _this.$router.replace({path: '/dormitoryAdmin'})

                  // _this.$alert("登录成功!", "提示", {
                  //   confirmButtonText: "确定",
                  // });
                } else {
                  _this.$alert("无响应!", "提示", {
                    confirmButtonText: "确定",
                  });
                }
              });
          } else {
            _this.axios
              .get("http://localhost:8081/systemAdmin/login", {
                params: _this.userForm,
              })
              .then(function (resp) {
                _this.logining = false;
                if (resp.data.code == -1) {
                  _this.$alert("用户不存在!", "提示", {
                    confirmButtonText: "确定",
                  });
                } else if (resp.data.code == -2) {
                  _this.$alert("密码错误!", "提示", {
                    confirmButtonText: "确定",
                  });
                } else if (resp.data.code == 0) {
                    //跳转到SystemAdmin
                    //展示当前用户
                    localStorage.setItem('systemAdmin', JSON.stringify(resp.data.data))
                    _this.$router.replace({path: '/systemAdmin'})
                  // _this.$alert("登录成功!", "提示", {
                  //   confirmButtonText: "确定",
                  // });
                } else {
                  _this.$alert("无响应!", "提示", {
                    confirmButtonText: "确定",
                  });
                }
              });
          }

          setTimeout(() => {
            this.logining = false;
          }, 2000);
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
fieldset {
  /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
  border: 2px solid #dcdfe6;
  text-align: center;
  border-radius: 8px;
  margin: 0 auto;
  width: 50%;
  padding-top: 50px;
}

#blank {
  height: 100px;
}

.demo-userForm {
  width: 500px;
  margin: 0px auto;
}
</style>
