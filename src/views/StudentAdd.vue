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
            <el-form-item label="学号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
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
            <el-form-item label="宿舍" prop="telephone">
                <el-select v-model="ruleForm.dormitoryId" placeholder="请选择宿舍">
                    <el-option
                            v-for="item in dormitoryList"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建
                </el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                category: null,
                ruleForm: {
                    number: "",
                    name: "",
                    gender: "",
                    dormitoryId: "",
                },
                dormitoryList: "",
                rules: {
                    number: [{required: true, message: "请输入学号", trigger: "blur"}],
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}],
                    gender: [{required: true, message: "请输入性别", trigger: "blur"}],
                    dormitoryId: [
                        {required: true, message: "请选择宿舍", trigger: "change"},
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8081/student/save', this.ruleForm).then((response) => {
                            if (response.data.code === 0) {
                                this.$alert(this.ruleForm.name + '添加成功', '', {
                                    confirmButtonText: '确定',
                                    callback: (action) => {
                                        this.$router.push('/studentManager')
                                    }
                                })
                            }
                        })
                    }
                })

            },
            resetForm(formName) {
                this.$refs[formName].resetField();
            }
        },
        created() {
            axios.get('http://localhost:8081/dormitory/availableList').then((response) => {
                this.dormitoryList = response.data.data
            })
        }
    };
</script>

<style>
</style>