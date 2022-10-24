<template>
  <div
    style="
      margin-top: 60px;
      margin-left: 330px;
      width: 300px;
      height: 500px;
      border: 0px solid red;
    "
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
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
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
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
    return {
      category: null,
      ruleForm: {
        username: "",
        password: "",
        name: "",
        gender: "",
        telephone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("http://localhost:8081/dormitoryAdmin/save", this.ruleForm)
            .then((resp) => {
              console.log(resp);
              if (resp.data.code == 0) {
                this.$alert(this.ruleForm.username + "添加成功", "", {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    this.$router.push("/dormitoryAdminManager");
                  },
                });
              } else {
                this.$alert(this.ruleForm.username + "添加失败", "提示", {
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

<style>
</style>