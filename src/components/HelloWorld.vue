<template>
  <div>
    <div>immediate</div>
    <button @click="bun">button</button>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
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
  data() {
    return {
      immediate: 0,
      arr: [
        {
          id: 1,
          name: "部门1",
          pid: 0,
          children: [
            {
              id: 2,
              name: "部门2",
              pid: 1,
              children: [
                {
                  id: 4,
                  name: "部门4",
                  pid: 2,
                },
              ],
            },
            {
              id: 3,
              name: "部门3",
              pid: 1,
            },
          ],
        },
      ],
      ruleForm: {
        name: "",
        region: "",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  watch: {},
  created() {
    this.bun();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm = {
        name: "",
        region: "",
      };
      // this.$refs[formName].resetFields();
    },
    onSubmit() {
      console.log("submit!");
    },
    async bun() {
      var a = await this.apiFun();
      // var b = { name: "123" };
      // console.log(a, b, "a");
      // console.log(typeof(a), typeof(b), "a");
      // this.ruleForm = { name: "123" };
      // console.log(this.ruleForm, "b");
      this.ruleForm.name = a.name;
      if(a.region) {
        this.ruleForm.region = a.region;
      }
    },
    async apiFun() {
      return { name: "123" };
      // setTimeout(() => {
      //   return {name: '123'}
      // },0)
    },
    // async fun() {
    //   const content = await this.fun1();
    //   console.log("content", content);
    //   return {
    //     content: content,
    //   };
    // },
    // async fun1() {
    //   setTimeout(() => {
    //     return "res";
    //   });
    // },
  },
};
</script>
