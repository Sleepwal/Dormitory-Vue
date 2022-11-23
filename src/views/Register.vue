<template xmlns="http://www.w3.org/1999/html">
  <div style="
      margin-top: 60px;
      margin-left: 330px;
      width: 300px;
      height: 500px;
      border: 0px solid red;">
    <fieldset>
      <legend>用户注册</legend>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
              type="password"
              placeholder="请输入确认密码"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <div style="width: 170px; height: 30px">
            <template>
              <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
              <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model.number="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <a :href="login">已有账号？立即登录</a>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "DormitoryAdminAdd",
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      category: null,
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        name: "",
        gender: "",
        telephone: "",
      },
      login: 'http://localhost:8080/login',
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [{required: true, validator: validatePass, trigger: "blur"}],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{required: true, message: "请输入姓名", trigger: "blur"}],
        gender: [{required: true, message: "请选择性别", trigger: "blur"}],
        telephone: [
          {required: true, message: "请输入联系电话", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
              .put("http://localhost:8081/dormitoryAdmin/register", this.ruleForm)
              .then((resp) => {
                console.log(resp);
                if (resp.data.code === 0) {
                  this.$alert(this.ruleForm.username + "注册成功", "提示", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      this.$router.push("/login");
                    },
                  });
                } else {
                  this.$alert(this.ruleForm.username + "用户已存在", "提示", {
                    confirmButtonText: "确定",
                  });
                }
              });
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
  width: 700px;
  padding-top: 50px;
}

#blank {
  height: 100px;
}

.demo-ruleForm {
  width: 500px;
  margin: 0px auto;
}
</style>